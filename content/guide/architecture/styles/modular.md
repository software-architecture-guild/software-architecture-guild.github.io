---
weight: 153
title: "Modular Monolith"
description: "A practical guide to the Modular Monolith style—domain-driven structure, enforceable boundaries, data ownership, trade-offs, and how to evolve without premature distribution."
icon: "article"
date: "2025-11-10T15:08:52+01:00"
lastmod: "2025-11-10T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

A modular monolith is one deployable application split into real modules aligned to the domain. Each module owns its behavior and data behind a clear contract. You get the speed and simplicity of a monolith with the order and evolvability of services—without the distributed-systems tax.

## Definition

A modular monolith organizes a single process around *domain modules*: cohesive slices that encapsulate capabilities, policies, and the data they authoritatively own. Modules hide their internals and expose contracts—APIs and/or events—written in ubiquitous language. This is not a pre-microservices stage; it is a complete architecture that preserves the option to extract later if the evidence demands it.

### Intent & Forces

The intent is to localize change and reduce coordination by letting modules evolve semi-independently inside one deployable. The style balances common forces: a need for speed now, the desire to keep an option to split later, and the reality that most teams don’t want to run a distributed platform before they must. It responds to domain volatility by organizing around policies and workflows rather than around tables or technical layers.

### Structure

Think in slices, not tiers. Each module typically contains its own thin presentation/API, application/workflow, domain rules, and infrastructure/persistence code. Internals are private; collaboration happens only via the module’s public surface (methods and/or events). Physical deployment stays one artifact; logical boundaries are enforced by language access modifiers, namespaces, and automated rules. When coupling grows, prefer publishing events over adding chatty in-process calls across modules.

{{< image src="/images/architecture/fundamentals/styles.modular.drawio.png" alt="Modular Architecture" >}}

### Dependency Rules

Modules do not reach into each other’s internals. There is **no cross-module data write**—one writer per dataset. Consumers call a module’s API or subscribe to its events; shared “domain” utilities are treated as a smell and kept domain-free. Enforce rules with architectural tests: allowed-dependency lists, package boundary checks, and cycle detectors in CI.

### Data & Transactions

A module is the authority for its data and owns its write model. Multiple modules may share a physical database, but not each other’s tables or write models; schema segments map to modules. Transactions are local to a module; cross-module workflows coordinate with events or explicit orchestration through public APIs. Read models and local caches inside a module help avoid cross-module “N+1” calls.

### Example (Language-Neutral)

In an e-commerce system, *Ordering* takes the order and decides state transitions; *Catalog* answers product queries; *Billing* authorizes and settles payments. Ordering does not write to Billing’s tables, and Catalog does not reach into Ordering’s entities. Ordering exposes `placeOrder()` and emits `OrderPlaced`; Billing listens to `OrderPlaced` to charge, then emits `PaymentAuthorized`; Ordering reacts to update order status. Internals remain hidden; collaboration occurs through contracts and events.

## Design Considerations

### Where It Fits / Where It Struggles

It fits teams that want fast development, clear ownership, and lower operational overhead than microservices—especially when the domain can be sliced into well-understood capabilities with limited cross-module chatter. It struggles when you require strict fault isolation or independent scaling across many modules, or when team boundaries and the module map fundamentally conflict. In those cases, strengthen seams first; extract only where reality (load, risk, or cadence) justifies it.

### Trade-offs (At a Glance)

* **Optimizes:** development speed, maintainability, testability, low call overhead, simple transactions  
* **Sacrifices:** independent runtime scaling and hard fault isolation (blast radius is the process)  
* **Requires:** real boundaries (private internals), contract-first collaboration, automated enforcement

### Misconceptions & Anti-Patterns

* *“Modules are just packages.”* A module is a semantic boundary with rules; a package is only mechanical unless enforced.  
* *“We’ll add microservices later, so anything goes now.”* Erosion now makes extraction harder later; guard seams from day one.  
* Cross-module DB writes and ad-hoc queries. Always go through APIs/events.  
* God utilities that smuggle domain rules. Keep shared utilities domain-agnostic.  
* “Misc” or “shared-domain” modules. These become coupling magnets; split by capability.

### Key Mechanics Done Well

* Assign every component **one home**; unclear placement signals a boundary flaw. Ownership implies data authority and an API/event surface.  
* Keep internal layering per module (API → domain → infrastructure).  
* Add fitness functions in CI: allowed-deps, no cycles, forbidden imports; turn violations into failing builds.  
* Prefer additive evolution of contracts and events; document error semantics (idempotency, retries, compensations).

### Combining Styles Intentionally

Modular monoliths blend well with event-driven integration at module boundaries and with read-optimized patterns (for example, per-module caches or projections) for hot paths. Use synchronous calls when the SLA is tight and failure coupling is acceptable; use events to decouple and absorb bursts. Wrap external capabilities (payments, identity, search) behind module adapters to prevent leaks into other modules.

### Evolution Path

Start by reinforcing module seams—code, schema, and ownership. Track incoming/outgoing dependencies and remove cycles quickly. If evidence shows a genuine hotspot—change frequency, incident spread, or resource concentration—extract *that module* behind its existing contract rather than splitting by technical layer. Treat extraction as an option unlocked by good modularity, not as the plan.

## Operational Considerations

Operations are simpler than in distributed styles: one deployable, centralized logging, straightforward rollbacks. Still, modules need observability: standardize logging/metrics/tracing fields so you can follow flows across seams; publish SLOs per module where it matters. Version events and contracts, deprecate with timelines, and keep a small set of end-to-end tests to prove the wiring across modules.

### Decision Signals to Revisit the Style

Re-evaluate boundaries or consider extraction when you see sustained cross-module changes that force coordination, “just this once” back-edges becoming precedent, incident blast radius crossing module lines, or hot modules that dominate resources and can’t be isolated with in-process techniques. Use lead time, incident spread, and dependency metrics to guide the call.

## Recommended Reading

#### Web Resources

* Developer To Architect, *[Fundamental Lesson: Modular Monolith](https://developertoarchitect.com/lessons/lesson159.html)*

#### Books

* Bain, D., O’Dea, M., & Ford, N. (2024). *Head First Software Architecture*. O’Reilly Media.  
  * **Chapter 7: Modular Monoliths — Driven by the Domain**\
    Shows how to slice by capability, assign ownership, and design contracts/events that reflect business language. Includes boundary-enforcement patterns and a performance/maintainability/testability lens.
