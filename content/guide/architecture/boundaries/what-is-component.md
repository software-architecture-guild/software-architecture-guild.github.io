---
weight: 255
title: "What is Component?"
description: "This article explains what a software component is, how it encapsulates responsibility behind clear contracts, and how to use components as the building blocks of architecture."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

A component is the basic unit of structure in your architecture. It is the place where you decide together what changes, what can evolve independently, and who owns which decisions. Get components right and everything else—services, modules, deployment topologies—becomes much easier to reason about. Get them wrong and your system slowly turns into a tangle of hidden dependencies and “just this once” hacks.

## Why Components Matter

Components are where business intent meets technical reality. A “Payments” component, a “Catalog” component, an “Onboarding” component—these are the shapes that define how work is split across teams, how risk is isolated, and how fast you can change. They are not just code folders or services; they are responsibility boundaries that control how complexity spreads.

### Components as Units of Responsibility

At its core, a component is a unit of responsibility:

* It has a clear purpose in business terms.  
* It owns a coherent set of behaviors and data.  
* It is the default home for a particular kind of change.

If you cannot answer “what is this component responsible for?” in one short sentence, you do not have a component; you have a bucket.

### Components vs Services vs Modules

“Component” is a logical concept. It is independent of:

* Whether you deploy it as a microservice, a library, or a piece of a monolith.  
* Which language or framework do you use?  
* How many teams work on the codebase?

You can (and should) do component-based design inside a single deployable application. Microservices without clear component thinking just give you a distributed big ball of mud.

## What Exactly Is a Component?

A component is a self-contained unit of software with three parts: a responsibility, a contract, and an implementation. Responsibility defines why it exists; the contract defines how others see it; and implementation is everything it does to keep that promise.

{{< image src="/images/architecture/fundamentals/boundaries.component.drawio.png" alt="Component boundary with responsibility, contract, and implementation" >}}

### Responsibility, Contract, Implementation

You can describe any component with three questions:

* **What do I do?** – The behaviors I offer to the rest of the system.  
* **How can others use me?** – The inputs, outputs, and error semantics of my interface.  
* **How do I do it internally?** – Data structures, algorithms, frameworks, integrations.

Good components make the first two questions easy to answer and make the third one almost irrelevant to everyone else.

### Encapsulation and Knowledge Hiding

Encapsulation is what turns “a pile of code” into a component:

* Internal details (tables, helper classes, network calls) are hidden.  
* Only the contract is visible and stable enough for others to rely on.  
* Callers never reach into a component’s internals “just for this one thing.”

Every time you let an internal decision leak out—“just reuse this table,” “just call this internal endpoint”—you are eroding the component boundary and increasing coupling.

### Autonomy and Replaceability

A valuable component has enough autonomy that you could replace its implementation without rewriting the whole system:

* It owns its rules and data.  
* It hides technology choices (database brand, HTTP client, message broker details).  
* Its contract is stable enough to survive internal rewrites.

You may never actually swap it out, but designing for replaceability forces you to keep the boundary clean.

## Components, Cohesion, and Coupling

Component design is where cohesion and coupling become concrete. Cohesion is about whether the responsibilities inside a component belong together. Coupling is about how much knowledge, coordination, and dependency leak across component boundaries.

### High Cohesion: One Reason to Exist

A cohesive component:

* Has one primary reason to exist (for example, “manage product catalog,” “manage billing accounts”).  
* Groups of behaviors that naturally change together.  
* Minimizes “miscellaneous extras” that don’t fit the core story.

{{< image src="/images/architecture/fundamentals/boundaries.cohesion.high.drawio.png" alt="High cohesion example across modules" >}}

High cohesion makes ownership clearer: when a business rule changes, you know which component should absorb the change. It keeps reasoning local and reduces the need to understand half the system to make one safe modification.

### Low Cohesion: A Grab-Bag of Responsibilities

Low cohesion shows up when one component becomes a dumping ground for unrelated concerns:

* Validation, orchestration, reporting, and helper logic all end up mixed together.  
* Different kinds of changes keep landing in the same place.  
* Nobody can describe the component’s responsibility in one short sentence.

{{< image src="/images/architecture/fundamentals/boundaries.cohesion.low.drawio.png" alt="Low cohesion example across modules" >}}

These “god components” attract change from every direction. They are hard to test, hard to split later, and usually signal that the boundary was drawn around convenience rather than responsibility.

### High Coupling: Leaky and Fragile Connections

High coupling means components know too much about each other or depend on each other too directly:

* One component depends on another’s internal data structures or workflows.  
* Several components need to change together for one business change.  
* Shared tables, shared flags, or implicit assumptions become part of the real contract.

{{< image src="/images/architecture/fundamentals/boundaries.coupling.high.drawio.png" alt="High coupling example between modules" >}}

High coupling makes change propagation unpredictable. A local refactor stops being local because callers rely on hidden details they were never supposed to know.

### Low Coupling: Narrow, Purposeful Connections

A well-designed component:

* Exposes a clear contract tailored to its responsibilities.  
* Avoids leaking internal types or database schemas.  
* Keeps callers depending on what it does, not how it does it.

{{< image src="/images/architecture/fundamentals/boundaries.coupling.low.drawio.png" alt="Low coupling example between modules" >}}

Low coupling does not mean no coupling. Components still collaborate, but they do so through narrow, intentional interfaces. The design goal is high cohesion inside the component and low coupling across the boundary: keep what belongs together together, and let only what is necessary leak out.

## Boundaries, Contracts, and Data Ownership

Component boundaries only matter if clear contracts and strong data ownership back them. Otherwise, they are just boxes on a slide.

### Contracts: Behavior, Not Plumbing

A component’s contract is more than a function signature or API path. It should:

* Describe business behavior: what does this operation actually do?  
* Specify inputs, outputs, and error conditions in business terms.  
* Capture non-functional expectations: latency, idempotency, side effects.

Good contracts let you reason about the system as a set of capabilities: “if I call this, what can I count on?” Bad contracts leak internal data structures and leave behavior implied or guessable.

### Data Ownership: One Writer, Many Readers

Data boundaries are component boundaries:

* Each important dataset should have a single owning component that writes it.  
* Other components consume via APIs, events, or read models—not by writing to the same tables.  
* Local caches and replicated read models are fine as long as there is one authoritative writer.

Shared write models are a direct attack on modularity. They force tightly coupled deployments, complicated migrations, and “who owns this?” confusion.

## Components in an Architecture

Once you have a good definition of a component, you can place them into broader architectures without changing what they are.

### Logical vs Deployment Components

Distinguish between:

* **Logical components** – your conceptual units of responsibility.  
* **Deployment units** – how you slice binaries, containers, and services.

Sometimes a single deployment unit contains several components (a modular monolith). Sometimes one logical component is split across deployments (not ideal, but reality). You still design logically first; deployment comes later.

### Interactions: Synchronous and Asynchronous

Components can interact in different ways:

* **Synchronous**: direct calls (function calls, REST, gRPC) when you need immediate responses and tight SLAs.  
* **Asynchronous**: messages and events when you want decoupling in time, back-pressure smoothing, or broadcasting.

The interaction style doesn’t change what a component is, but it changes:

* How failures propagate.  
* How you design contracts (timeouts, retries, ordering, idempotency).  
* How you observe and debug flows.

### Cross-Cutting Concerns at the Boundary

Components are a natural place to anchor cross-cutting concerns:

* Authentication and authorization at the edge.  
* Logging, metrics, and tracing at boundaries.  
* Caching and rate limiting as part of the contract.

If you spread these concerns randomly across the system, you lose the ability to reason about behaviors at the component level.

## Designing Components

Component design is an iterative process. You will not guess the perfect boundaries on day one, but you can make them good enough and improve them as you learn.

### Finding Responsibilities

Start from business language and workflows, not from tables and endpoints:

* Identify capabilities: “User Management,” “Billing,” “Reporting,” “Onboarding.”  
* Ask what decisions each capability makes and what data it needs to make them.  
* Draw the line around coherent responsibilities.

A good litmus test: when discussing a change, can you say “this is clearly a change in component X”? If the answer is always “it depends,” your boundaries are muddy.

### Shaping the Dependency Profile

Each component has an incoming and outgoing dependency profile:

* Incoming: who depends on me? How many callers, how critical?  
* Outgoing: what do I depend on? How many external systems, libraries, and services?

Healthy components:

* High in the call graph: many incoming, few outgoing dependencies.  
* Low in the call graph: more outgoing, but still well-structured and acyclic.

Cycles between components (“A depends on B and B depends on A”) are a structural smell. Break them with a shared abstraction, a new component, or events.

### Evolving Components Over Time

As the system grows, you will need to:

* **Split** components that accumulate too many responsibilities.  
* **Merge** components that only exist because of earlier technical constraints.  
* **Extract** new components when a subset of logic starts changing on a different cadence.

Change patterns usually guide the right move:

* If two parts always change together, they probably belong in one component.  
* If a part changes often while the rest is stable, it may deserve its own component.

Component design is not a one-time “architecture phase.” It is ongoing hygiene.

## Common Pitfalls

Certain patterns reliably undermine component-based thinking.

### “Common” and “Util” Components

“Common”, “Shared”, and “Util” components are magnets for unrelated behavior:

* They end up mixing low-level helpers with domain rules.  
* Everyone depends on them, but nobody clearly owns them.  
* Any change risks breaking half the system.

A simple rule: shared components should be pure utility (no business decisions), or clearly scoped domain components with real responsibilities.

### Table-Driven Boundaries

Designing components around database tables (“one service per table”) produces:

* Anemic components that just mirror persistence structure.  
* Business rules scattered across many components.  
* Frequent cross-boundary joins and cross-table updates.

Instead, design around responsibilities and behaviors, then decide where data should live to support those responsibilities.

### Over-Fragmentation and God Components

You can fail in two opposite ways:

* Too many tiny components that do almost nothing each—high wiring overhead, low clarity.  
* Too few giant components that accumulate every new feature—high risk, low focus.

Both problems come from skipping the responsibility question and slicing by technology or convenience instead.

## Summary

A component is a unit of responsibility with a clear contract and hidden implementation. It owns specific behaviors and data, shields the rest of the system from its internal decisions, and provides a natural place to discuss ownership, change, and risk. Components sit at the heart of modularity: they balance cohesion and coupling, shape how teams work, and define how your system evolves.

If you treat components as first-class citizens—designing their responsibilities, contracts, data ownership, and dependencies deliberately—you can grow your architecture without drowning in complexity. If you treat them as just code folders or service labels, you will eventually ship a distributed tangle with nicer diagrams.

## Recommended Reading

#### Books

* Richards, M., & Ford, N. (2020). *[Fundamentals of Software Architecture: An Engineering Approach](https://softwarearchitectureguild.substack.com/p/book-review-a-field-guide-to-fundamentals)* . O'Reilly Media.
  * **Chapter 8: Component-Based Thinking**\
    Introduces components as encapsulated building blocks of architecture and shows how component-based thinking supports modularity, maintainability, and team scaling.
* Bain, D., O’Dea, M., & Ford, N. (2024). *[Head First Software Architecture](https://softwarearchitectureguild.substack.com/p/book-review-design-around-change)*. O'Reilly Media.  
  * **Chapter 4: Logical Components: The Building Blocks**\
    Frames components as units of responsibility and ownership, with practical guidance on finding boundaries, defining contracts, and avoiding common component pitfalls.
