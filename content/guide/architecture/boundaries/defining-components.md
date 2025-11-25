---
weight: 256
title: "Defining components"
description: "This article explains what a software component is, how to define components as responsible building blocks, and how to apply patterns to shape clear boundaries."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Defining components is where architecture becomes real. It is the moment you decide what belongs together, what can evolve independently, and where change will hurt. Once you have a good set of components, services and deployment diagrams are just packaging choices. Without them, every change feels like poking a blob.

## Why Defining Components Matters

Defining components is how you turn “we have a codebase” into “we have an architecture.” This block explains why component boundaries drive everything else: ownership, deployability, testability, and the cost of change.

### Components as the Architecture’s Building Blocks

Components are your primary building blocks:

* Each component owns a slice of behavior and data.  
* Components talk to each other through contracts, not shared internals.  
* Teams and services are usually shaped around components, not the other way round.

If you define components well, you get:

* Clear “homes” for new behavior.  
* Smaller blast radius when requirements change.  
* A shared language for discussing trade-offs (“this is a component boundary change”).

If you define them badly, you get god components, random helpers, and services that are just arbitrary slices of a monolith.

### From Legacy Decomposition to Greenfield Design

Many decomposition patterns were written for breaking monoliths, but they are just as useful when you design from scratch:

* “Identify and size components” becomes a way to avoid god components on day one.  
* “Gather common domain components” prevents you from duplicating core concepts in every module.  
* “Flatten components” keeps structure understandable as the system grows.  
* “Determine component dependencies” stops you from building cycles you’ll regret later.

You can either discover these patterns by suffering for a few years, or apply them deliberately up front.

## What It Means to Define a Component

Defining a component is more than drawing a box. This block clarifies what a component actually is: a bundle of responsibility, contract, and implementation, plus the knowledge boundary around them.

### Responsibility and Scope

Start with responsibility, not technology:

* A component should have a short, business-flavored mission statement:  
  * “Manages subscription lifecycle.”  
  * “Calculates shipping options and costs.”  
  * “Maintains product catalog and availability.”  
* Everything inside the component should exist to support that mission.  

If a component’s description sounds like “misc stuff we didn’t know where to put,” you have a bucket, not a component.

Scope questions that help:

* What decisions does this component own?  
* What data does it own to make those decisions?  
* What changes should *always* land here by default?

If the answers are fuzzy, your component definition is too.

### Contracts and Knowledge Hiding

A component lives or dies by its contract:

* The contract says **what** the component does in terms of operations and guarantees.  
* It hides **how** it does it: data model, algorithms, APIs of downstream systems.  
* Callers depend on the contract, not on internal tables, DTOs, or folder structure.

Good component contracts:

* Speak in domain terms, not low-level plumbing.  
* Describe error behavior, not just success responses.  
* Avoid forcing the caller to know internal state transitions or data layouts.

Every internal detail you leak into the contract is a piece of knowledge you now have to carry forever.

### Size and Depth

A component should be big enough to contain real complexity, and small enough to understand:

* **Too big**: one component hoovers up half the system’s logic. You have a god component.  
* **Too small**: dozens of tiny components that each wrap a couple of functions or tables. You have fragmentation.

The sweet spot is a **deep component**:

* A small public surface.  
* Hides a lot of internal detail behind that surface.  
* Gives you a single place to reason about a behavior.

When you define components, pay attention to outliers: very large or very tiny components are design smells. They either need to be split, merged, or re-scoped.

## Patterns for Defining Components

You do not have to define components from scratch each time. This block turns decomposition patterns into a practical playbook you can use when sketching a new system or reshaping an existing one.

### Pattern: Identify and Size Components

Start by sketching candidate components:

* Use domain language and workflows to propose initial components.  
* Map those onto namespaces, packages, or modules in code.  
* Look at their relative “size” (LOC, statements, number of classes).

Use size as a **signal**, not a target:

* A few larger components that own core capabilities are fine.  
* One or two huge everything-buckets are not.  
* Many tiny components that barely do anything are not.

The goal of this pattern is to find a first pass of components that feel like real building blocks, not accidental groupings.

### Pattern: Gather Common Domain Components

In most systems, there are cross-cutting domain concepts:

* Customer, account, product, subscription, ticket, catalog, etc.

If you’re not careful:

* Each feature slice grows its own mini-“Customer” or “Product” logic.  
* Rules diverge, bugs multiply, and you make integration impossible.

Instead, deliberately **gather common domain components**:

* Identify concepts that appear in many use cases.  
* Create dedicated components for them with clear ownership.  
* Move duplicated rules into those components and delete clones elsewhere.

The trade-off:

* You avoid behavior duplication and inconsistency.  
* You risk creating “everything shared” components if you’re sloppy.

The key is to only gather **real domain rules**, not random helpers or low-level utilities.

### Pattern: Flatten Component Hierarchies

Deep, irregular hierarchies are hard to reason about:

* `platform.core.domain.customer.v1` vs `services.customer.customer-domain`.  
* Random nesting that reflects history, not design.

Flattening components means:

* Choosing a **small set of top-level components** that everyone recognizes.  
* Using subpackages or submodules only when they mirror meaningful sub-responsibilities.  
* Avoiding long chains of one-child directories that add no information.

A flat, predictable component layout:

* Makes it easier for new people to find the right place for changes.  
* Exposes god components faster because you can see which boxes are absorbing too much.

### Pattern: Determine Component Dependencies

Once you have candidates, you need to understand how they depend on each other:

* Draw a dependency graph between components (imports, calls, events).  
* Look for cycles: A → B → C → A.  
* Look for “upside-down” relationships, where low-level technical components depend on high-level domain ones.

Then, refactor dependency directions to match intent:

* Core domain components should not depend on UI or reporting.  
* Utilities should sit at the bottom of the graph, not at the top.  
* Components that often change together might belong closer together in the graph.

This pattern turns a vague “we’re modular” claim into a concrete picture of who depends on whom.

### Pattern: Create Component Domains

Single components rarely stand alone. You often get **clusters**:

* A set of components that collectively deliver a business capability.  
* Shared language, shared timelines, shared stakeholders.

Creating component domains means:

* Grouping related components into higher-level domains (for example, “Billing,” “Customer Management,” “Onboarding”).  
* Making those domains explicit in your documentation and team structure.  
* Treating cross-domain dependencies with more scrutiny than relationships inside a domain.

Domains are where you start talking about team ownership and roadmaps. Components are how you express those domains in code.

### Pattern: Connect Components into Services

Finally, components have to live somewhere at runtime:

* You might host several components in a single deployable (a modular monolith).  
* You might deploy one domain’s components as a service.  
* You might mix and match, depending on scale and volatility.

The pattern here is simple:

* **Build services from components**, not components from services.  
* Decide service boundaries based on domains, volatility, and operational needs.  
* Let components stay as the stable, logical structure underneath.

If you start by drawing service boxes and invent components to fill them, you usually end up fighting the codebase.

## Components and Operational Data

Components are not just behavior; they are also about **who owns which data**. This block ties component design to operational data in a lightweight way, without going deep into database patterns.

### Data Ownership as a Design Constraint

A component is not really a component if it does not own any data:

* Each major dataset should have a clear owning component.  
* There should be exactly one primary writer for that data.  
* Other components can read via APIs, events, or read models.

When defining components, ask:

* “Which data does this component own?”  
* “Who else, if anyone, is allowed to write it?”  
* “How do other components learn about changes?”

If many components write the same tables “because it’s simple,” you don’t have components—you have a shared database with procedural code around it.

### When Data Suggests a New Component

Sometimes, data pushes you toward a new component boundary:

* A table or document that many components touch and argue about.  
* A dataset that changes on a different cadence from the rest of the code.  
* A cluster of queries and updates that always travel together.

That’s a hint:

* Either you need a dedicated component to own that data.  
* Or your existing components are too fine-grained or badly scoped.

Use data as a **sanity check** on your component model: if the data boundaries and the component boundaries don’t roughly align, one of them is wrong.

## Using Metrics and Feedback Loops

Component design is not a “decide once and forget” activity. This block shows how to use simple metrics and feedback mechanisms to keep boundaries healthy over time.

### Checking Component Size and Shape

You can’t manage what you never measure. Even simple metrics help:

* Count statements or lines of code per component.  
* Track distribution: which components are growing fastest?  
* Flag outliers that are way larger or smaller than the rest.

These metrics don’t tell you what to do, but they tell you **where to look**:

* Very large components might need splitting or clearer responsibilities.  
* Tiny components might be noise that can be merged.  
* Components that grow faster than others might be becoming dumping grounds.

### Abstractness, Instability, and Balance

Two useful dimensions for components are:

* **Abstractness** – how much of the code is abstract (interfaces, base classes) vs concrete implementations.  
* **Instability** – how much a component depends on others vs how much others depend on it.

Intuitively:

* Very abstract and very stable components are foundations: reusable and rarely changing.  
* Very concrete and very unstable components are volatile and fragile.  
* Components that are either over-abstracted and unused, or very concrete but depended on by many others, tend to be painful.

You don’t need perfect numbers. The point is to spot weird outliers and ask “why is this component shaped like that?”

### Fitness Functions and Architecture Stories

To keep component design from decaying quietly:

* Define **fitness functions**: automated checks that fail builds or raise alerts when components cross certain thresholds (size, cycles, dependency count, etc.).  
* Write **architecture stories**: small, testable goals like “component X no longer depends on the shared database” or “all customer rules live in the Customer component.”

Fitness functions give you continuous feedback. Architecture stories give you focused refactoring targets. Together they turn “we should keep components clean” into concrete work.

## Summary

Defining components is how you move from “we have code” to “we have an architecture we can evolve.” A component is a unit of responsibility with a clear contract, hidden implementation, and owned data. Using patterns like “identify and size components,” “gather common domain components,” “flatten hierarchies,” “determine dependencies,” and “create component domains,” you can shape a component model that is understandable, testable, and change-friendly.

Operational data and metrics then act as feedback: data ownership keeps boundaries honest, and simple measures of size, dependencies, abstractness, and instability highlight where components are drifting out of shape. You will never design the perfect set of components on day one, but if you treat component definition as an ongoing design practice, your system can grow without collapsing under its own weight.

## Recommended Reading

#### Books

* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O’Reilly.  
  * **Chapter 4: Architectural Decomposition**\
    Explains why components are the primary building blocks of architecture and how to evaluate whether existing structures are decomposable.  
  * **Chapter 5: Component-Based Decomposition Patterns**\
    Introduces a set of repeatable patterns—identify and size components, gather common domain components, flatten components, determine dependencies, and group into domains—that can be applied both to legacy systems and new designs.  
  * **Chapter 6: Pulling Apart Operational Data**\
    Connects component boundaries with data ownership, showing how operational data and database structure influence and validate component design.
