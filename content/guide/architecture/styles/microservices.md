---
weight: 164
title: "Microservices-Based"
description: "A practical guide to the Microservices-Based style—independently deployable services, data ownership, contracts, trade-offs, and the platform discipline that makes it work."
icon: "article"
date: "2025-11-10T15:08:52+01:00"
lastmod: "2025-11-10T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Microservices-based architecture decomposes a system into independently deployable services that each own a coherent capability and its data. The payoff is team autonomy and selective scale; the price is distributed complexity across networking, data, and operations.

## Definition

A microservice is a small, self-contained deployable that exposes a contract (API/events), owns its persistence, and can be built, released, and operated without coordinating code changes with peers. Boundaries usually follow business capabilities or DDD bounded contexts, not technical layers. The architecture is the set of these services plus the platform that connects, observes, and governs them.

### Intent & Forces

The style exists to let different parts of a product evolve at different speeds, scale independently, and fail without taking down the whole. It addresses forces like heterogeneous workloads, many teams working in parallel, and frequent releases. Counterforces include higher operational overhead, non-trivial data consistency, and harder end-to-end debugging.

### Structure

Think in capability slices, each with clear edges.

* **Services** implement cohesive responsibilities and publish versioned APIs/events.  
* **Edge/gateway** centralizes routing, authN/Z, and rate limits.  
* **Service discovery/config** let services find each other and fetch runtime settings.  
* **Observability stack** (logs, metrics, traces) follows requests across hops.  
* **Automation** (CI/CD, IaC, container orchestration) standardizes build→deploy→operate.

{{< image src="/images/architecture/fundamentals/styles.microservices.drawio.png" alt="Microservices Architecture" >}}

### Dependency Rules

Services do not reach into each other’s databases. Integration is through published contracts (HTTP/gRPC/events) with explicit timeouts, retries, and circuit breakers. Avoid chatty, fine-grained RPC across service boundaries; make interactions coarse and purposeful. Shared libraries should be domain-agnostic and versioned deliberately; shared services for true platform concerns (identity, billing gateway) are acceptable with clear SLOs.

### Data & Transactions

Each service is the **single writer** for its data. Cross-service workflows favor local ACID plus **sagas/compensations** over distributed transactions. Use outbox/change events to update read models and keep consumers in sync. Embrace eventual consistency where acceptable; when strong invariants are needed, constrain scope (for example, keep within one service or design a reservation protocol).

### Example

In an e-commerce system, **Catalog** owns product data and pricing; **Ordering** owns carts and orders; **Billing** authorizes and settles payments. Checkout calls **Ordering**, which performs local validation and publishes `OrderPlaced`. **Billing** consumes `OrderPlaced`, authorizes payment, and emits `PaymentAuthorized`; **Ordering** reacts to finalize the order. **Catalog** provides coarse read models to reduce hot-path cross-calls. Each service deploys and scales independently, sharing no write models.

## Design Considerations

### Where It Fits / Where It Struggles

It fits products with multiple teams and capabilities that change at different cadences, where autonomy, fault isolation, and selective scaling matter. It struggles when the domain needs broad, synchronous, strongly consistent operations or when platform automation and observability are immature; in those cases a modular or layered monolith is safer until the organization is ready.

### Trade-offs (At a Glance)

* **Optimizes:** team autonomy, independent deployability, fault isolation, selective scaling  
* **Sacrifices:** simplicity of in-process calls, global transactions, easy debugging and testing  
* **Requires:** strong platform automation, contract governance, observability, and disciplined data ownership

### Misconceptions & Anti-Patterns

* *“Micro = tiny.”* Size isn’t the goal; **independent change** is.  
* *Shared database across services.* Violates ownership and couples releases.  
* *Distributed layers.* Splitting by UI/logic/data across services re-creates a distributed monolith.  
* *God services and chatty meshes.* Coalesce hotspots or redesign contracts; keep hops coarse.  
* *“We’ll fix ops later.”* The platform is part of the architecture—underinvesting dooms the style.

### Key Mechanics Done Well

* Boundaries follow **capabilities and reasons to change**; data ownership is explicit.  
* Interfaces are **backward compatible** and versioned; use consumer-driven contract tests.  
* Sync where a user waits; async for workflows and burst absorption—both observable end-to-end.  
* Sagas/compensations are designed with idempotency, DLQs, and correlation IDs.  
* Platform/SRE: standardized pipelines, golden runtime baselines, unified telemetry, and budgeted error/latency SLOs.

### Combining Styles Intentionally

Most microservices systems embed **layered** slices inside each service for clarity, use **event-driven** integration between services, and adopt **orchestration** for spans that demand ordering and auditability while leaving the rest choreographed. Hot read paths frequently employ **read models** or **API composition** to avoid N+1 calls.

### Evolution Path

Start by carving out a few capabilities with clear seams and owned data. As evidence accumulates, **merge** services that co-deploy or chat heavily; **split** services that become hotspots in scale or change. Gradually move from shared to per-service schemas with outbox events and backfills. Treat service count as a cost; only add services when autonomy or risk reduction justifies them.

## Operational Considerations

Treat each service as a product with SLOs, runbooks, and on-call. Automate deployment (blue/green, canary), config, and secrets. Observe end-to-end: trace IDs across hops, standard logs, and RED/USE metrics per service. Resilience patterns—timeouts, retries with jitter, bulkheads, circuit breakers—are table stakes. Test at multiple layers: contracts → components → journey e2e. Budget and monitor cost per service.

### Decision Signals to Revisit the Style

Re-evaluate boundaries when you see coordinated deploys across “independent” services, persistent chatty traffic between a pair (orchestration suggests fusion), incident blast radii that cross services, or platform toil outpacing feature work. If the majority of requests are synchronous and strongly consistent across many capabilities, consider consolidation toward a modular monolith until conditions change.

## Recommended Reading

#### Web Resources

* Developer To Architect, *[Lesson 162 - Microservices Architecture](https://developertoarchitect.com/lessons/lesson162.html)*
* Developer To Architect, *[Microservices Lessons](https://developertoarchitect.com/lessons-microservices.html)*

#### Books

* Richards, M., & Ford, N. (2020). *[Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)*. O’Reilly Media.  
  * **Chapter 17: Microservices Architecture**\  
    Frames microservices as independently deployable capability slices with owned data, and walks through platform needs, contracts, data consistency, and trade-offs.  
* Richards, M. (2015). *[Software Architecture Patterns](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/)*. O’Reilly Media.  
  * **Chapter 6: Microservices Architecture**\  
    Explains topology (edge, discovery, observability), contrasts sync vs. async integration, and warns against shared databases and distributed layers.  
* Bain, D., O’Dea, M., & Ford, N. (2024). *[Head First Software Architecture](https://www.oreilly.com/library/view/head-first-software/9781098141105/)*. O’Reilly Media.  
  * **Chapter 10: Microservices Architecture — Bit by Bit**\  
    Uses a concrete monitoring domain to show boundary finding, service sizing, orchestration vs. choreography, and resilience patterns in practice.  
* Newman, S. (2021). *[Building Microservices (2nd ed.)](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/)*. O’Reilly Media.  
  * Pragmatic guidance on service boundaries, team ownership, testing strategies, contract evolution, and organizational alignment across the lifecycle.
