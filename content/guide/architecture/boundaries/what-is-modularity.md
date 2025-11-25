---
weight: 252
title: "What is Modularity?"
description: "This article explains what modularity is, how it turns systems into evolvable building blocks, and how to use it to localize change and manage complexity."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Modularity is how you carve a system into pieces that can change without breaking everything else. When it works, you shrink the blast radius of change, cut the cognitive load for engineers, and create room for the architecture to evolve at the speed of the business. When it fails, you just get the same chaos spread across more files and services.

## Why Modularity Matters

Modularity is not about neat diagrams or fashionable patterns; it is about survival under change. A modular system lets you add capabilities, fix bugs, and switch technologies without taking the whole product hostage. A non-modular system might run fine today but becomes slower, riskier, and more expensive to touch over time, until every change feels like defusing a bomb.

### Modularity as “Evolvability by Design”

You can think of modularity as **designing a system to evolve**:

* A module has a clear purpose and a stable public surface.  
* Internal details can change freely as long as that surface stays intact.  
* The rest of the system does not need to know how the module works, only what it promises.

Done well, this makes future changes “reasonable” in effort: you still have to think, but you are not rewriting the world for each new requirement. Done badly, you just shuffle responsibilities around and keep the same entanglement.

### Modularity vs. Complexity

Modularity is supposed to make complexity tractable, not disappear. The real question is:

* Does complexity stay **local**, inside modules and their boundaries?  
* Or does it **leak everywhere**, so every change touches many parts?

A highly modular architecture still has complex modules; the difference is that this complexity is contained. A big ball of mud shares knowledge promiscuously: rules are duplicated, state is shared, and every decision seems to depend on everything else.

## What Exactly Is a Module?

To talk about modularity, you need a clear idea of what a module is. Ignore technology for a moment—no “service vs package” debates. Focus on the shape of knowledge and responsibility.

Modularity is about drawing **boundaries around self-contained functionality** and exposing only the knowledge others truly need, while hiding the rest.

### Function, Logic, and Context

A useful way to describe any module is through three kinds of knowledge:

* **Function** – what the module does, in terms of its public interface.  
  * Example: a “Payments” module offers “charge customer,” “refund payment,” “capture authorization.”  
* **Logic** – how it does it internally.  
  * Example: which payment provider it uses, how retries work, how it logs and audits.  
* **Context** – assumptions about its environment that are not in the interface.  
  * Example: needs a certain database, expects an authenticated user, assumes a specific currency setup.

Good modularity exposes *function* clearly, hides *logic* aggressively, and makes *context* either part of the contract or irrelevant to callers. Bad modularity leaks logic and context through “temporary” shortcuts and half-documented assumptions.

### Modules as Knowledge Boundaries

A module is a **knowledge boundary**:

* Inside, you can afford rich, tangled knowledge because the team controls it.  
* Outside, you want minimal, precise knowledge crossing the boundary.

Treating modules as knowledge boundaries forces hard questions:

* What **must** callers know to use this correctly?  
* What **must never** escape, or we’ll be stuck with this internal choice forever?  

If you cannot answer those questions, you do not have modularity—you have accidental groupings of code.

### Deep vs Shallow Modules

Not all modules are equal. Some hide a lot of complexity behind a small, simple interface; others barely hide anything:

* **Deep modules** provide a small interface that stands in for a lot of internal work. They reduce the number of concepts callers must juggle.  
* **Shallow modules** wrap implementation details one-for-one. They add names, not abstraction.

A shallow “UserUtils” module that just forwards calls to lower-level libraries is not modularity; it is clutter. A deep “PricingEngine” that hides a maze of rules behind a few clear operations is modularity paying off.

## Modularity, Coupling, and Cohesion

You cannot talk about modularity without talking about **coupling** (relationships between modules) and **cohesion** (how well things inside a module belong together). They are the practical levers that make modularity real.

Modularity is the shape of the **boxes**; coupling and cohesion describe the **arrows and contents**.

### Coupling: What Flows Between Modules

Coupling is the degree of dependency between modules—how much a change in one might force a change in another.

Good modularity:

* Minimizes the knowledge that crosses module boundaries.  
* Uses contracts that are tailored to interactions, not recycled internal models.  
* Keeps volatile rules inside modules instead of scattered across them.

You cannot judge modularity by counting modules. Two modules tightly coupled through shared tables and magic flags are less modular than one module with a clear boundary.

### Cohesion: What Lives Together

Cohesion is how strongly the responsibilities inside a module belong together.

Good modularity aims for **high cohesion**:

* Each module is responsible for a coherent set of behaviors or decisions.  
* Everything inside the module exists to serve that responsibility.  

Low cohesion modules have grab-bag responsibilities: validation, logging, business rules, UI formatting all mixed together. That usually leads to:

* Bigger change scopes (because each change touches this “god module”).  
* Confusing ownership (“who actually owns this rule?”).  
* Difficulty extracting anything clean later.

Modularity is the balance point where **internal coupling (cohesion) is strong** and **external coupling is as weak as possible**.

## Architectural vs Code Modularity

Modularity exists at many levels, and the rules are fractal: the same patterns apply from functions to entire systems.

Architectural modularity and code modularity are not separate universes; they are the same game at different scales.

### Code-Level Modularity

At the code level, modularity shows up in:

* Functions and methods that have single responsibilities.  
* Classes that represent clear concepts with well-defined interfaces.  
* Packages or namespaces that group related concepts.

Good code modularity:

* Keeps logic close to the data and concepts it belongs to.  
* Makes it obvious where to put new behavior.  
* Avoids sprawling utility buckets and ultra-generic helpers.

### Architectural Modularity

At the architectural level, modularity is how you slice the system into:

* Components, services, or bounded contexts.  
* Each with a specific domain responsibility and clear contracts.  
* Each with its own deployment, scaling, and failure characteristics.

Architectural modularity matters because it aligns the architecture with business and technology change:

* You can scale hot areas independently.  
* You can change or replace modules without rewriting everything.  
* You can assign teams to own modules end-to-end.

### Fractal Modularity: Same Rules, Bigger Stakes

The principles are the same across scales:

* A class with too many responsibilities looks like a “god object.”  
* A service with too many responsibilities looks like a “god service.”  
* A system with one dominant application looks like a “god monolith.”

In each case, modularity fails when responsibilities blur and knowledge leaks. The only difference at higher levels is the cost: every mistake is multiplied by more people, more deployments, and more dependencies.

## Modularity and Architectural Characteristics

Modularity is not an end in itself. It is a way of improving specific architectural characteristics: maintainability, testability, deployability, scalability, and fault tolerance. If modularity does not move these in the right direction, it is just extra ceremony.

### Maintainability

Modularity helps maintainability when:

* Changes are localized to a small number of modules.  
* Each module has a clear “home” for certain kinds of changes.  
* Internal rewrites do not leak into callers.

It hurts maintainability when:

* Responsibilities are smeared across many modules (or layers).  
* Modules are sliced by technical concerns only (UI, business logic, persistence) so every feature crosses all of them.  
* The “module boundary” is just a folder name.

### Testability

Modular systems are easier to test in depth but only if boundaries are respected:

* Small, focused modules can have small, focused test suites.  
* Deep modules let you test behavior through a few interfaces instead of poking internals.  

Testability collapses when:

* Behavior depends on long synchronous chains across many modules.  
* The “unit” of behavior is the entire system in practice, even if you have many modules on paper.

### Deployability

Architectural modularity improves deployability when modules are:

* Independently buildable and deployable.  
* Designed so most changes affect only one or a few modules.  
* Loosely coupled enough that you do not need big-bang coordinated releases.

If every meaningful change still requires orchestrating many modules in lockstep, you have **distributed deployment pain**, not modularity.

### Scalability and Fault Tolerance

Modularity supports scalability and fault tolerance by:

* Allowing hot modules to scale independently.  
* Isolating failures so the rest of the system can keep working.  
* Making it possible to degrade gracefully when certain modules are down.

But simply chopping a system into services is not enough. If every request fans out across many modules, you are still scaling and failing as one big unit—just with more network hops.

## Designing Modular Systems

Modularity is not just “splitting by domains” or “doing microservices.” It is a set of deliberate design choices about boundaries, responsibilities, and degrees of freedom.

### Start from Responsibilities, Not Technology

Good modular decomposition starts from:

* What the system **needs to decide** (business rules and invariants).  
* What the system **needs to remember** (data and identity).  
* What behaviors **tend to change together**.

You group responsibilities that naturally belong together and separate those that change or scale differently. The goal is:

* High internal coherence (things inside the module support the same goals).  
* Minimal external promises (only what callers truly need).

### Use Information Hiding as the Guiding Principle

Information hiding is the core principle behind modularity:

* Reveal the smallest possible surface that still lets callers use the module effectively.  
* Hide the rest, even if it feels “convenient” to expose now.  
* Make it cheaper to change internal decisions than to change external contracts.

Every time you leak an internal concept into the outside world “just this once,” you are borrowing against future modularity. The interest eventually comes due as brittle integrations and wide change scopes.

### Aim for “Reasonable Degrees of Freedom”

Trying to make modules handle every possible variation often backfires:

* Over-flexible interfaces force callers to understand too many options.  
* Modules become shallow wrappers over a tangle of special cases.  
* The number of system states explodes, and testing becomes impossible.

A better rule is to support **reasonable degrees of freedom**:

* Enough flexibility to cover real scenarios and expected evolution.  
* Clear boundaries on what is out of scope.  
* A path to add new capabilities without rewriting everything.

Modularity is about saying “no” as much as “yes”: refusing to expose knobs you are not willing to support long-term.

### Evolve Boundaries as You Learn

No modular structure is perfect from day one. You will:

* Discover responsibilities that were grouped together but evolve differently.  
* Find modules that became “god modules” as the system grew.  
* See duplicated rules across modules that should share an abstraction.

Modularity needs **iterative refinement**:

* Split modules that have grown too broad.  
* Merge modules that only exist because of past technical constraints.  
* Pull out shared rules into deeper modules where they truly belong.

The test of success is not elegance on the diagram; it is the ease of making the next few real changes.

## Anti-Patterns and Smells

Certain recurring patterns are red flags that modularity is failing.

### God Modules

Modules that “know everything and do everything”:

* Many unrelated responsibilities.  
* Huge interfaces that reveal internal structure.  
* Almost every change touches them.

These usually form when teams keep adding “just one more thing” to whatever module feels convenient. The fix is to re-identify core responsibilities and split by purpose, not by convenience.

### Anemic Modules and Fragmentation

On the opposite end are modules that are too small and too thin:

* Dozens of tiny modules that only forward calls.  
* No clear reason why something is in one module vs another.  
* High overhead in wiring, deployment, and configuration.

This usually means the system was decomposed mechanically (for example, “one class per table,” “one service per CRUD resource”) without thinking about deeper responsibilities.

### Accidental Modularity by Technology Layers

A classic smell is modularity by horizontal layers only:

* UI module, business logic module, database module.  
* Domain concepts sliced across all three, mixed with each other.

This structure makes almost every change “cross-cutting” by design. Real modularity emerges when you group around **domain responsibilities** first and use layers inside modules where they help.

## Summary

Modularity is how you turn a codebase into a set of knowledge boundaries that can evolve at different speeds without tearing the system apart. A module is more than a directory or a service; it is a bundle of function, logic, and context, with just enough exposed to be useful and the rest hidden so it can change.

Effective modularity balances coupling and cohesion, applies the same principles from methods to systems, and is judged by what it does to maintainability, testability, deployability, scalability, and fault tolerance—not by how pretty the diagram looks. You will not get the boundaries perfect up front, but if you treat them as design tools and keep refining them based on real change, your architecture can keep moving with the business instead of becoming its anchor.

## Recommended Reading

#### Books

* Mark Richards & Neal Ford (2020). *[Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)*. O’Reilly.  
  * **Chapter 3: Modularity**\
    Explores modularity as a driver for agility and competitive advantage through maintainability, testability, deployability, scalability, and fault tolerance.  
* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O’Reilly.  
  * **Chapter 3: Architectural Modularity**\
    Focuses on modularity at the architecture level, showing how different structures (monoliths, modular monoliths, services) affect change scope and operational characteristics.  
* Vlad Khononov (2024). *[Balancing Coupling in Software Design](https://coupling.dev/)*. Self-published.  
  * **Chapter 4: Coupling and Modularity**\
    Defines modules as knowledge boundaries, introduces function/logic/context, and connects modularity directly to coupling, complexity, and information hiding.
