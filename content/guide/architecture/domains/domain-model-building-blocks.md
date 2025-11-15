---
weight: 204
title: "Domain Model Building Blocks"
description: "This article explains what domain model building blocks are, how they help you implement simple and complex business logic, and how to choose the right patterns for each part of your domain."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Once you’ve mapped your domain and shaped an initial model, you still have a practical problem: **how do you implement all this in code without creating a ball of mud?**  

Domain model building blocks are the small, repeatable patterns you use to turn domain concepts into concrete, maintainable code: value objects, entities, aggregates, domain services, domain events, factories, repositories, and (sometimes) event sourcing. Used well, they let your model grow in depth without collapsing under its own complexity.  

## Why you need building blocks at all

Not all business logic is equal.

* Some flows are straightforward: validate input, read/update a few records, commit.  
* Others are messy: multiple rules interact, time matters, and the cost of mistakes is high.

For the first category, **simple patterns** like Transaction Script or Active Record are often enough: you write a procedure per operation or a record-centric class and keep going.  

But as soon as you hit **complex, evolving logic**—discount rules, underwriting, compliance, multi-step workflows—those simple patterns start to leak:

* Rules duplicate across services and controllers.  
* It becomes easy to break invariants with “just one more if”.  
* You can’t tell where the real behavior lives.

That’s where a rich domain model and its building blocks earn their keep. They give you **places to put behavior**, clear boundaries for consistency, and a way to express rules in the ubiquitous language instead of ad hoc conditionals spread everywhere.  

## The tactical toolbox at a glance

At the code level, tactical DDD gives you a vocabulary:  

* **Value Objects** – immutable, identity-less descriptors like Money or DateRange.  
* **Entities** – things with identity and lifecycle, like Customer or Shipment.  
* **Aggregates** – consistency boundaries that group entities/value objects around invariants.  
* **Domain Services** – stateless operations representing domain behaviors that don’t belong to a single entity.  
* **Domain Events** – records of important things that happened in the domain.  
* **Factories** – encapsulated creation logic for complex entities/aggregates.  
* **Repositories** – collection-like abstractions for loading and saving aggregates.  
* **Event Sourcing** – a way to model time by storing state as a stream of events instead of snapshots.

You do **not** have to use all of them everywhere. The art is picking just enough of them in the places where complexity demands it.

## Value Objects: modeling precise, reusable concepts

**Value objects** represent descriptive concepts where **identity doesn’t matter**, only the value does: amounts, ranges, coordinates, dimensions, names. Two value objects are equal if all their attributes are equal.  

Characteristics:

* **Identity-less** – they don’t have an ID; they only make sense attached to something else.  
* **Immutable** – operations return new instances instead of mutating in place.  
* **Behavior-rich** – they expose operations and checks, not just getters.  
* **Self-validating** – invalid values are rejected at creation time.

Examples:

* `Money` with `amount` and `currency`, with operations like `add`, `subtract`, `convertTo`.  
* `DateRange` enforcing `start <= end` and supporting `overlaps` or `intersectionWith`.  
* `Temperature` that knows units and conversion rules.

Trade-offs:

* **Upside:** Value objects push complexity out of entities, make rules explicit, and are easy to test.  
* **Downside:** Overdoing them can create too many tiny types and friction in a team that isn’t used to them.

Good rule of thumb: whenever you have a primitive field that carries non-trivial rules (money, dates, quantities), try a value object.

## Entities: modeling identity and lifecycle

**Entities** represent things that **remain the same even as their state changes**: a particular customer, order, or shipment. Two entities can have identical attribute values and still be different because their IDs differ.  

Key ideas:

* Each entity has a **stable identity** – either a natural key from the domain or a generated ID.  
* Entities have a **lifecycle** – they move through states: created → confirmed → fulfilled → archived.  
* Entities should be **behavior-focused**, not just data bags.

Practical tips:

* Assign IDs deliberately (natural keys only if they truly never change, otherwise GUIDs / datastore IDs).  
* Push descriptive, composable details into value objects to keep entities lean.  
* Model invariants and state transitions explicitly (no hidden “magic” through setters).

Trade-offs:

* **Upside:** Entities let you track “this exact thing” across time and use cases.  
* **Downside:** If you cram every rule and detail into entities, they become bloated and hard to test.

Listen to the domain language: if people talk about “this specific X over time”, you probably have an entity.

## Aggregates: enforcing invariants and consistency

If value objects and entities are your bricks, **aggregates** are the walls: they are **clusters of entities/value objects with a single consistency boundary**. All changes inside an aggregate happen in a single transaction, through a single entry point called the **aggregate root**.  

Example:

* An `Order` aggregate might contain an `Order` root entity and a collection of `OrderLine` entities.  
* Invariant: total must equal the sum of lines, and you cannot add lines after the order is shipped.  
* All changes go through methods on `Order` (like `addLine`, `ship`, `applyDiscount`), not by poking at lines from outside.

Design rules:

* Start from **invariants**: what must never be broken, even temporarily? Put all collaborators in the same aggregate.  
* Keep aggregates **small** – only include data that must be strongly consistent together.  
* Reference other aggregates by **ID**, not by direct object references, to avoid huge object graphs.

Trade-offs:

* **Upside:** Clear transactional boundaries; easier concurrency control; local reasoning about rules.  
* **Downside:** Cross-aggregate rules become **eventually consistent**; you need events or processes to coordinate them.

If you routinely need to update several aggregates in one transaction, your boundaries are probably wrong—or your business really does need eventual consistency.

## Domain Services: modeling behaviors, not data

Some behaviors clearly belong to a single entity or value object. Others don’t.

**Domain services** represent **important domain operations that don’t naturally fit on one entity**: pricing algorithms, matchmaking, complex eligibility checks, or cross-aggregate calculations. They are stateless, behavior-only, and named in the ubiquitous language.  

Example:

* `ShippingCostCalculator` that takes a `Shipment`, destination, and carrier options and returns a `Money` value.  
* `CreditDecisionService` that looks at multiple aggregates (customer, account, history) and returns a decision.

Guidelines:

* Use a domain service when you ask “who owns this behavior?” and no entity is a clear, non-awkward answer.  
* Keep services **stateless** and focused on domain logic, not infrastructure plumbing.  
* Don’t dump everything into services, or you’ll create an anemic model. If logic clearly belongs to one entity, put it there.

## Domain Events: making change explicit

Most domains are naturally **eventful**: orders are placed, payments fail, shipments are dispatched, contracts expire.

**Domain events** make those occurrences explicit in your model:

* They are **past-tense messages** (“PaymentFailed”, “OrderShipped”).  
* They carry the minimal data needed for others to react.  
* They are immutable and represent something that **already happened**.  

Uses:

* Decouple aggregates: one aggregate raises an event, another reacts without tight coupling.  
* Drive side effects: send emails, update read models, trigger workflows.  
* Provide a natural foundation for event sourcing if you adopt it later.

Trade-offs:

* **Upside:** Cleaner boundaries, better traceability of what the system actually does.  
* **Downside:** Too many events or handlers can become hard to reason about; you need discipline around naming, scoping, and where handlers live.  

Start small: use domain events for genuinely important happenings, not every minor state change.

## Factories: encapsulating creation

Sometimes creating a valid aggregate is **non-trivial**: you must pull data from services, apply rules, pick one of several implementations, and ensure invariants hold from day one.

**Factories** centralize that construction logic:

* They separate **use from construction**: callers ask for a fully valid object without knowing the construction details.  
* They can live as standalone factory classes or as factory methods on aggregates (`Order.createFor(customer, cart)` etc.).  

Use a factory when:

* Constructors are overloaded and confusing.  
* Creation requires external collaborators (tax service, pricing, identity generator).  
* You need different concrete implementations hidden behind a common abstraction.

Trade-offs:

* **Upside:** Cleaner entities, explicit intent, easier to change construction rules.  
* **Downside:** Overusing factories can create indirection; keep them for genuinely complex creation paths.  

## Repositories: accessing aggregates with intent

**Repositories** are how you **load and save aggregates** without leaking persistence concerns into your domain model. Think of them as type-safe, intention-revealing collections for aggregate roots.  

Characteristics:

* They work with **aggregates**, not random rows: `add(order)`, `findById(orderId)`, `remove(order)`.  
* Methods should be named in the **ubiquitous language** (`findOverdueInvoicesFor(customerId)`), not generic query builders.  
* They hide ORM / SQL / document-store specifics behind a stable domain contract.

Trade-offs:

* **Upside:** Keeps the domain model independent of the data model; clarifies access patterns.  
* **Downside:** For simple CRUD contexts, a full repository layer can be unnecessary ceremony; a DAO or direct data access may be enough.  

Use repositories in **rich domain contexts** where aggregates and invariants matter. For reporting and ad hoc queries, go directly against read models instead of tunneling everything through repositories.

## Event Sourcing: modeling the dimension of time

So far, we’ve assumed you store only the **current state** of aggregates. Sometimes that’s not enough.

**Event sourcing** persists every state change as a **stream of domain events**, and treats that event stream as the source of truth. The aggregate’s current state is just a projection of its event history.  

Typical flow:

1. Load all events for the aggregate’s stream (or from the latest snapshot).  
2. Apply them in order to rebuild current state in memory.  
3. Execute a command, which emits new domain events.  
4. Append those events to the stream with optimistic concurrency checks.

Benefits:

* You can **replay history** to reconstruct past states for debugging, audits, or simulations.  
* You can create new projections later (analytics, specialized read models) from the same event stream.  
* You get an audit trail “for free” in domains where that really matters.  

Costs:

* The mental model is different from CRUD; teams need time to adapt.  
* Versioning event schemas is harder than migrating tables.  
* Infrastructure becomes more complex (event store, projections, snapshotting).  

Reach for event sourcing in **core domains** where history, insight, or regulatory traceability justify the complexity—typically not for simple supporting modules.

## Choosing the right building blocks per context

The biggest mistake with tactical DDD is treating it as all-or-nothing: either **everything** is a rich domain model, or **nothing** is.

A more realistic approach:

* In **core subdomains** with complex, high-stakes logic:  
  * Use entities, value objects, aggregates, domain services, domain events.  
  * Consider event sourcing if time and history are first-class concerns.  
  * Use repositories and factories to protect invariants and keep construction/persistence tame.  

* In **supporting or generic subdomains**:  
  * Use Transaction Script or Active Record for simple flows.  
  * Reach for a couple of building blocks (e.g., a value object for money) where they pay off.  
  * Don’t force aggregates and repositories everywhere.

You’re not trying to “be pure DDD.” You’re trying to **spend modeling effort where it buys you the most predictability and changeability.**

## Summary

Domain model building blocks are how you translate your understanding of the business into code that stays coherent over time.  

Value objects and entities capture the core concepts of your domain. Aggregates enforce invariants and define consistency boundaries. Domain services model behaviors that span objects. Domain events and event sourcing let you represent change and time explicitly. Factories and repositories manage lifecycle and persistence without polluting your model.  

Used selectively and strategically, these patterns give you a common language with your team and a set of levers to keep complexity under control as your system—and your domain—evolves.

## Recommended Reading

#### Books

* Khononov, V. (2021). *Learning Domain-Driven Design*. O’Reilly Media.  
  * **Chapter 5: Implementing Simple Business Logic**\
    Introduces Transaction Script and Active Record as pragmatic patterns for simple flows and explains their limits when complexity grows.  
  * **Chapter 6: Tackling Complex Business Logic**\
    Presents the rich domain model pattern and the core building blocks—value objects, entities, aggregates, and domain services—for managing complex rules.  
  * **Chapter 7: Modeling the Dimension of Time**\
    Shows how event sourcing models time explicitly by treating event streams as the source of truth and building projections from them.

* Millett, S., & Tune, N. (2015). *Patterns, Principles, and Practices of Domain-Driven Design*. Wrox/Wiley.  
  * **Chapter 14: Introducing the Domain Modeling Building Blocks**\
    Provides an overview of entities, value objects, domain services, modules, aggregates, factories, repositories, domain events, and event sourcing as a cohesive toolkit.  
  * **Chapter 15: Value Objects**\
    Deep dive into value object design, including equality, immutability, micro-types, and persistence strategies in SQL and NoSQL.  
  * **Chapter 16: Entities**\
    Explains identity, lifecycle, invariants, and how to keep entities lean by pushing behavior into value objects and specifications.  
  * **Chapter 17: Domain Services**\
    Clarifies when a behavior belongs in a domain service and how to avoid an anemic domain model.  
  * **Chapter 18: Domain Events**\
    Shows how to model important domain occurrences, structure handlers, and separate internal from external events.  
  * **Chapter 19: Aggregates**\
    Covers designing aggregate boundaries around invariants, managing consistency, and dealing with concurrency and scalability.  
  * **Chapter 20: Factories**\
    Describes factories as a way to encapsulate complex creation and reconstitution logic while keeping entities/aggregates focused on behavior.  
  * **Chapter 21: Repositories**\
    Defines repositories as collection-like access to aggregates and discusses proper responsibilities and anti-patterns.  
  * **Chapter 22: Event Sourcing**\
    Explores event-sourced aggregates, event stores, projections, and the trade-offs of adopting event sourcing in real systems.
