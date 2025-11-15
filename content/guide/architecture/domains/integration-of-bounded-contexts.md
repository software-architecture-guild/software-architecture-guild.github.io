---
weight: 206
title: "Integration of Bounded Contexts"
description: "This article explains how bounded contexts integrate, which collaboration patterns and communication styles keep models clean, and how to choose the right strategy based on team relationships and technical constraints."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Splitting your system into bounded contexts fixes only half the problem. Those contexts still have to work together as one product. Customers don’t care that “Billing” and “Onboarding” are separate models; they care that a payment goes through and access is granted.  

Integration of bounded contexts is where domain design meets reality: contracts, upstream/downstream power, release schedules, and all the messy human factors that sit behind “just call their API.”  

## Why integrations are inevitable

Bounded contexts let models and teams evolve independently. That’s the point. But the system as a whole still has to:  

* Share key concepts (like customer, account, order).  
* Coordinate workflows that span multiple contexts.  
* Keep enough consistency that the business doesn’t fall apart.  

Every seam between contexts is a **contract**. Because each context has its own ubiquitous language, those contracts can’t be left implicit. You have to decide:  

* Which language appears at the boundary.  
* Who owns that language.  
* How changes are negotiated and rolled out.  

If you ignore these questions, you don’t “avoid politics”; you just let them hit you later as breaking changes, integration bugs, and slow delivery.

## Integration is about collaboration, not just tech

A common failure mode is picking integration mechanics (REST vs events vs gRPC) without first understanding the **relationship between teams**.  

Key insight:  

> The right integration pattern depends more on **how teams collaborate** than on your choice of protocol.  

Two axes matter a lot:

* **Collaboration strength** — Do teams talk frequently? Share goals? Plan together?  
* **Power balance** — Is one side clearly upstream (sets the contract) and the other downstream (follows)?  

DDD’s integration patterns are basically codified answers to “given this relationship, how should we integrate?”

## Context maps: making relationships visible

A **context map** is a diagram that shows:

* All relevant bounded contexts.  
* The integration patterns between them (ACL, Conformist, etc.).  
* Upstream/downstream directions and ownership.  

You use it as a reality map, not a fantasy architecture:

* Draw how things **actually** work today.  
* Annotate which patterns you’re using.  
* Mark the **core domain** and the risky seams around it.  

Benefits:

* You see where you rely on fragile conformist relationships to critical upstreams.  
* You spot where everyone is building their own ACL against the same legacy system.  
* You have a concrete artifact to discuss when org or architecture changes are on the table.  

The map doesn’t solve anything by itself, but it gives you a shared picture of where trouble is likely to come from.

## Cooperation patterns: Partnership and Shared Kernel

Sometimes teams have shared goals, strong communication, and short feedback loops. In that case, you can treat integration more like collaboration than defense.

### Partnership

**Partnership** is a two-way collaboration pattern:

* Teams coordinate changes and releases together.  
* Nobody unilaterally imposes their model; they negotiate.  
* Continuous integration across contexts keeps feedback loops short.  

Use it when:

* Teams share a product-level objective.  
* They can afford regular joint planning and design sessions.  
* Latency in collaboration is low (time zones and politics don’t block).

Risk: if communication degrades, you silently slide into a customer–supplier relationship without adjusting your technical patterns.

### Shared Kernel

A **Shared Kernel** means two contexts share a small, identical slice of the model:

* The shared part might be an authorization model, core identifiers, or a tiny set of value objects.  
* It’s implemented as a shared library, a mono-repo module, or another “single source” artifact.  

Rules of survival:

* Keep the kernel **tiny**. The more you share, the more fragile everything becomes.  
* Run integration tests for every kernel change against all dependent contexts.  
* Use it when coordination cost is **lower** than duplication, and usually only between teams that already behave like a partnership.

Shared kernels are often temporary: good for navigating legacy modernization or when one team owns multiple contexts. Long term, you usually want to shrink or remove them.

## Customer–Supplier patterns: who drives the contract?

Most cross-team relationships are not equal. One context is **upstream** (supplier), the other **downstream** (customer). Upstream sets the contract and release rhythm; downstream feels the impact.

DDD offers three main patterns here: Conformist, Anti-corruption Layer, and Open-Host Service.  

### Conformist

In a **Conformist** relationship, downstream simply adopts upstream’s model “as is”:

* You deserialize their JSON, map it to very similar objects, and live with their names and quirks.  
* You adjust when they change; your model bends around theirs.  

This is fine when:

* Upstream is an external provider you can’t influence.  
* The upstream model is reasonably clean and aligned with your needs.  
* The area is non-core for you, so some distortion is acceptable.

But if conformism invades your **core domain**, your own model slowly becomes a mirror of somebody else’s problems.

### Anti-corruption Layer (ACL)

An **Anti-corruption Layer** is how a downstream context says “no” politely:

* You wrap the upstream API in a translation layer.  
* The ACL converts upstream’s model into your own concepts and language.  
* Your domain model stays clean; only the translator knows about upstream weirdness.  

Use an ACL when:

* Your context contains a **core subdomain**.  
* The upstream model is messy, legacy, or evolving independently.  
* You need to protect your ubiquitous language from being polluted.

Trade-off: you pay extra implementation and maintenance cost in the translator. But you avoid slow, subtle damage to your core model.

### Open-Host Service (OHS) and Published Language

An **Open-Host Service** is the “reverse ACL” from the supplier’s side:

* Upstream exposes a **published language** optimized for integration, not for its internal model.  
* It can evolve its internals freely, as long as the published contract remains stable.  
* It may support multiple versions in parallel for safe consumer migrations.  

You choose OHS when:

* Many consumers need the same upstream capability.  
* You want to centralize translation instead of making every consumer build their own ACL.  
* You have enough upstream ownership to design a good public contract.

OHS plus published language is the cleanest way to scale integrations around a central service.

## Separate Ways: when the best integration is no integration

Sometimes the cost of integrating two contexts is higher than the value they’d get:

* Teams are misaligned or blocked by politics.  
* The functionality is trivial or generic enough to duplicate.  
* Automating the connection would take more effort than manual steps.  

**Separate Ways** is the pattern for explicitly not integrating:

* You might link UIs via deep links instead of sharing data.  
* You might accept duplicate implementations of a generic function in two contexts.  
* You keep the contexts independent and revisit later if the trade-off changes.

Rule: this is almost never acceptable in your **core domain**. But for peripheral or generic areas, it can be the pragmatic move.

## Model translation: how contexts actually talk

Once you know which pattern fits the relationship, you still need the low-level mechanics of translating between models.

There are two broad shapes: **stateless** and **stateful** translation.  

### Stateless translation

Stateless translators map each request or message individually:

* **Synchronous**: an ACL or OHS maps incoming/outgoing DTOs on the fly.  
* **Asynchronous**: a message proxy subscribes to upstream events, transforms them, and republishes filtered, cleaned events.

You can embed this in the codebase or push it out to an API gateway / message gateway:

* Gateways help with versioning, routing, and security.  
* But they can’t handle translations that need history or multi-source merges.

Stateless translation is the default starting point: simple, easy to reason about, and enough for many integrations.

### Stateful translation

Sometimes translation needs to **remember things**:

* Combine a series of fine-grained upstream events into a single consolidated downstream event.  
* Aggregate data from multiple upstreams before emitting something downstream can use.  

Here you need a translator with its own **persistent store**:

* It subscribes to events or calls APIs.  
* It stores intermediate state.  
* It emits its own events or exposes its own API to consumers.  

Think of it as a mini bounded context dedicated to integration logic—not something you can cram into a gateway configuration file.

## Making messaging reliable: Outbox

As soon as you integrate via events, you hit the **dual-write problem**:

> How do I update my database and publish an event without losing one or the other?

The **Outbox** pattern solves this:

1. When you change an aggregate, you also store the new domain events in an outbox table or field **in the same transaction**.  
2. A relay process reads unpublished events from the outbox, publishes them to the message bus, and marks them as sent.  
3. Consumers are designed to handle duplicate events (at-least-once delivery).  

Result:

* Either both state and events are committed, or neither is.  
* If publishing fails, you retry from the outbox instead of losing events.  

Without an outbox, every event-driven integration is sitting on a subtle race condition.

## Cross-context workflows: Saga and Process Manager

Some business flows span multiple bounded contexts and aggregates:

* Approving a loan that touches risk, contracts, and disbursement.  
* Onboarding a customer across identity verification, billing, and provisioning.

You can’t make this a single distributed transaction, so you need process coordination on top of local transactions. Two patterns cover most needs: **Saga** and **Process Manager**.  

### Saga: event-driven chains

A **Saga** coordinates a linear sequence of steps:

* It listens for events.  
* For each event, it triggers the next command in the process.  
* It may store minimal state (like correlation IDs and current step).  

Use a saga when:

* The process is mostly linear (“do A, then B, then C”).  
* Each step has clear compensating actions if something fails.  
* The orchestration logic doesn’t need a lot of branching.

Pair sagas with an outbox so commands and events are reliably dispatched.

### Process Manager: when the flow branches

When the workflow has complex branching or decision logic (“if user is enterprise do X, else Y”), a **Process Manager** fits better:

* It keeps explicit state about the process.  
* It decides what to do next based on a richer internal model.  
* It may coordinate multiple sagas or command chains.

Rule of thumb: if your saga starts sprouting `if` and `switch` logic, you probably need a process manager instead.

## Integration patterns evolve with the org

These patterns are not permanent choices. They evolve as team structure, trust, and ownership change.  

Typical shifts:

* A **Partnership** can degrade into **Customer–Supplier** when teams are split across time zones or org lines.  
* A **Customer–Supplier** relation can drift into **Conformist** when downstream stops being involved in upstream planning.  
* In rough environments, teams retreat to **Separate Ways** because collaboration cost is too high.

The context map helps you catch these shifts early:

* If a partnership now behaves like customer–supplier, you probably need ACLs or OHS instead of informal agreements.  
* If everyone builds ACLs against the same upstream, maybe that upstream should expose an Open-Host Service.

You design integration once, but you revisit and adjust as reality changes.

## Summary

Integrating bounded contexts is not just “wire up some APIs.” It is a strategic design problem that combines models, contracts, team relationships, and communication patterns.  

You start by making relationships visible with a context map, then choose patterns that match collaboration and power dynamics: partnership and shared kernel for close cooperation; conformist, ACL, and OHS for upstream/downstream relationships; separate ways when integration simply isn’t worth it. You implement translation via stateless or stateful proxies, make messaging reliable with the outbox pattern, and coordinate cross-context workflows with sagas or process managers.  

Done deliberately, integration lets each bounded context keep a clean, local model while still contributing to a coherent whole.

## Recommended Reading

#### Web Resources

* None yet.

#### Books

* Khononov, V. (2021). *Learning Domain-Driven Design*. O’Reilly Media.  
  * **Chapter 4: Integrating Bounded Contexts**\
    Classifies integration patterns (Partnership, Shared Kernel, Customer–Supplier, ACL, OHS, Separate Ways) and shows how to choose them based on team collaboration and power balance.  
  * **Chapter 9: Communication Patterns**\
    Describes model translation, stateless/stateful proxies, outbox, sagas, and process managers as a toolkit for reliable communication across bounded contexts.

* Millett, S., & Tune, N. (2015). *Patterns, Principles, and Practices of Domain-Driven Design*. Wrox/Wiley.  
  * **Chapter 7: Context Mapping (pp. 91–104)**\
    Introduces context maps as reality diagrams that capture technical and organizational relationships, helping you reason about integration risk and strategy.  
  * **Chapter 11: Introduction to Bounded Context Integration**\
    Summarizes core integration patterns (Shared Kernel, Customer–Supplier, Conformist, Partnership, Separate Ways, ACL, OHS/Published Language) and emphasizes the role of upstream/downstream influence in choosing between them.
