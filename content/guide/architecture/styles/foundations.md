---
weight: 151
title: "Foundations"
description: "This article explains what an Architecture Style is, how style constraints shape structure and interactions, and why those constraints drive qualities such as changeability, reliability, and performance across monolithic and distributed families."
icon: "article"
date: "2025-11-10T15:08:52+01:00"
lastmod: "2025-11-10T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---
{{< md-lint "<!-- markdownlint-disable MD024 -->" >}}

## What an Architecture Style Is (and Isn’t)

Architecture styles are named, reusable macro-structures that constrain how a system is organized and how its parts interact. By choosing a style, you shape how the system grows, fails, and performs over time.

A **style** defines the high-level structure, including the primary building blocks, their responsibilities, and the allowed interaction patterns. A style intentionally narrows your choices so specific qualities (like modifiability or resilience) are easier to achieve.

A **pattern** is smaller in scope. Patterns (e.g., CQRS) can be applied to many styles. Styles set the city grid; patterns are building types (such as a school or a firehouse) that you place on it.

### Where Styles Apply

Styles operate across two practical axes:

* **Code division** — how functionality is partitioned: by technical concern (UI/business/data) or by business capability (orders, billing, catalog).  
* **Deployment model** — how units are packaged and run: a single deployment unit (monolith) or multiple collaborating units (distributed).

Most named styles sit somewhere in this space. Knowing the axes helps keep names and hype from obscuring the real structural constraints.

### Why Styles Matter

Styles front-load trade-offs. For example, a monolith centralizes execution and simplifies debugging; a distributed style decentralizes execution and complicates failure modes and diagnostics. These aren’t “good” or “bad” by themselves—they’re consequences you accept in exchange for different benefits.

### The Monolithic Family

A **monolith** packages UI, domain logic, and data access into a single deployable unit.  
The appeal: fast development, simple deployment, in-process calls, and one place to debug.  
The caution: scaling is coarse, the blast radius is wide, and teams can step on each other’s toes as the codebase grows.

Monoliths aren’t one shape. Common monolithic styles include:

* **Layered architecture.** Classic presentation/domain/data separation. Clear roles, but can blur business rules across layers if boundaries aren’t enforced.  
* **Modular monolith.** Domain-oriented modules with strict internal contracts, but still one deployable. Maintains cohesion and serves as a pragmatic foundation for later distribution.  
* **Pipeline (batch/ETL).** Linear stages transform data end-to-end within a single process or job. Suitable for data flows; not a microservice just because it has stages.  
* **Microkernel (plugin).** Minimal core with plug-ins. Useful for platforms and tools that need extension points without fragmenting the core.

**Example**\
An e-commerce app ships as one process. “Catalog,” “Cart,” and “Checkout” are modules with internal APIs. A request handler calls into “Cart”; “Cart” raises a domain event handled by “Checkout” in-process. Deployment remains simple, and module boundaries remain explicit.

### The Distributed Family

A **distributed architecture** runs multiple deployable units that collaborate over a network. Benefits include targeted scaling, fault isolation, and team autonomy. The cost is real: network failures, retries, timeouts, partial availability, version skew, and increased observability and governance requirements. Debugging becomes cross-service detective work.

“Distributed” is a toolbox, not one style. Typical options:

* **Microservices.** Small, independently deployable services with strong ownership. Improves autonomy; increases operational overhead.  
* **SOA.** Service-oriented architecture with emphasis on contracts and shared standards. Suitable for interoperability; risks central control bottlenecks.  
* **Event-Driven.** Asynchronous, message-centric collaboration. Scales well and decouples producers/consumers; introduces eventual consistency.  
* **Space-Based.** Co-locates compute with shared, distributed data grids to absorb high concurrency. Powerful for spikes; data management is demanding.  
* **Orchestration-Driven.** Central workflow coordinates services. Yields visibility and control; the orchestrator can become a new monolith.

**Example**\
“Checkout” is a service. It publishes an “OrderPlaced” event; “Billing” and “Shipping” subscribe. If “Billing” is down, messages are queued and processed later, but users may see delayed confirmations. Observability must stitch traces across services.

## Design Considerations

##### Cross-Cutting Trade-offs Driven by Style

* **Operability vs. Autonomy.** Monoliths simplify ops; distributed styles grant team independence and targeted scaling while increasing operational burden.
* **Latency & Consistency.** In-process calls are fast and highly consistent. Cross-network calls introduce latency and failure modes, and often result in eventual consistency.
* **Debugging & Change Management.** Monoliths centralize logs and stack traces. Distributed styles require correlation IDs, tracing, and stricter versioning discipline.
* **Team Topology Alignment.** Distributed styles map well to autonomous teams; monoliths reduce coordination costs for small teams.

##### Misconceptions and Anti-Patterns

* **“Monoliths are dead.”** They’re not. Many systems start—and stay—monolithic by design, utilizing a modular structure to remain healthy.
* **“Distributed = modern.”** Trends aside, distributed designs carry heavy complexity taxes. Adopt them for concrete needs, not fashion.
* **“Distributed layers.”** Splitting a layered monolith into separately deployed “UI service,” “business service,” and “data service” recreates tight coupling with extra latency—autonomy doesn’t improve.

##### Combining Styles

Hybridization is normal. Examples include microservices that communicate via events (microservices + event-driven) or a microkernel-style core inside SOA. Combine styles to meet a specific characteristic (e.g., elasticity, responsiveness, extension), rather than collecting buzzwords.

##### Evolution Inside a Style

Styles are not one-way doors. You can strengthen module boundaries inside a monolith, or simplify a distributed design by consolidating tightly coupled services. Evolve the structure to match where change and load actually occur; avoid moving both axes (partitioning and deployment) simultaneously.

## Recommended Reading

#### Web Resources

* Software Architecture Guild, *[Architecture Styles: Monolithic vs Distributed Architecture](https://softwarearchitectureguild.substack.com/p/architecture-styles-monolithic-vs)*
* Developer to Architect, *[Lesson 196 - Modularity and Architectural Styles](https://developertoarchitect.com/lessons/lesson196.html)*

#### Books

* Richards, M., & Ford, N. (2020). *[Fundamentals of Software Architecture: An Engineering Approach](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)* . O'Reilly Media.
  * **Chapter 9: Foundations**\
    Establishes core architectural concepts—components, modularity, coupling/cohesion, and characteristics—used to reason about styles and their trade-offs.

* Richards, M. (2024). *[Software Architecture Patterns (2nd ed.)](https://www.oreilly.com/library/view/software-architecture-patterns/9781098134280/)*. O’Reilly Media.  
  * **Chapter 1: Introduction**\
    Frames patterns vs. styles and how macro-structures influence qualities and development workflow.  
  * **Chapter 2: Architectural Structures and Styles**\
    Surveys common styles and structural views, clarifying terminology you’ll use throughout the Foundations section.

* Bain, D., O’Dea, M., & Ford, N. (2024). *[Head First Software Architecture](https://www.oreilly.com/library/view/head-first-software/9781098134341/)*. O’Reilly Media.  
  * **Chapter 5: Architectural Styles: Categorization and Philosophies**\
    Provides a practical taxonomy of styles and the design philosophies behind them, preparing readers to compare options with intent.
