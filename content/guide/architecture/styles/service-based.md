---
weight: 160
title: "Service-Based"
description: "A practical guide to the Service-Based architecture style—coarse-grained business services, contracts and data choices, trade-offs, and how to evolve toward or away from finer-grained services."
icon: "article"
date: "2025-11-10T15:08:52+01:00"
lastmod: "2025-11-10T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Service-based architecture organizes a system around a small number of coarse-grained services aligned to business capabilities. Each service exposes a clear contract and can be developed and deployed on its own, while operations remain simpler than large fleets of microservices. It’s a pragmatic step when a monolith has grown seams and a full microservices platform would be overkill.

## Definition

In the service-based style, the system is decomposed into services such as Customer, Order, Catalog, Billing, or Reporting. Services are independently buildable and deployable, expose stable APIs or events, and encapsulate their own logic. Data may be owned per service or shared through a common store; both approaches are used in this style, but the choice has strong implications for autonomy, transactions, and reporting.

### Intent & Forces

The intent is to align software boundaries to recognizable business capabilities, reduce cross-team contention, and unlock selective scaling and deployment. Typical forces include pressure to move faster than a single release train allows, the need for clearer ownership than a large monolith provides, and a desire to avoid the operational weight of dozens or hundreds of microservices. The style favors autonomy at the service boundary and business clarity over maximal independence of every internal function.

### Structure

Think in terms of capability slices with explicit edges.

* **Elements & responsibilities**  
  * Services implement cohesive business capabilities and publish APIs/events that reflect domain language.  
  * Gateways or edge adapters consolidate external access, authentication, and routing.  
  * Optional shared utilities remain domain-agnostic to avoid hidden coupling.
* **Deployment units**  
  * Each service is its own deployable. A small system may start with a handful of services and grow as seams stabilize.  
  * Teams often own one or more services end-to-end.
* **Interaction patterns**  
  * Synchronous request/response (HTTP/gRPC) for user-facing paths that need immediacy.  
  * Asynchronous messaging for workflows, integration, and burst absorption.
* **Boundaries & contracts**  
  * Stable APIs with versioning and deprecation policy; event contracts use clear schemas and evolution rules.
* **Failure domains & scaling**  
  * A failure in one service should not take down others; scale hotspots by adding instances only where needed.

  {{< image src="/images/architecture/fundamentals/styles.service-based.drawio.png" alt="Service-Oriented Architecture (SOA)" >}}

### Dependency Rules

Services avoid reaching into one another’s internals. Cross-service calls go through published contracts; cross-database writes (if a shared DB exists) are treated as a last resort and guarded with clear ownership rules. When a service depends on a peer, prefer coarse-grained calls, timeouts, retries, and circuit breakers; avoid chatty, fine-grained interactions that disguise tight coupling.

### Data & Transactions

Two common data choices exist:

* **Shared database (pragmatic):** services share a schema or database instance with negotiated ownership of tables or views. Pros: simpler reporting and multi-entity queries; easier initial migration from a monolith. Cons: weaker autonomy, coordination during schema changes, and higher blast radius.  
* **Database per service (stronger autonomy):** each service is the authority for its data. Pros: isolation and independent evolution. Cons: more complex reporting and cross-service consistency.

End-to-end transactions across services are rare; favor local transactions plus compensations and idempotent operations. Use outbox patterns and change events to keep read models in sync and enable asynchronous workflows.

### Example

An online store exposes three services. **Catalog** manages products and pricing, **Ordering** manages carts and orders, and **Billing** handles payments and invoices. A checkout request hits **Ordering**, which validates items against **Catalog** (coarse-grained call or cached read model), reserves inventory, and requests authorization from **Billing**. On success, **Ordering** emits an `OrderPlaced` event; **Billing** emits `PaymentAuthorized`; **Catalog** decrements inventory on `OrderPlaced`. Each service evolves behind its own API; shared concerns like auth and rate limiting sit at the gateway.

## Design Considerations

### Where It Fits / Where It Struggles

Service-based architecture fits when a monolith’s boundaries are understood but coordination is slowing teams, when selective scaling is needed for a few capabilities, and when operations should remain simpler than a full microservices platform. It struggles when services require heavy cross-calls on hot paths, when strong consistency across many capabilities is non-negotiable, or when team boundaries do not map cleanly to the chosen services. In those cases, strengthen seams or reconsider scope (merge or split differently) before adding more services.

### Trade-offs (At a Glance)

* **Optimizes:** business alignment and ownership, independent deployment of major capabilities, selective scaling, clear fault domains  
* **Sacrifices:** the absolute simplicity of a single artifact, global transactions, and some forms of cross-entity querying  
* **Requires:** stable contracts, basic platform support (service discovery, observability, CI/CD), disciplined data ownership and evolution

### Misconceptions & Anti-Patterns

* **“It’s microservices-lite, so rules don’t matter.”** Skipping contracts, versioning, and SLOs creates brittle systems.  
* **Chatty service meshes.** Fine-grained calls across services increase latency and failure modes; make calls coarse and purposeful.  
* **Shared database as a free-for-all.** Without table ownership and change process, you re-create the monolith’s coupling at a distance.  
* **One service per team by default.** Start with capabilities; let ownership follow boundaries, not the other way around.

### Key Mechanics Done Well

* Identify clear service responsibilities with a ubiquitous language; publish APIs and events that reflect that language.  
* Keep edges resilient: timeouts, retries with jitter, circuit breakers, and backpressure.  
* Use consumer-driven contract tests for APIs and schema-evolution rules for events.  
* Standardize telemetry: trace IDs across calls, service-level SLOs, and golden signals (latency, errors, saturation, traffic).  
* Run zero-downtime database and API evolution (expand/contract, additive changes, and deprecation windows).

### Combining Styles Intentionally

Service-based systems often embed layered slices within each service for internal clarity, use event-driven integration between services for decoupling, and apply modular-monolith techniques to keep each service internally well-structured. Caching and read models reduce cross-service chatter on user-facing paths; gateways consolidate authN/Z, routing, and rate-limiting.

### Evolution Path

Start with a few services that match real seams in behavior and data. As evidence accumulates, you may: merge services whose changes are tightly coupled; split a service whose responsibilities diverge; or migrate a capability toward microservices if autonomy and scale demands justify the added operational cost. If a shared database becomes a bottleneck, introduce per-service schemas gradually, supported by events and read models.

## Operational Considerations

Treat each service as a product: define SLOs, on-call rotations, and clear ownership. Provide standard tooling—service discovery, logging, tracing, metrics—so teams do not reinvent the platform. Adopt progressive delivery (canaries, traffic splitting) per service. For shared databases, enforce ownership and change review; for per-service databases, invest in data replication, reporting pipelines, and backup/restore drills.

### Decision Signals to Revisit the Style

Re-evaluate boundaries when you see persistent cross-service changes that require coordinated deploys, high chatty traffic between a pair of services, schema changes that ripple across many teams, or difficulty meeting SLOs due to unclear ownership. If service count grows without operational maturity, consider consolidation. If a single service becomes a scalability or risk hotspot, consider splitting or moving it toward a more autonomous deployment.

## Recommended Reading

#### Web Resources

* Developer To Architect, *[Lesson 114 - Microservices vs Service-Based Architecture](https://developertoarchitect.com/lessons/lesson114.html)*
* Developer To Architect, *[Lesson 163 - Service-Based Architecture](https://developertoarchitect.com/lessons/lesson163.html)*
* Developer To Architect, *[Lesson 153 - Service-Based Architecture vs. SOA](https://developertoarchitect.com/lessons/lesson153.html)*

#### Books

* Richards, M., & Ford, N. (2020). *Fundamentals of Software Architecture*. O’Reilly Media.  
  * **Chapter 13: Service-Based Architecture Style**\  
    Frames service-based as coarse-grained, business-aligned services with pragmatic data choices; contrasts it with microservices and discusses scaling, contracts, and governance.
