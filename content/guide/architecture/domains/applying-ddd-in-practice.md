---
weight: 210
title: "Applying DDD in Practice"
description: "This article explains how to apply Domain-Driven Design in real-world systems, from brownfield modernization and “undercover DDD” to aligning microservices, event-driven architecture, and data mesh with domain boundaries."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

## Introduction

Domain-Driven Design reads clean in books and looks messy in production. You don’t start with a blank whiteboard; you start with legacy systems, partial knowledge, political constraints, and a backlog that was written long before anyone said “bounded context.”  

This article is about that reality: how to apply DDD in brownfield systems, how to sell it without preaching, and how to align it with microservices, event-driven architecture, and data mesh without building a distributed big ball of mud.

## Use Cases

### Start from strategy and reality, not patterns

The first move is not “let’s introduce aggregates.” It’s:

* What is the business strategy right now?  
* Where does this product make or lose money?  
* Which parts of the system are actually changing?  
* Where are we getting hurt: speed, quality, outages, regulatory risk?

From there you can map:

* Domains and subdomains — core (differentiating), supporting, generic.  
* Which subdomains your team actually touches. Forget the rest for now.  
* How current systems line up with those subdomains (or don’t).  

You’re not “doing DDD.” You’re answering: “Where would smarter domain modeling reduce risk and increase leverage?”

### Read the current design before you propose a new one

Before inventing new boundaries, learn how the current system behaves:

* Identify independently deployable / releasable units (even inside a monolith). These are often proto–bounded contexts.  
* Sketch a context map of today: components, data stores, integration patterns, and key upstream/downstream relationships.  
* Note smells:
  * The same core rules implemented in three places.  
  * Core logic sitting inside a vendor’s configuration DSL.  
  * Teams constantly fighting over a “shared” module or database.  

Use EventStorming or scenario workshops to recover lost domain knowledge:

* Pick one painful flow (e.g., “customer onboarding for enterprise clients”).  
* Map events, commands, actors, policies, and systems.  
* Watch where people hesitate, disagree, or describe weird workarounds — those are the hot spots.

You’re trying to see where the problem space and solution space already line up, and where they violently don’t.

### Modernization strategy: think big, change small

The temptation is always: “Let’s rewrite it as proper bounded contexts and microservices.” That’s how you get a three-year failed initiative.

Better pattern:

1. **Stabilize subdomain boundaries logically**  
   Create modules/namespaces/packages that match subdomains, even inside the monolith.  
   Move code to match those labels before you touch infrastructure.  

2. **Introduce minimal bounded contexts**  
   Inside each subdomain module, start treating it as a bounded context: its own language, its own model, its own testing focus.  
   Don’t split deployments yet. Get language and invariants in order first.

3. **Evolve integration patterns deliberately**  
   Once minimal contexts exist, decide where you need ACLs, Open-Host Services, or “Separate Ways” based on team relationships.  
   Don’t announce “we’re re-architecting.” Just fix the ugliest seams one by one.

4. **Use Strangler, not big bang**  
   For truly toxic legacy, put a facade in front and route new flows to a new context.  
   Over time, shrink the legacy surface until it’s a tiny, boring stub — then kill it.

Think of it as peeling a legacy system into better-shaped contexts, not blowing it up and starting from scratch.

### Tactical modernization: fix mismatches, not everything

You will find core subdomains implemented with the simplest possible patterns:

* Transaction Scripts scattered across controllers.  
* Active Record models stuffed with business logic and SQL.  

You do not need to “convert everything to event sourcing” to be doing DDD.

Better moves:

* Identify where consistency actually matters. Those are candidates for aggregates and rich domain models.  
* Incrementally:
  * Extract value objects from repeated field clusters.  
  * Pull core invariants into methods on aggregates.  
  * Replace global validations and cross-cutting flags with explicit domain concepts.  
* Use ACL/OHS to protect refactors:
  * Keep the external contract stable while you move logic inside.  
  * Make migration invisible to other teams.

You’re shrinking the gap between how the system behaves and how the business thinks, one invariant at a time.

### Undercover DDD: practice without a corporate crusade

You usually don’t get to declare “from Monday we are a DDD shop.” That’s fine. Most of DDD is behavior, not ceremony.

You can:

* **Clean up language**  
  * Stop inventing technical names when a domain term already exists.  
  * Rename classes and methods to match how experts speak.  
  * Delete vague words like “Manager” and “Data” from everything that matters.
* **Draw local context maps**  
  * Even if the wider org doesn’t care, your team can map its own upstreams, downstreams, and interfaces.  
  * Use it to decide where to put ACLs instead of complaining about “that awful upstream.”
* **Model tiny slices well**  
  * Pick one flow in your area and treat it as a mini core domain.  
  * Run a small EventStorming session, refactor that slice, and show the before/after impact.

You don’t need permission to introduce better language, clearer boundaries, and saner aggregation. You just do it in the areas you own.

### Selling DDD: talk about risk and speed, not aggregates

When you need buy-in from managers or adjacent teams, don’t lead with DDD terminology. Lead with:

* **Risk reduction**  
  * “Right now, every pricing change means editing four services and three reports. We want one place where we can change the rules and test them clearly.”
* **Time-to-change**  
  * “This area changes monthly; we want a model that’s easy to reason about, not a tangle of conditionals.”
* **Ownership and autonomy**  
  * “If we line services up with subdomains, each team gets clearer ownership and fewer cross-team dependencies.”

If they care about “microservices” or “events,” show how domain-aligned boundaries and published languages make those architectures safer, not more trendy.

### DDD and microservices: don’t confuse boundaries

Microservices and DDD are tightly linked in people’s heads, but they solve different problems:

* **Microservice**  
  * A service with a small public interface and private data that can change and deploy independently.  
* **Bounded context**  
  * A boundary around a domain model and its language where terms have specific meanings.

Key points:

* All microservices are bounded contexts, but not all bounded contexts should be microservices.  
* A bounded context can be a modular monolith if that’s the right operational choice.  
* Splitting into one service per aggregate (or worse, per method) usually explodes global complexity.

A practical heuristic:

* Aim for deep services — narrow APIs, rich internal behavior.  
* Align service boundaries with subdomains or cohesive capabilities, not with tables or tiny classes.  
* Use published languages (OHS) and ACLs to keep service interfaces small as they evolve.

If you can’t explain what a service owns and why it exists in one sentence, your boundary is probably wrong.

### DDD and event-driven architecture: events as contracts

Event-driven architecture (EDA) is how components talk; event sourcing is how a component remembers its own history. Mixing them up causes pain.

Good EDA with DDD:

* Treat events as design elements, not just queue payloads.  
* Use clear event types:
  * **Notification events** — “something happened, go fetch data if you care.”  
  * **Event-carried state transfer** — “here’s the data you need; no call-back required.”  
  * **Public domain events** — only the small subset that truly belong in your published language.  

Anti-pattern:

* Publishing every internal domain event to everyone.  
  * You export your internal model.  
  * Consumers duplicate projection logic.  
  * Temporal coupling (“wait 5 minutes so reports are correct”) appears and never really works.

Refactor toward:

* A published event model per bounded context: integration-specific events that hide internal details.  
* Outbox, idempotency, correlation IDs, sagas/process managers for reliability and orchestration.  

DDD’s contribution here is: events should reflect domain concepts and boundaries, not random technical state changes.

### DDD and data mesh: extending domains into analytics

Domain thinking shouldn’t stop at operational systems. Analytics can either support or sabotage your models.

Traditional data warehouse/lake setups often:

* Centralize ETL in a separate team with poor domain context.  
* Couple analytical models to implementation details of many operational systems.  
* Break whenever an upstream model evolves — exactly what DDD encourages you to do.

Data mesh takes a DDD-flavored approach:

* Align analytical data products with bounded contexts / domains.  
  * The team that owns the operational model also owns its analytical projection.  
* Treat data products as APIs:
  * Clear schemas and SLAs.  
  * Versioning.  
  * Owned by domain teams, supported by a data platform.

In practice:

* Each significant context exposes facts and dimensions that make sense for its domain, not raw operational tables.  
* The mesh platform standardizes discovery, access, and governance.  
* You avoid thousands of one-off ETLs that nobody wants to touch.

DDD gives you the boundaries and ownership model; data mesh applies that thinking to BI and ML.

### A practical playbook for applying DDD

If you want something concrete to follow, here’s a reasonable sequence:

* **1. Map the landscape**  
  * Identify domains and subdomains, mark core vs supporting vs generic.  
  * Draw the current context map with integrations and team ownership.
* **2. Pick one high-value slice**  
  * Choose a flow that is both painful and important.  
  * Run EventStorming or scenario-based workshops around it.
* **3. Shape a better model and boundary**  
  * Define aggregates, value objects, and invariants for this slice.  
  * Decide whether it stays inside the monolith or becomes its own bounded context/service.
* **4. Harden the boundary**  
  * Introduce ACLs or OHS where needed.  
  * Pick event types if you’re integrating asynchronously; keep them tight.
* **5. Refactor incrementally**  
  * Move logic into the new model behind a stable contract.  
  * Use strangler patterns or in-place refactorings, but always in small, testable steps.
* **6. Repeat and scale out**  
  * Apply what you learned to the next slice.  
  * Keep the context map and domain classifications up to date.  
  * Start pushing DDD behaviors (language, boundaries, selective modeling) across teams.

You’ll know it’s working when conversations shift from “which service calls which” to “which domain decision lives where, and who owns it.”

## Summary

Applying Domain-Driven Design in practice is less about perfectly following a textbook and more about a mindset:

* Let business strategy and domain reality drive design, not patterns or frameworks.  
* See and respect the system you have before deciding what to change.  
* Modernize through small, bounded steps: stabilize subdomains, clarify contexts, tighten integrations.  
* Practice “undercover DDD” through language, boundaries, and better slices, even if nobody signs off on a big initiative.  
* Align microservices, event-driven architecture, and data mesh with domain boundaries instead of bolting them on top.

Done this way, DDD becomes a steady force nudging your systems toward clarity and adaptability, instead of another architecture fad that passes through the org without leaving anything useful behind.

## Recommended Reading

#### Web Resources

* None yet.

#### Books

* Khononov, V. (2021). *[Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)*. O’Reilly Media.
  * **Chapter 13: Domain-Driven Design in the Real World**\
    Shows how to introduce DDD into brownfield systems with strategic and tactical modernization, context mapping, and incremental refactoring.  
  * **Chapter 14: Microservices**\
    Explores the relationship between DDD boundaries and microservices, emphasizing deep services, subdomain alignment, and avoiding distributed big balls of mud.  
  * **Chapter 15: Event-Driven Architecture**\
    Connects DDD patterns with event-driven integration, clarifying event types, public vs private events, and how to avoid over-coupled event meshes.  
  * **Chapter 16: Data Mesh**\
    Describes how to extend domain thinking into analytics via domain-aligned data products, ownership, and platform-supported autonomy.
* Millett, S., & Tune, N. (2015). *[Patterns, Principles, and Practices of Domain-Driven Design](https://www.wiley.com/Patterns%2C%2BPrinciples%2C%2Band%2BPractices%2Bof%2BDomain%2BDriven%2BDesign-p-9781118714706)*. Wrox/Wiley.
  * **Chapter 10: Applying the Principles, Practices, and Patterns of DDD**\
    Provides pragmatic guidance on where to use DDD, how to collaborate with domain experts, and how to integrate DDD into existing organizations and codebases.
