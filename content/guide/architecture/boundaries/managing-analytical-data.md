---
weight: 260
title: "Managing Analytical Data"
description: "This article explains what managing analytical data is, how to move from brittle central warehouses and lakes to domain-aligned data products, and how to do analytics in a microservices world."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Analytical data is how the organization asks “What is really going on?” Once you split your system into dozens of services and databases, that question gets harder to answer, not easier. This article looks at how to manage analytical data in a world of microservices and distributed operational stores, and how to move beyond fragile warehouses and lakes toward domain-owned data products.  

## Understanding Analytical Data

Analytical data is not just “copies of operational tables in a reporting database.” To work with it effectively, you need to be clear about what it is for, how it differs from operational data, and why that distinction matters once your architecture becomes distributed.

### Operational vs Analytical Views of the Same World

Operational data drives the system right now:

* Can this customer log in?  
* What’s the current balance or entitlement?  
* Which expert is assigned to this ticket?

Analytical data is about questions over time and at scale:

* How has ticket volume shifted by region over the last 12 months?  
* Which customer segments churn after contract changes?  
* Where are experts over- or under-utilized by skill?

It is typically:

* Aggregated or reshaped for querying.  
* Organized by business questions, not by transaction workflows.  
* Tolerant of small delays but sensitive to completeness and quality.

If you treat analytical data as an afterthought—a raw dump of operational tables—you end up with dashboards that are either wrong, late, or too fragile to evolve.

### Where Analytical Data Fits in the Architecture

In a monolith, you can sometimes get away with:

* One operational database.  
* A direct ETL pipeline into a warehouse.  
* A handful of reporting jobs.

In a distributed system, analytical data needs its own architecture:

* Multiple operational databases and services each own their live state.  
* Analytical data is produced by combining, reshaping, and aggregating those states.  
* There are many consumers: BI, ML, finance, product, operations.

Managing analytical data means deciding:

* How to collect from many operational sources without building a new monolith.  
* How to organize analytical structures so they follow domain boundaries instead of cutting across them.  
* How to evolve those structures without breaking downstream reports overnight.

## Why Analytical Data Gets Harder with Microservices

Decomposing your system into services is great for operational autonomy and team independence. It’s terrible for naive analytics, because every meaningful question suddenly crosses service boundaries and database boundaries at the same time.

### Fragmented Sources, Centralized Questions

After decomposition, your “simple” report is suddenly built on:

* Ticket service database.  
* Customer service database.  
* Billing and contracts databases.  
* Maybe a couple of side systems for campaigns or support channels.

From the business point of view, it is still one question:  
“Show me completion time by customer tier and product.”  

From the architecture point of view, it’s many joins across services that never agreed on a shared schema.

The risk is obvious:

* You centralize all analytical flows through one team, one tool, or one monster schema.  
* That central point quietly becomes the bottleneck for every non-trivial question.

### Pipelines as Hidden Architecture

In distributed systems, data pipelines are architecture:

* They encode assumptions about schemas and semantics.  
* They define blast radius when a source changes.  
* They decide how late and how complete your analytical views are.

If you ignore this and just “set up some ETLs,” you build a second, parallel architecture that is:

* Centralized while your services are decentralized.  
* Hard to reason about and even harder to safely change.  

Managing analytical data means treating pipelines, datasets, and contracts as first-class design elements, not tools glued on at the end.

## Classic Approaches: Warehouses and Lakes

Most organizations didn’t start with microservices. They started with **warehouses** and **lakes**. Both still have a place, but they show their limits once you have many independent services and domains.

### Data Warehouses: One Integrated Schema

The warehouse model is simple in theory:

* Extract data from many operational systems.  
* Transform it into a single, integrated schema (often dimensional).  
* Load it into a central analytical database for reports and dashboards.

**Advantages**:

* Strong support for classic BI: reports, cubes, rollups.  
* One place to ask cross-cutting questions.  
* Clear separation between OLTP and OLAP worlds.

**Problems**:

* Centralized transformation: every upstream schema change risks breaking the warehouse.  
* Domain knowledge bottleneck: a small analytics/ETL team must understand *everyone’s* domain to keep mappings current.  
* Slow evolution: adding a new metric or dimension often requires cross-team coordination and long lead times.

As services and schemas proliferate, the central warehouse becomes increasingly brittle and slow to adapt.

### Data Lakes: Store Now, Figure It Out Later

Data lakes reacted to warehouse pain with a different bet:

* Ingest data in raw or lightly processed form.  
* Store everything in a cheap, scalable system.  
* Let data scientists and analysts transform it on demand.

**Advantages**:

* Much less upfront schema design.  
* Better fit for unstructured and semi-structured data.  
* Friendly to ML and exploratory analysis.

**Problems**:

* Without strong discipline, the lake turns into a “data swamp”: lots of files, unclear meaning.  
* Pipelines are still fragile—only now the complexity is downstream in ad hoc jobs.  
* Data quality and governance become everyone’s problem and nobody’s job.

Both warehouses and lakes share one trait: they centralize analytical data and pipeline responsibility, even when the operational side has been decentralized. That tension is what Data Mesh tries to address.

## From Central Pipelines to Data Mesh

Data Mesh is one answer to “how do we make analytical data follow the same domain boundaries as our services?” It shifts both ownership and responsibility away from a central analytics team and into the domains themselves.

### The Core Idea: Domains Own Their Analytical Data

Instead of a central BI team hoarding all data, Data Mesh says:

* **The domain team** that understands a slice of the business also owns the analytical representation of that slice.  
* **Domains produce data products**: curated, documented datasets for others to consume.  
* **A shared platform** provides tooling, not centralized ownership.  
* **Governance is federated** and automated: consistent policies, distributed responsibility.

The goal is simple:

> Analytical data should be as domain-aligned and evolvable as your microservices, not a central afterthought.

### Data as a Product, Not as Exhaust

“Data as a product” means:

* Someone **owns** each significant dataset.  
* It is **discoverable** (you can find it).  
* It is **understandable** (schema, semantics, examples).  
* It is **trustworthy** (quality measured, not assumed).  
* It is **usable** without a three-week handover meeting.

This mindset shift turns datasets from “side effects of systems” into intentional, versioned, governed contracts.

## Data Product Quanta: Architecture Units for Analytics

To apply Data Mesh ideas in architecture diagrams and designs, you need concrete building blocks. The Data Product Quantum (DPQ) is a practical way to model analytical units alongside services.

### What is a Data Product Quantum?

A Data Product Quantum is an architectural unit dedicated to analytical data, closely aligned with a domain but operationally separate from the domain’s services.

You can think of a DPQ as:

* A separate deployable and runnable thing (its own storage, pipelines, and compute).  
* Owned by the same domain team as the operational service.  
* Fed asynchronously from operational systems (events, CDC, batch).  
* Exposing analytical views for BI, ML, and downstream data products.

It cooperates with the operational service but doesn’t sit on the hot path of user requests. Its job is to provide analytical truth, not to serve live traffic.

### Three Types of DPQ

In practice, three shapes are particularly useful:

* **Source-aligned DPQ**  
  * Represents the analytical view of a single domain or service.  
  * Mirrors key entities, events, and metrics in a form suitable for reporting and modeling.  
  * Owned end-to-end by that domain team.
* **Aggregate DPQ**  
  * Combines data from multiple source-aligned DPQs or other sources.  
  * Builds cross-domain metrics and views (for example, end-to-end funnel, cross-product utilization).  
  * Often managed by a team whose mission is cross-cutting insight, not a single domain.
* **Fit-for-purpose DPQ**  
  * Tailored for a specific analytical need: a report, dashboard, or ML pipeline.  
  * May draw from both source-aligned and aggregate DPQs.  
  * Optimized for usability and performance for that use case.

This layering lets each domain own its slice, while cross-cutting views and specialized products build on top rather than tunneling straight into every operational database.

## Designing Analytical Data Products in Practice

Knowing that you want data products is not enough. You still need to design boundaries, schemas, contracts, and quality rules so those products are usable and evolvable.

### Choosing Boundaries for Analytical Products

Boundaries for analytical products should reflect business questions, not just operational table layouts.

**Questions to ask**:

* Which decisions will this data product enable?  
* Which domain’s perspective does it represent?  
* Which other products will depend on it downstream?

**For example**:

* A **Ticket Outcomes DPQ** might focus on resolution times, categories, and channels, strictly from the ticketing domain’s viewpoint.  
* An **Expert Supply DPQ** might combine ticket demand with expert availability and skills to guide hiring and scheduling decisions.

If you try to serve both domains from one product, you risk recreating a mini-warehouse inside a single DPQ.

### Contracts and Schemas as Fitness Functions

Analytical data is fragile when contracts are implicit. A DPQ should expose:

* A stable schema with explicit types and semantics.  
* Clear rules about granularity (row = event, snapshot, aggregate?).  
* Guarantees about freshness and completeness.

You can then define fitness functions such as:

* “Daily snapshot must be complete by 03:00 UTC or the day is marked incomplete.”  
* “Schema evolution must not silently drop or reinterpret fields without versioning.”  
* “For consumers X and Y, these queries must remain valid and performant.”

These fitness checks give you early warning when upstream changes or pipeline issues start eroding analytical quality.

### Eventual Consistency and Snapshots

Analytical data is almost always eventually consistent with operational systems:

* Events or CDC streams can arrive late or out-of-order.  
* Some days or periods might be incomplete due to outages or schema changes.  

Instead of pretending everything is perfect, you can:

* Mark snapshots as complete or exempt (excluded from trend analysis) based on strict completeness checks.  
* Make lateness and data gaps visible metrics, not hidden surprises.

The important part is aligning those choices with how the business uses the data:

* For daily planning, yesterday’s complete snapshot might be enough.  
* For real-time fraud detection, you may need much tighter bounds on delay and loss.

## Trade-offs: Mesh vs Warehouse vs Lake

No single approach wins everywhere. You need to understand what each style buys you and where it pushes pain.

### Where Warehouse Still Makes Sense

Warehouses still work well when:

* You have a relatively stable set of operational systems.  
* Most questions benefit from a single integrated schema.  
* You lean heavily on traditional BI and standardized reporting.

They struggle when:

* Domains and services change frequently.  
* You need local autonomy over analytical models inside domains.  
* Central ETL teams become the constraint for change.

### Where Lakes Still Shine

Lakes are powerful when:

* You work with raw, unstructured, or semi-structured data.  
* Data scientists do lots of exploratory work and ML experimentation.  
* You can tolerate looser governance in early stages of discovery.

They struggle when:

* Many teams depend on the same data for production-grade decisions.  
* Lineage, quality, and semantics must be reliable and visible.  
* The lake becomes the dumping ground for everything no one wants to own.

### Where Mesh and DPQs Fit Best

Domain-aligned data products work best when:

* Your operational architecture is already domain-oriented (bounded contexts, services).  
* You want each domain to be accountable for the truth about its own part of the world.  
* You need both local autonomy and enterprise-wide analytical capabilities.

They come with their own costs:

* You must invest in a self-serve platform for data products.  
* Governance becomes federated and automated, not just centralized committees.  
* Teams must get comfortable with asynchronous data flows and eventual consistency.

In many organizations, the future is not warehouse *or* lake *or* mesh, but a combination:

* Domain-owned DPQs as the primary source of analytical truth.  
* A warehouse-like layer for standardized cross-domain reporting.  
* A lake or lakehouse environment for raw data and ML experiments.

## Summary

Managing analytical data in a distributed system is a design problem, not just a tooling problem. Once you fragment operational data across services, you have to be deliberate about:

* How you define analytical data and separate it from live transactional state.  
* How you evolve beyond centralized warehouses and lakes that can’t keep up with domain-oriented change.  
* How you adopt domain-owned data products—Data Product Quanta—as the building blocks of your analytical landscape.  
* How you design contracts, snapshots, and quality checks so analytical data remains trustworthy even as schemas and services evolve.

If you treat analytical data as a first-class part of your architecture, aligned with domains and backed by clear contracts and governance, your reports and models stop being fragile artifacts at the edge. They become stable, evolvable assets that grow with your system instead of holding it back.

## Recommended Reading

#### Books

* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O'Reilly Media.  
  * **Chapter 14: Managing Analytical Data**\
    Discusses how analytics changes in a microservices world, introduces Data Mesh ideas, and defines the Data Product Quantum as a practical unit for domain-aligned analytical data.  
* Zhamak Dehghani (2022). *[Data Mesh: Delivering Data-Driven Value at Scale](https://www.oreilly.com/library/view/data-mesh/9781492092386/)*. O'Reilly Media.  
  * **Part I: Why Data Mesh**\
    Explains the limits of centralized warehouses and lakes and motivates domain-oriented, product-based analytical data.  
  * **Part II: The Principles of Data Mesh**\
    Covers domain ownership, data as a product, self-serve platforms, and federated computational governance in depth.  
  * **Part III: Implementing Data Mesh**\
    Provides guidance and examples for designing, rolling out, and governing domain-owned data products and platforms in real organizations.
