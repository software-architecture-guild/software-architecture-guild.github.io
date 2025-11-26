---
weight: 257
title: "What is a Service?"
description: "This article explains what a Service is, clarifying how it differs from a component and how service granularity, modularity, and trade-offs shape good service boundaries."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

A service is a slice of your system you can build, deploy, and operate as a unit. It’s the level where code, runtime behavior, infrastructure, and team ownership all meet. Define services well, and your system is easier to change, scale, and debug. Define them badly, and you either end up with a remote monolith or a distributed big ball of mud.

## Why Services Matter

Services are how your architecture shows up in production. Components give you *logical* structure; services give you *operational* structure: what runs where, who owns it, and how it fails. If you blur those ideas together, you start making every decision in terms of “more or fewer services” and skip the more important questions:

* Which responsibilities belong together?  
* Who owns which behavior and data?  
* What do we actually want to deploy and operate independently?

A clear idea of “service” lets you separate three decisions:

* How you organize logic (components).  
* How you package and deploy that logic (services).  
* How fine-grained those services should be (service granularity).

Once those are distinct, you can tune them independently instead of trying to fix design problems purely by splitting or merging services.

## Definition of a Service?

A service is a runtime and deployment boundary wrapped around a coherent set of behaviors and data, with a team accountable for keeping it healthy.

More concretely, a service:

* Runs as one or more processes that your platform treats as a single thing: one service in service discovery, one set of dashboards, one SLO.  
* Has its own build and deployment pipeline, configuration, and scaling rules.  
* Owns a set of business capabilities and the data required to support them.  
* Exposes a clear external surface: APIs, messages, and events that other parts of the system rely on.  
* Has a team responsible for its correctness, performance, and availability.

If you wouldn’t:

* deploy it on its own,  
* page a team specifically for it, or  
* talk about its SLOs and failure modes,

then you probably don’t have a real service yet — you just have some code in a process.

### The Service Surface: Behavior, Data, Operations

A service is defined by three intertwined contracts:

* **Behavioral contract** – the operations it offers (“register customer”, “assign ticket”, “charge payment”), their invariants, and error conditions.  
* **Data contract** – which data it *owns*, which data it *exposes* (APIs, events, read models), and which data it merely *consumes*.  
* **Operational contract** – what clients can expect in terms of latency, throughput, availability, rate limits, and failure behavior.

A “service” that only has URL paths and DTOs, but no clear behavioral, data, or operational contract, is just a container for code. The boundary is only real when those three contracts are explicit.

## Services and Components

To use services well, you have to understand how they differ from — and depend on — components.

### Components vs Services

A **component** is a **logical building block** inside your architecture:

* It’s a unit of responsibility and knowledge.  
* It encapsulates behavior and data behind an internal contract.  
* It lives in your design and code.  
* It doesn’t imply its own process or deployment pipeline.

A **service** is an **operational building block**:

* It’s a unit of behavior, deployment, and on-call responsibility.  
* It bundles one or more components into a single runtime unit.  
* It lives both in your design and in your infrastructure.  
* It has a distinct operational life: it can be up, down, rolling out, degraded.

You can have:

* A **modular monolith** – many components, one service.  
* A system with **a few coarse-grained services** – each hosting several components.  
* A system with **lots of fine-grained services** – each hosting one or a few components.

Component decisions shape *how you carve up logic*. Service decisions shape *how you ship and run that logic*.

### Components Inside Services

In a healthy design:

* You define components first: responsibilities, data ownership, contracts.  
* You then decide which components sit together inside one service *for now*.  
* If you later pull a component into its own service, you’re changing its deployment story, not its responsibility.

The flow is:

1. **What is Component?** → what a component is.  
2. **Defining components** → how to slice the system into components and domains.  
3. **What is a Service?** (this article) → how to bundle those components into deployable services and choose their size.

With that foundation, we can talk about service granularity.

## Service Granularity and Modularity

Service granularity is about how big each service should be. It builds on modularity but isn’t the same thing.

### Modularity vs Granularity

* **Modularity** asks: how many pieces do we have and how clean are the boundaries?  
* **Service granularity** asks: how much behavior and data lives in each service we deploy?

You can mix them in many ways:

* Highly modular, one service (modular monolith).  
* Highly modular, several deliberate services.  
* Many services with messy boundaries (distributed big ball of mud).

Granularity is not “as small as possible.” It’s “small enough for what we need,” balancing behavior, data, teams, and operations.

### Services as Units of Granularity

A good working definition:

> A service is the smallest thing you’re willing to build, deploy, operate, and break independently.

If you always deploy two services together, debug them together, and treat any failure in one as a failure of the other, you haven’t drawn a meaningful boundary — you’ve just created more moving parts.

## Forces That Push Services Apart: Granularity Disintegrators

Granularity disintegrators are forces that say, “this might be too much for one service; consider splitting.”

### Service Scope and Function

If a service’s mission statement is vague (“all customer things”, “misc billing”), you likely lumped multiple capabilities together. When responsibilities have little to do with each other, splitting along clearer functional lines usually helps:

* “Manage subscription lifecycle” vs “Generate invoices” vs “Collect payments.”

### Code Volatility

When part of a service changes constantly and another part barely moves:

* Every release for the “hot” area drags “cold” areas through testing and deployment.  
* Bugs in fast-moving code can affect stable behavior that had no reason to be touched.

Splitting allows hot code to evolve without constantly disturbing cold code, if you’re willing to handle the extra operational complexity.

### Scalability and Throughput

When one part sees much more traffic than the others:

* You end up scaling the entire service for that hotspot.  
* You pay infrastructure cost and complexity even for rarely used parts.

Splitting lets you scale hot paths separately. If traffic patterns are similar, this force is weaker and shared scaling can be simpler.

### Fault Tolerance

If you don’t want a failure in one area to take another down, that’s a reason to separate:

* Recommendations shouldn’t bring checkout down.  
* Marketing notifications shouldn’t block password reset messages.

But if two behaviors are always coupled in practice — they can’t make sense without each other — splitting them might add more failure modes than it removes.

### Security

When some responsibilities touch highly sensitive data or operations (PII, payments, admin actions), splitting can:

* Reduce the amount of code that can see that data.  
* Focus hardening and auditing on a smaller surface.

The trade-off is that you may lose simple local transactions and need to redesign workflows that mix sensitive and non-sensitive steps.

### Extensibility

If you know you’ll keep adding new variants in one area (payment methods, shipping providers, notification channels), you might:

* Keep them in one pluggable service, or  
* Split them into separate services when they truly diverge in behavior, cadence, or risk.

Doing this “for future flexibility” with no real signals usually leads to many half-used services you have to maintain forever.

## Forces That Keep Services Together: Granularity Integrators

Granularity integrators argue for keeping responsibilities in the same service. They stop you from splitting things just to be “more micro.”

### Database Transactions

If a use case needs strong all-or-nothing behavior (either everything happens or nothing does), keeping the relevant work in one service simplifies things:

* Local transactions are straightforward and robust.  
* Cross-service sagas and compensations are complex and failure-prone.

Breaking a simple transaction across services because “microservices” is a classic way to increase risk.

### Workflow and Choreography

If two steps:

* Always happen together,  
* In a fixed order,  
* And don’t make sense independently,

splitting them is often counterproductive. You add latency, retries, and coordination for little gain.

### Shared Code

If you’d have to duplicate complex logic or push it into a massive shared library to support a split, that’s a warning sign:

* Duplicated logic drifts.  
* Giant shared libraries quietly recouple services at version level.

Sometimes the simplest answer is: keep these responsibilities in one service and keep the shared logic internal, but structured as components.

### Data Relationships

Strong data relationships — invariants that span entities, aggregates that must stay consistent — often want to live in one service:

* Within a single service and database, constraints and transactions help.  
* Across services, you now need messaging, compensations, and reconciliation.

If the business can’t tolerate drift between those entities, that’s a strong integrator.

## Balancing Granularity Decisions

Real life is never “always split” or “always merge.” You weigh disintegrators against integrators.

### Combining Forces Instead of Following a Rule

Typical pattern:

* Scope, volatility, and scalability say “split.”  
* Transactions and data relationships say “keep together.”  
* Security pulls toward “split”; workflow simplicity pulls toward “keep.”

The useful move is to name each force explicitly and then decide which ones matter most for *this* capability, at *this* point in time.

### Business-Driven Trade-offs

Service size is not a purity contest; it’s a business trade-off:

* Is faster, independent deployment more important than having a single, simple transaction?  
* Is isolating sensitive data worth extra workflow and operational complexity?  
* Do we care more about cost, resilience, or speed of change here?

Once you express decisions in those terms, you stop arguing about “monolith vs microservices” and start aligning architecture with actual priorities.

## Summary

A service is a runtime and deployment boundary around a coherent set of behaviors and data, owned by a team and backed by clear functional, data, and operational contracts. Components give you the logical building blocks; services bundle those blocks into units you can build, deploy, operate, and break independently.

Service granularity sits on top of that: it’s the art of choosing how big each service should be. You use disintegrators (scope, volatility, scalability, fault tolerance, security, extensibility) to spot where a service is doing too much, and integrators (transactions, workflows, shared code, data relationships) to spot where splitting would make things worse. Treat those as explicit trade-offs, not ideology, and you’ll end up with services that are understandable, resilient, and actually worth the operational cost.

## Recommended Reading

#### Books

* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O'Reilly Media.  
  * **Chapter 7: Service Granularity**\
    Introduces disintegrators and integrators as a structured way to reason about service size and demonstrates their use through concrete scenarios and ADR-backed decisions.
