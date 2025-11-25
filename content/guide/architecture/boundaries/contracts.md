---
weight: 262
title: "Contracts"
description: "This article explains what Contracts are, how their strictness shapes coupling between components and services, and how to design and evolve them safely in distributed systems."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Contracts are how your architecture is felt at the seams. A component boundary, a service boundary, a data product—none of them are real until there is a contract that says what flows across and how much each side can rely on. Get contracts wrong, and even well-chosen boundaries turn into tight knots or brittle integrations.

## Why Contracts Matter

Contracts turn abstract structure into day-to-day reality for teams. Every call, event, and data feed is a contract in disguise: an agreement about shape, meaning, and timing. If those agreements are too strict, you slow every change; if they are too loose, you drown in ambiguity and subtle breakages. Treating contracts as a design tool, not just an API detail, is what lets you tune coupling instead of accepting it by accident.

### Contracts as Behavioral Agreements

At the simplest level, a contract says: “If you send me this, I will do that.”

That “this” includes data shape, valid ranges, and required fields. The “that” includes behavior, side effects, and error conditions. For a REST endpoint it’s the path, method, request and response schemas, and status codes; for an event it’s the topic, payload shape, and delivery guarantees. A good contract makes both sides confident about what will happen without needing to know how the other side is implemented.

If the contract is vague—“just send JSON, we’ll figure it out”—you push complexity into every caller and every deployment. If it is overly detailed—“this exact set of fields in this exact order, forever”—you bolt the two parties together so tightly that any change becomes a negotiation.

### Contracts as the Primary Coupling Mechanism

Most of the coupling in a distributed system is contract coupling.

* Change one field name, and a dozen consumers might break.  
* Tighten a validation rule, and workflows that used to succeed start failing.  
* Add a new required header, and some clients quietly stop talking to you.

The stricter and more detailed your contracts, the more those changes ripple. The looser and more permissive your contracts, the more drift and misinterpretation you have to guard against with tests and monitoring. Thinking of contract design as “coupling on purpose” is what keeps you honest about these trade-offs.

## The Strict–Loose Contract Spectrum

Contract strictness is one of the main knobs you can turn to manage coupling. Instead of arguing “RPC vs REST vs events” in the abstract, it helps to see all of them as points on a spectrum from strict to loose, each with benefits and costs.

### Strict Contracts

Strict contracts define a narrow, strongly typed interface: every field, enum, and error is precisely specified.

Typical examples:

* gRPC or strongly typed RPC interfaces.  
* Rigid JSON schemas that must validate exactly.  
* Binary protocols with fixed layouts.

The upsides:

* Great for **tooling**: code generation, auto-complete, compile-time checks.  
* Safer **refactors** inside the provider: if it compiles and tests pass against the contract, you know you didn’t accidentally change the surface.  
* Strong guarantees for consumers: they know exactly what to send and what they’ll get back.

The downsides:

* Harder to **evolve**: adding, renaming, or removing fields requires versioning and careful rollout.  
* Tight **release coupling**: in extreme cases, both sides must roll in sync when the contract changes.  
* Risk of designing for present implementation details instead of stable business concepts.

Strict contracts shine inside a well-coordinated team or for core internal services where correctness and tooling matter more than maximal flexibility.

### Loose Contracts

Loose contracts leave room for extra fields, optional elements, and interpretation.

Typical examples:

* JSON or name–value payloads with tolerant readers.  
* Message formats that allow unknown fields to be ignored.  
* Text-based protocols where rules are documented but not enforced by a schema engine.

The upsides:

* Easier to **evolve** without breaking consumers: you can often add fields or relax rules without coordination.  
* More robust to **partial understanding**: different consumers can use different subsets of data.  
* Better fit for **open-ended clients** like mobile apps and third-party integrations that can’t be updated in lockstep.

The downsides:

* Less help from **tooling**: more runtime errors, fewer compile-time checks.  
* Greater risk of **ambiguity**: consumers may interpret the same data differently.  
* It’s easier to accidentally rely on fields that were meant to be optional.

Loose contracts work best across organizational boundaries, between teams with independent release cycles, or where experimentation and gradual rollout are more important than strict guarantees.

### Evolving Contracts Over Time

Most real contracts move along the spectrum as systems and relationships mature.

Useful patterns:

* Start **looser** when you’re learning; tighten rules as you discover invariants that really matter.  
* Add fields as **optional** first, then make them required only when you’re sure every important consumer is ready.  
* Use **deprecation windows**: support old and new behaviors during a transition period, then remove the old path once metrics say it’s safe.

Contract evolution is not free. The more consumers you have and the stricter the contract, the more valuable it is to treat evolution as a process with versioning, clear timelines, and metrics instead of “we’ll just publish and see who screams.”

## Kinds of Contracts in a Distributed System

Different boundaries call for different types of contracts. It helps to be explicit about what you’re standardizing: code shapes, message schemas, or operational guarantees.

### Code and Interface Contracts

Code-level contracts are about method signatures, interfaces, and type systems.

Examples:

* A well-defined interface in a component boundary.  
* A shared client library for an internal service.  
* RPC definitions that generate client and server stubs.

These contracts are excellent at catching mismatches early:

* If a field type changes, compilation fails.  
* If a method is removed, callers won’t build until they adjust.

The trade-off is that you’re coupling **implementation technology** and deployment:

* Consumers must use compatible languages or runtimes, or rely on generated glue.  
* Updating the shared client can become its own coordination problem.

Use code contracts where you control both sides and value developer ergonomics and safety more than maximum decoupling.

### Message and Schema Contracts

Message-level contracts describe the structure and semantics of data on the wire: JSON schemas, Avro/Protobuf messages, or event payloads.

They:

* Decouple **transport** (HTTP, messaging, files) from the meaning of payloads.  
* Support polyglot consumers: anyone who can parse the format and follow the schema can participate.  
* Allow looser evolution strategies, like optional fields and additive changes.

The main risks are:

* Silent breakages when consumers ignore validation and assume shapes.  
* Overloaded semantics when one schema tries to serve too many different use cases.  
* Schema sprawl if every team invents their own nearly identical message.

Good schema contracts are **small, focused, and named by purpose**, not by whatever internal class they mirror today.

### Operational Contracts

Operational contracts describe **how** a service behaves under load and failure, not just what its inputs and outputs mean.

They include:

* Latency and availability expectations.  
* Rate limits and quotas.  
* Error budgets and retry policies.

These contracts matter because:

* A consumer might technically use your API correctly, but place it on a path that requires lower latency than you can deliver.  
* Aggressive retries can turn a small incident into an outage.  
* Changes in backend performance characteristics can break clients even if schemas stay the same.

Operational contracts complement code and schema contracts. Together, they define not just “what” and “how” at the logical level, but “how well” and “how reliably” at runtime.

## Stamp Coupling and Over-Sharing

Even with a clean schema, you can create unnecessary coupling by the **shape and size** of the data you send. Stamp coupling is the name for that problem.

### What is Stamp Coupling?

Stamp coupling happens when a consumer receives a whole structure and depends on its internal layout, rather than on the specific data it truly needs.

Typical examples:

* Returning an entire “Customer” object when the consumer only needs an ID and display name.  
* Emitting a full database row as an event payload.  
* Passing on DTOs that mirror internal classes instead of purpose-built messages.

Why it’s a problem:

* As the provider evolves its internal model, consumers that rely on incidental fields or nested structures break.  
* Different consumers latch onto different parts of the stamp, making it very hard to refactor safely.  
* You end up carrying and versioning far more fields than are actually meaningful for each interaction.

Stamp coupling ties contracts to **current implementation** rather than to stable concepts. It’s one of the easiest ways to inject accidental coupling into a design that looked clean on the diagram.

### Designing Smaller, Focused Contracts

A practical antidote to stamp coupling is to design contracts around **use cases**, not around internal entity models.

Patterns that help:

* Create **view-specific payloads**: for example, “TicketSummary” for a list view vs “TicketDetails” for the full page, instead of always returning “Ticket” with everything.  
* Use **projection endpoints or events** that expose exactly the data consumers need for their flows.  
* Avoid leaking **internal IDs or flags** that have no clear meaning outside the provider service.

The trade-off:

* More contract types to maintain and document.  
* Some duplication between payloads that share a subset of fields.

The gain:

* Stronger freedom to change internal models.  
* Clearer, more stable contracts aligned with actual behavior and UI needs.  
* Easier reasoning about who uses what data, which pays off in security and privacy reviews.

## Aligning Contracts with Consumers

Contracts are not just about what the provider wants to expose; they are also about what consumers need and can realistically honor. If you design purely from the provider’s point of view, you get brittle systems and angry clients.

### Consumer-Driven Contracts

A consumer-driven contract (CDC) approach flips the perspective:

* Each consumer publishes expectations about how it uses a provider’s API or messages.  
* Those expectations become executable tests or checks that run against the provider.  
* The provider knows exactly which changes will break which consumers.

Benefits:

* Breakages are caught **early**, in CI/CD, before deployment.  
* Providers get **visibility** into real usage, not just documented possibilities.  
* It encourages **negotiation**: consumers can adapt, and providers can stage changes when they see who will be affected.

Costs:

* You now have a system and process for managing contract tests, not just schemas.  
* Consumers must invest in articulating their expectations, not just writing ad-hoc integration code.  
* It works best when there is at least some shared tooling and culture around contracts.

Consumer-driven contracts don’t remove the need for good provider-side design. They give you a safety net and a communication channel, not a free pass to make arbitrary changes.

### Fitness Functions and Contract Health

Contracts age. Fields become obsolete, interpretations drift, timeouts that were fine at launch become too slow. Fitness functions give you a way to continuously test whether contracts still meet their intended purpose.

Examples of contract fitness functions:

* Schema linting: “No payload may include internal database keys or PII classified as X.”  
* Backward compatibility checks: “New versions must accept previous payload forms for at least N releases.”  
* Performance checks: “The 95th percentile latency for this endpoint must stay under X ms for this query shape.”  
* Usage checks: “Fields marked deprecated must not be used by more than Y% of traffic.”

These checks can run in CI/CD, in staging, or as production monitors. The key idea is that **contract quality is measurable**, and you can degrade it if you don’t watch it. Fitness functions turn those quality expectations into something you can automate rather than only discuss.

## Choosing Contracts for Different Relationships

Not every boundary deserves the same contract style. You can, and should, pick different points on the strict–loose spectrum for different relationships in your system.

### Inside a Team’s Service Boundary

Within a single service owned by one team:

* You control both sides of most contracts.  
* You can change code, schema, and deployment together.  
* Latency and correctness usually matter a lot.

Here, **stricter contracts** often pay off:

* Strong types and interfaces between components.  
* Clear schema validation for internal modules.  
* Aggressive refactors supported by compile-time checks and fast tests.

The risk of over-strictness is low because coordination is simple. The main thing to watch for is over-generalized internal contracts that later leak outside the service.

### Between Services in the Same Organization

Between services owned by different teams in the same organization:

* Release cycles are independent but somewhat coordinated.  
* You care about both autonomy and internal stability.  
* There is at least some shared tooling and governance.

Here, a **balanced contract** works best:

* Schema-driven APIs or messages with well-documented evolution rules.  
* A mix of strictness (for critical invariants) and looseness (for optional or experimental fields).  
* Consumer-driven contracts or integration tests for key flows.

You want contracts that are **predictable but evolvable**: strong enough that teams can rely on them, loose enough that nobody has to run a full company-wide rollout for every field change.

### Public APIs, Mobile, and Partners

For public APIs, mobile clients, and external partners:

* You have very limited control over release timing.  
* Old versions may stick around for years.  
* Legal, commercial, or compliance constraints often apply.

Here, contracts must be:

* **Stable**: versioning, deprecation, and sunset policies are crucial.  
* **Defensive**: tolerant readers, careful validation, and strong error messages help cope with unpredictable usage.  
* **Well-documented**: you can’t rely on shared tribal knowledge.

These edges push you toward **looser contracts with strict core guarantees**:

* The core behavior and fields are stable and versioned carefully.  
* The periphery allows room for extra fields, experimentation, and gradual change.  
* Contract fitness includes not just technical checks but also legal and support considerations.

## Summary

Contracts are the real edges of your architecture: they define how components, services, and data products see and rely on each other. By treating contracts as a spectrum from strict to loose, you can tune coupling instead of inheriting it by accident. You can avoid stamp coupling by designing payloads around use cases instead of internal entities, and you can align contracts with consumers through consumer-driven tests and fitness functions.

Different relationships call for different contract styles: strict and type-heavy inside a team, balanced but evolvable between internal services, and stable yet tolerant for public and partner APIs. If you design and evolve contracts with these trade-offs in mind, your boundaries stay flexible, your integrations stay robust, and your system can change without every seam tearing under the load.

## Recommended Reading

#### Books
* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O’Reilly.  
  * **Chapter 13: Contracts**\
    Explores contract strictness as a coupling lever, discusses stamp coupling and contract evolution, and shows how consumer-driven contracts and fitness functions help keep distributed systems changeable without constant breakage.
