---
weight: 259
title: "Managing Operational Data"
description: "This article explains what managing operational data is, how to split and own it in distributed systems, and how to access it safely without breaking consistency or performance."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Operational data is the stuff your system uses to do its job right now: tickets, orders, contracts, feature flags, balances, device states. In a monolith it quietly sits behind a single database; in a distributed architecture it becomes the hardest part to get right. This article is about how to shape, own, and access operational data once you move beyond “one app, one DB.”

## What Do We Mean by Operational Data?

Operational data is not just “whatever sits in the main database.” This block anchors what we mean by operational data and why it needs different treatment from analytical data.

### Operational vs Analytical Data

Operational data is used to run the business:

* Open tickets, their current state, and assignees.  
* Active subscriptions and entitlements.  
* Current stock levels and reservations.

Analytical data is used to understand the business:

* Aggregated sales trends.  
* Funnel conversion metrics.  
* Long-term behavior across customers.

Operational data needs low-latency reads and writes, strict correctness where it matters, and predictable failure modes. Analytical data can usually tolerate delays and temporary inconsistency as long as the trends are right. Mixing the two in your mental model leads to bad choices: you either over-engineer analytics or under-protect live state.

### Where Operational Data Lives in the Architecture

In a modern system, operational data is usually:

* Owned by specific services or bounded contexts.  
* Stored across multiple databases and technologies.  
* Accessed both synchronously (APIs) and asynchronously (events, replication, caches).

Managing operational data means deciding:

* How to split or group data stores.  
* Who owns which tables or aggregates.  
* How services read data they don’t own.  
* Which consistency guarantees are really required.

If you dodge those decisions, your system will quietly recreate a monolithic database behind microservices APIs.

## Why Managing Operational Data is Hard in Distributed Systems

This block explains why the old “one shared DB” approach stops working once you slice the application into services, and why you need explicit drivers to split or keep data.

### From One Shared Database to Data Domains

In a monolith, it is natural to have:

* One database.  
* Many modules or components.  
* Cross-table joins everywhere.

When you start decomposing into services but keep a single shared database, you hit a wall:

* Schema changes become multi-team release trains.  
* The DB becomes the scalability and availability bottleneck.  
* One database outage takes out many services at once.

The way out is to move from “one shared schema” to data domains: coherent clusters of tables aligned with business capabilities and bounded contexts, each with its own schema and, eventually, database.

### Data Disintegrators: Reasons to Split Operational Data

Data disintegrators are forces that push you to move tables into separate schemas or databases. The key ones are:

* **Change control** – Every breaking schema change forces coordinated updates across all dependent services; the more services, the more dangerous each change.  
* **Connection management** – Many services, each with their own connection pool, can overwhelm a single database’s connection limits when scaled out.  
* **Scalability** – No matter how many services you add, a single database often stays the throughput bottleneck.  
* **Fault tolerance** – One shared DB is a single point of failure; maintenance and outages take down everything that depends on it.  
* **Architectural quanta** – A shared DB quietly collapses many services into one effective deployment unit; they can’t really move independently.  
* **Database type optimization** – Different domains want different database types (relational, document, key-value, time-series); one DB type forces lowest-common-denominator design.

When several of these are painful, “one DB to rule them all” stops being defensible.

### Data Integrators: Reasons to Keep Operational Data Together

Data integrators push back against splitting. There are two big ones:

* **Data relationships** – Foreign keys, views, triggers, and logical invariants encode coupling between tables. Splitting them across databases means losing built-in integrity and reimplementing checks in code and messaging.  
* **Database transactions** – When related tables sit in one DB, you get ACID transactions across them. Split them and you’re in distributed transaction or saga territory.

Choosing data boundaries is always a trade-off: you balance disintegrators (change, scale, availability) against integrators (relationships, transactions). “Database per service” is not a rule; it is one possible outcome when disintegrators clearly win.

### A Stepwise Approach to Pulling Apart Operational Data

Ripping the database into five pieces overnight is asking for trouble. A safer path is a stepwise process:

* **Analyze and discover data domains** – group tables and artifacts into domains that match bounded contexts.  
* **Assign tables to domains** – move tables into domain-specific schemas; resolve cross-domain tables and views explicitly.  
* **Limit each service to its primary domain** – give services credentials only to their own schema; make cross-domain data available via APIs, not cross-schema joins.  
* **Move schemas to separate servers** – give each domain its own database instance or cluster.  
* **Switch services over to new databases** – reconfigure connections, validate, then retire the old shared schemas.

By the end, you have data domains that line up with services or service families, independent scaling knobs, and cleaner failure containment.

## Ownership and Transactions for Operational Data

Once you split data, you still need to answer two questions: who owns which tables, and how do you update related data across services without breaking the world?

### Table and Data Ownership in Distributed Systems

A simple starting rule is:

> The service that writes to a table owns that table.

That gives you single ownership: if only one service writes a table, it clearly owns it. The trouble starts with shared writes.

* **Common ownership** – many services write to the same table (for example, a shared `Audit` table). The fix is almost always to create a dedicated owner service (Audit Service) and have everyone else call it instead of writing directly.  
* **Joint ownership** – a couple of services in the same domain write to the same table (for example, Catalog and Inventory both updating `Product`). Here you have options:  
  * **Table split** – split the table by responsibility (static product info vs stock levels) so each service owns its slice.  
  * **Shared data domain** – keep a shared schema both services write to, accepting more coordination and a wider bounded context.  
  * **Delegate** – choose one service as the owner; other services call it for writes.  
  * **Service consolidation** – merge the services into a single, larger one when your boundaries were too fine-grained.

None of these are magic; each trades off ownership clarity, performance, autonomy, and governance. The important move is to pick one intentionally instead of leaving joint ownership to chance.

### Local vs Distributed Transactions

Within a single service and its database, ACID transactions are your friend:

* They give all-or-nothing updates across that service’s tables.  
* They are well understood and operationally mature.

But as soon as a business action spans multiple services and databases, global ACID becomes expensive and fragile:

* Two-phase commit and distributed transactions hurt availability, complicate failure handling, and often fight your scalability goals.  
* They can turn a set of services back into one big architecture quantum in practice.

The common compromise is:

* **Use ACID locally** inside each service for its own data.  
* **Use eventual consistency** across services, accepting short-lived mismatches where the business can tolerate them.

### Eventual Consistency Patterns for Operational Workflows

Eventual consistency is not one thing; there are patterns with different coupling and timeliness profiles. A few useful ones:

* **Background synchronization** – a batch or external process periodically reconciles data between systems. Good for low-urgency alignment, but the sync job quietly becomes a data co-owner and can undermine boundaries.  
* **Orchestrated request-based** – a workflow service calls multiple services during a business operation (for example, profile, contract, billing during registration). You get tighter alignment but a central orchestrator becomes a dependency and complexity magnet.  
* **Event-based** – services publish events when their state changes; other services consume and update their own local state. This tends to be the default in modern systems: decoupled, near real-time, and scalable, but it demands discipline around event modeling, idempotency, and error handling.

The right choice depends on how fresh data must be, where you can tolerate drift, and how much operational coupling you are willing to accept.

## Patterns for Distributed Data Access

Splitting data and assigning ownership doesn’t remove the need to read data you don’t own. This block looks at the main access patterns once you retire “just join the other table.”

### Direct Interservice Communication

The simplest pattern is: when Service A needs data owned by Service B, it calls B directly over HTTP/RPC.

* Data remains centralized with the owner.  
* Ownership and security are clean: all access goes through B’s API.  
* Consistency is simple: there is one source of truth.

**Trade-offs**:

* Every read pays network latency and is vulnerable to B’s availability and performance.  
* When many consumers call B, it becomes a hot spot you must scale and protect.  
* Long call chains can turn a small hiccup into a user-visible outage.

Direct calls are fine when call rates are modest and freshness needs are high. They are a poor fit for high-volume, low-latency read paths.

### Column or Schema Replication

Instead of calling another service every time, you can replicate a subset of its data into your own database (specific columns or small tables). The owning service stays the source of truth; consumers keep denormalized copies to satisfy their queries.

**Benefits**:

* Reads become local to the consumer’s DB.  
* Throughput and latency improve dramatically.  
* The owner service no longer has to scale for everyone else’s read patterns.

**Costs**:

* You introduce eventual consistency: replicas can be stale.  
* You need reliable pipelines (events, CDC, jobs) to keep copies in sync.  
* Schema changes in the source must be coordinated with all consumers.

**This pattern works well when**:

* Data changes relatively slowly.  
* Consumers need flexible local queries.  
* You can live with some staleness.

### Replicated Caching

Replicated caching pushes the replica into an in-memory cache instead of a database.

* Consumer services cache data from the owner in a shape optimized for their needs.  
* Populating and refreshing caches happens via events, polling, or startup warm-up.

**Upside**:

* Extremely fast reads, ideal for hot decision paths.  
* Reduced load on the owner and its database.  
* Some resilience: if the owner is down but the cache is warm, consumers may keep operating.

**Downside**:

* Cache invalidation, TTLs, and warm-up become core architectural concerns, not implementation details.  
* Staleness is expected; you must understand how much you can tolerate.  
* The cache infrastructure itself becomes an operational dependency.

This is a good fit when data is small, relatively static, and read-heavy, and when latency is critical.

### Data Domains and Shared Databases

Sometimes the right answer is to share a database within a tightly scoped data domain.

* Multiple services in the same domain (for example, customer & expert profiles) share a database or schema.  
* They keep rich local access and strong consistency where they truly need it.

**Trade-offs**:

* You gain performance and simplicity inside the domain.  
* You lose some autonomy: schema changes and incidents affect all services in that domain.  
* You must invest in governance: who owns which tables and columns, and how breaking changes are rolled out.

The key is to keep the data domain boundary sharp. Letting “just one more service” from another domain connect is how you quietly slide back into a monolithic database.

## Putting It All Together

Managing operational data is not a single decision; it is a chain of related choices:

* How to split your database into **data domains** without ignoring relationships and transactions.  
* How to assign **table ownership** so every write has a clear owner and joint ownership is resolved by design, not accident.  
* How to handle **cross-service workflows**, using local ACID where it matters and eventual consistency where the business can live with it.  
* How to design **data access patterns** so consumers get the data they need without turning every read into a tight runtime dependency on someone else’s service.

If you treat operational data as a first-class design concern, you avoid the trap of “microservices with a monolithic database” and the opposite trap of “database-per-service everywhere, regardless of relationships.” You get a system where data boundaries match business boundaries, responsibilities are clear, and failures and changes are contained instead of contagious.

## Recommended Reading

#### Books

* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O'Reilly Media.  
  * **Chapter 6: Pulling Apart Operational Data**\
    Introduces data disintegrators and integrators, then walks through a stepwise process for decomposing a monolithic operational database into data domains.  
  * **Chapter 9: Data Ownership and Distributed Transactions**\
    Explores single, common, and joint ownership, techniques for resolving shared tables, and patterns for moving from global ACID to eventual consistency.  
  * **Chapter 10: Distributed Data Access**\
    Covers interservice calls, column replication, replicated caching, and data domains as concrete patterns for reading data you don’t own.  
* Martin Kleppmann (2017). *[Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)*. O'Reilly Media.  
  * **Part I: Foundations of Data Systems**\
    Lays out core concepts like data models, storage engines, and replication that underpin operational and analytical data design.  
  * **Part II: Distributed Data**\
    Explains replication, partitioning, and transactions in distributed systems, with a strong focus on trade-offs between consistency and availability.  
  * **Part III: Derived Data**\
    Shows how to build derived views, streams, and batch systems on top of operational data while keeping the core system reliable.
