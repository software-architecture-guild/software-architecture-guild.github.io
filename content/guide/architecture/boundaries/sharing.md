---
weight: 258
title: "Sharing"
description: "This article explains what sharing and reuse mean in distributed architectures, how different reuse techniques affect coupling and risk, and how to choose what to share instead of copying everything or nothing."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---
{{< md-lint "<!-- markdownlint-disable MD024 -->" >}}

Sharing is where good intentions quietly turn systems into knots. “Let’s reuse this” sounds responsible, but in distributed architectures how you reuse and what you reuse can either reduce complexity or hard-wire your system into a fragile tangle. This article treats sharing as an architectural decision: a toolbox of patterns with explicit trade-offs, not a moral rule about DRY vs duplication.

## Why Sharing is an Architectural Problem

Sharing isn’t just about saving a few lines of code. Every reuse decision shapes coupling, deployment risk, and how failures propagate. If you treat sharing as a local developer concern (“I’ll just extract this helper”), you can accidentally create global dependencies that are hard to undo later.

### Code Reuse vs Architectural Reuse

There’s a difference between:

* **Local code reuse** – a helper function moved into a small utility module.  
* **Architectural reuse** – a library, service, or platform that many teams depend on.

Local reuse affects a few files. Architectural reuse affects how dozens of services change, deploy, and fail together. Once reuse crosses service and team boundaries, it stops being a simple DRY refactor and becomes a structural choice.

### DRY vs WET as Trade-offs, Not Ideologies

“Don’t Repeat Yourself” and “Write Everything Twice” are both extreme slogans. In reality:

* Duplication is sometimes the cheapest way to stay decoupled.  
* Reuse is sometimes the safest way to stay consistent.  

The real question is never “Is duplication bad?” It’s:

> “Where does reuse give us more value than the coupling it introduces?”

To answer that, you need a clear view of your reuse options.

## Four Techniques for Sharing Behavior

There are four main ways to share behavior across services. None of them are “the best” by default; each has a specific coupling profile.

### Code Replication

Code replication means copying a piece of code into multiple services with no shared artifact.

You literally duplicate:

* A small utility function.  
* A simple formatter or mapper.  
* A constant or attribute used for annotations.

You’d never do this for complex logic, but for tiny, low-volatility code it can be the least harmful option.

##### Advantages

* No shared binary or runtime dependency.  
* Each service can evolve or delete its copy independently.  
* Keeps bounded contexts and services loosely coupled.

##### Disadvantages

* Fixing a bug means patching every copy.  
* High chance of drift: slightly different behavior in each service.  
* No single place to see “what this thing really does now.”

##### When it works

* The code is small, boring, and almost never changes.  
* You’re decomposing a monolith and want to let each new service simplify its own copy over time.  

Replication is a scalpel: use it for tiny, stable things when decoupling matters more than central control.

### Shared Libraries

A shared library is a binary artifact (JAR, DLL, package) many services link to at compile time.

You use it for:

* Common validation rules.  
* Shared formatting, parsing, or calculation logic.  
* Cross-cutting infrastructure helpers (security, logging, annotations).

The hard part is granularity:

* One big “kitchen sink” library is easy to depend on but hard to change.  
* Many small, focused libraries give better change control but make dependency graphs noisy.

##### Advantages

* Compile-time guarantees about what version you depend on.  
* Good fit for homogeneous tech stacks (same language/platform).  
* Changes are controlled by versioning rather than surprise runtime behavior.

##### Disadvantages

* Managing versions, deprecations, and upgrades is a non-trivial coordination problem.  
* A breaking change in a widely used library can force many services to retest and redeploy.  
* Heterogeneous stacks must duplicate logic anyway; libraries don’t span languages.

##### When it works

* Your environment is mostly one or two languages.  
* The shared behavior changes slowly or moderately, not daily.  
* You’re willing to invest in artifact management and versioning discipline.

Shared libraries are often the default reuse mechanism, but in distributed systems you have to be intentional about what goes into them and how fine-grained they are.

### Shared Services

A shared service is a network-accessible service that centralizes some capability:

* Discount calculation.  
* Document rendering.  
* Shared search or rules evaluation.

Instead of linking a library, callers send requests over the network.

##### Advantages

* Works across languages and platforms.  
* Change behavior once; all consumers can see the new behavior without redeploying.  
* Can encapsulate heavy logic or data that’s painful to ship everywhere.

##### Disadvantages

* Every call pays network and security overhead.  
* The shared service becomes a runtime bottleneck and a single point of failure.  
* API versioning becomes noisy (URL versions, header flags, feature switches).  
* A bad deployment can break many dependent services at once.

##### When it works

* You’re in a polyglot environment and a shared library isn’t realistic.  
* The shared logic changes often and central control is worth the runtime risk.  
* You have strong operational maturity (monitoring, canaries, rollbacks).

Shared services trade compile-time safety for operational agility. Treat them like critical infrastructure, not a casual way to avoid duplication.

### Sidecars and Service Mesh

Sidecars and meshes target operational reuse, not domain reuse.

* A **sidecar** is a companion process that sits next to your service and handles things like:  
  * TLS, authentication, retries, timeouts.  
  * Logging, metrics, tracing.  
  * Service discovery, traffic shaping.
* A **service mesh** wires all sidecars together into a control plane that can:  
  * Apply policies centrally.  
  * Route and observe traffic consistently.  
  * Roll out operational changes without touching domain code.

You’re not sharing domain classes in the sidecar; you’re sharing infrastructure capabilities.

##### Advantages

* Consistent operational behavior across services and languages.  
* Domain code stays decoupled; operational coupling moves into the mesh.  
* You can evolve infrastructure independently from business logic.

##### Disadvantages

* Engineering investment to build or adopt and run the mesh.  
* Risk of overloading the sidecar with too many responsibilities.  
* Requires governance: what’s allowed in the mesh vs in the service?

##### When it works

* You have many services and want standard logging, metrics, auth, and traffic control.  
* You’re okay with an extra hop in the request path in exchange for consistency.  

Sidecars and meshes are an orthogonal reuse mechanism: they cross many services but stay out of their domain models.

## Domain Reuse vs Operational Reuse

Not all reuse is the same. Mixing domain and operational concerns in the same “shared thing” is how you build your next accidental monolith.

### Domain Coupling

Domain reuse touches business rules and models:

* Discount policies.  
* Customer eligibility checks.  
* Ticket classification logic.

Coupling here changes the meaning of your system. If one shared abstraction tries to cover all domains (“one true Customer for everyone”), it grows until nobody really understands it and every change risks breaking a different context.

Practical rule:

* Be very cautious with shared domain models and services.  
* Prefer clear bounded contexts with their own models, even if names overlap.  
* Share narrow, well-understood behaviors, not entire business objects.

### Operational Coupling and Orthogonal Concerns

Operational reuse covers:

* Logging and metrics.  
* Authentication and authorization.  
* Transport, retries, backoff, circuit breaking.

These concerns are orthogonal to the business. They cut across services, but they don’t belong to any single domain. That makes them ideal for sidecars, meshes, and focused infrastructure libraries.

Practical rule:

* Domain and operational concerns live on different axes.  
* Domain reuse should be rare, deliberate, and tightly scoped.  
* Operational reuse should be broad and centralized, but carefully bounded to infrastructure.

## Choosing What to Reuse

Even with a good toolbox, the hardest question remains: what should you reuse at all?

### Volatility and Reuse

The key variable is rate of change.

Fast-changing behavior is a terrible reuse target:

* If you centralize it, every experiment and bug fix becomes a risky change for all consumers.  
* If you embed it everywhere, you’ll be constantly updating copies.

Slow-changing behavior is a great reuse target:

* It’s stable enough to centralize without constant breakage.  
* Consumers can rely on it without living in fear of new surprises.

Good reuse candidates:

* Stable calculations and transformations.  
* Common infrastructure adapters.  
* Platform APIs that change slowly from the client’s point of view, even if internals move fast.

Bad reuse candidates:

* Core domain flows that each bounded context wants to evolve differently.  
* Early-stage logic under heavy experimentation.  
* Framework code you haven’t really understood yet.

A useful test:

> “If this changes three times next quarter, do we want everyone to see it at once?”

If the answer is “no,” maybe don’t centralize it.

### Reuse via Platforms

One of the most robust forms of reuse is a platform:

* It exposes a stable API around a capability (payments, messaging, search, identity).  
* Internally, it can evolve aggressively.  
* Externally, it looks slow-changing and predictable to its consumers.

A platform is not “just another shared service.” It comes with:

* Clear product-like ownership.  
* Roadmaps and versioning policies.  
* SLOs and governance.

Platform reuse aligns three things:

* Teams get a powerful capability they don’t have to build.  
* The platform team gets a clear mandate and feedback loop.  
* The architecture avoids accidental, ad-hoc duplication of heavy infrastructure.

## Putting It Together

Sharing is unavoidable. The real choice is how you share and what you’re willing to couple through that sharing.

* Use **code replication** for tiny, near-static pieces where decoupling beats central control.  
* Use **shared libraries** for stable, cross-cutting behavior in homogeneous stacks, with careful versioning and scope.  
* Use **shared services** sparingly for polyglot reuse or high-volatility behavior, accepting runtime coupling and operational risk.  
* Use **sidecars and meshes** for operational concerns, keeping domain logic decoupled while standardizing infrastructure.  
* Favor reuse for **slow-changing** capabilities, and treat platforms as first-class reuse products.

If you treat sharing as an architectural decision instead of a reflex against duplication, you can get the benefits of reuse without building your next tightly coupled mess.

## Recommended Reading

#### Books

* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O'Reilly Media.  
  * **Chapter 8: Reuse Patterns**\
    Explores code replication, shared libraries, shared services, and sidecars/meshes as distinct reuse techniques, and reframes reuse around volatility and platform thinking rather than blind DRY.
