---
weight: 205
title: "Bounded Contexts"
description: "This article explains what bounded contexts are, how they help you manage domain complexity, and how patterns like CQRS and clear command/query boundaries keep each context’s model consistent and evolvable."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

You can’t fix a messy domain by stuffing everything into one “unified” model. At some point, different parts of the business need the same words to mean different things. If you force them into one schema or one big service, the model bloats, and change becomes dangerous.  

Bounded contexts are how Domain-Driven Design accepts that reality and uses it instead of fighting it.

## Why one model for the whole company doesn’t work

In real organizations, the same term often means different things:

* “Lead” in Marketing might be a record from an ad click that lives for minutes.  
* “Lead” in Sales might be a relationship that lasts weeks, with stages, owners, and forecasts.  

If you try to build a single “Lead” model that fits both:

* Either Marketing’s model gets over-engineered.  
* Or Sales gets an under-powered toy that can’t express their lifecycle.  
* Or you end up with a god-object that tries to please everyone and satisfies no one.

The same happens with “Customer,” “Order,” “Policy,” “Account,” and any other word dragged across departments.

The lesson: the problem is not the word. The problem is assuming it must have **one** model and **one** meaning everywhere.

## What is a bounded context?

A **bounded context** is an explicit boundary inside which:

* A particular domain model is valid.  
* The ubiquitous language has precise, agreed meanings.  
* Code, tests, and data structures are all aligned to that model.  

Outside that boundary, the same terms are allowed to mean something else.

Roughly:

> *Domain = problem space.*  
> *Bounded context = solution space for one model.*

Inside the context:

* “Lead” might mean the short-lived Marketing object.  
* In a separate Sales context, “Lead” is a long-running opportunity lifecycle.  
* Both are correct — inside their own fences.

You don’t chase one global glossary. You deliberately **split one vague language into several precise ones**, each scoped to a context.  

## Language is always context-bound

A ubiquitous language is not “everyone in the company uses the same terms.” That’s a trap.  

A more realistic rule:

* Each bounded context has **its own** ubiquitous language.  
* Terms are ubiquitous *within* the context, not across the entire org.  

Practically, that means:

* Glossaries and diagrams must always name their context: “Sales UL,” “Billing UL,” not “company glossary.”  
* When you say “Customer” in a conversation, you should be able to answer “Customer in which context?”  
* Renames happen **per context**, not globally.

Once you accept that language is local, you stop fighting over “the true definition” and start designing clear boundaries.

## Scoping a bounded context

How big should a bounded context be? Too big and the model gets fuzzy; too small and integration is a nightmare.

Some heuristics from experience:  

* Start **wide**, especially around a new core subdomain. Splitting too early makes learning expensive.  
* Narrow the context when you see **conflicting meanings** or **very different lifecycles** for the same term.  
* Consider **non-functional needs**: performance, scaling, availability, data residency. Sometimes those alone justify a split.  
* Watch for **cross-context changes**. If a single feature consistently requires coordinated changes across two contexts, your boundaries might be wrong.

The boundary is part of the model, not an afterthought. You design it with the same care as entities and aggregates.

## Domains, subdomains, and bounded contexts

It helps to keep roles clear:

* **Domain** and **subdomains** live in the **problem space** — how the business thinks.  
* **Bounded contexts** live in the **solution space** — how you implement models and services.  

One subdomain may map to:

* One bounded context (simple case).  
* Several contexts (e.g., same subdomain but different technology or latency profiles).  
* A context that also hosts small parts of neighboring subdomains for pragmatic reasons.

Don’t chase a perfect 1–1 mapping. Use subdomains to guide **where** to invest and bounded contexts to guide **how** you implement.

## Keeping the model clean with CQRS

Inside a non-trivial bounded context you eventually see a tension:

* The **write model** wants to be small and defensive, focused on invariants and rules.  
* The **read side** wants flexible, UI-friendly, denormalized views with different shapes for dashboards, reports, and APIs.

If you use one model and one schema for both, aggregates tend to grow to mirror screens, not business rules. You get god-objects bloated with fields “needed for reporting.”  

**Command–Query Responsibility Segregation (CQRS)** is one way to resolve this inside a bounded context:

* A **command model** — single source of truth, handles writes, enforces invariants.  
* One or more **read models** — projections optimized for queries and reporting.  

They can share the same database or use separate storage, depending on scale needs.

### Command side: intent and invariants

On the write side, CQRS makes the domain model the defender of rules:

* Commands are small DTOs that express **intent in domain language** (“RedeemGiftCertificate”, “ApproveLoan”).  
* Application services / command handlers orchestrate the use case: load aggregates, call domain methods, persist changes.  
* Aggregates stay focused on invariants, not on being “report-friendly.”  

Important nuance: commands **can return data** — for example, validation errors or a fresh view of the updated entity — as long as that data comes from the strongly consistent write model, not from eventually consistent projections.  

### Read side: projections and reporting

Read models exist purely to answer questions efficiently:

* Their schema can be completely different from the command model.  
* They are **read-only**; if they get out of sync, you rebuild them from the write side.  
* They can be as denormalized as needed (“one table per screen” is fine here).  

Projections can be:

* **Synchronous** — e.g., updated in the same transaction or by polling changes after a checkpoint. Simple, strong consistency, easier debugging.  
* **Asynchronous** — e.g., updated by consuming domain events from a bus. Scales well but introduces out-of-order events, duplicates, and eventual consistency. Usually you start synchronous and add async where scale forces you to.  

Within a bounded context, CQRS lets you:

* Keep the write model small and rule-centric.  
* Give the read side freedom to evolve shape, storage, and performance independently.  
* Align your architecture with the fact that **writes and reads care about different things**.

## Commands, queries, and application services

The write and read sides still need orchestration. That’s where **application services** come in:

* On the command side, they:  
  * Validate input formats and basic technical constraints.  
  * Start/commit/rollback transactions.  
  * Load aggregates from repositories and invoke domain methods.  
  * Publish domain events to other contexts.  

* On the query side, they:  
  * Fetch from the appropriate read model or reporting store.  
  * Assemble view models for UI or external consumers.  
  * Sometimes bypass the domain layer entirely for heavy reporting (e.g., querying a denormalized reporting DB).

Think of application services as **coordinators**:

* They own technical concerns (transactions, logging, auth, retries).  
* They should not own core business rules — that’s the domain’s job.

Within a bounded context, this split keeps your domain model expressive and your infrastructure honest.

## Design heuristics for bounded contexts

Putting it together, some practical heuristics when carving and evolving bounded contexts:  

* **Optimize for learning first.**  
  Start with **wider** contexts in your core domain, where you expect volatility and discovery. Splitting too early makes every change a cross-context negotiation.

* **Let language and invariants lead.**  
  Split when you see persistent language conflicts or rules that barely interact but live in the same model.

* **Match patterns to subdomain complexity.**  
  In a core context with rich domain models or event sourcing, CQRS is a natural fit; in simpler supporting contexts, a layered architecture with Transaction Scripts might be enough.

* **Separate read and write concerns when needed.**  
  Reach for CQRS when the same bounded context needs both high write consistency and highly optimized, varied read models.

* **Treat reporting consciously.**  
  For simple cases, reuse domain objects to build reports. As complexity grows, move to denormalized view caches or dedicated reporting contexts that subscribe to events from multiple bounded contexts.

These are heuristics, not laws. The goal is not “perfect DDD purity.” The goal is boundaries that make it safe to change the model, grow it, and reason about it.

## Summary

Bounded contexts are the main tool DDD gives you for managing domain complexity. They let you draw explicit fences around where a specific model and language apply, instead of pretending the whole company can share one truth.  

Inside each context, you can keep models small and coherent, and use patterns like CQRS, domain events, and application services to separate command and query concerns without bloating aggregates. Across contexts, you integrate through contracts and reporting models rather than shared tables and global entities.  

Done well, bounded contexts turn “we have conflicting definitions” from a source of chaos into a design signal — one that tells you where to cut, where to model deeply, and how to keep your architecture aligned with how the business actually works.

## Recommended Reading

#### Web Resources

* None yet.

#### Books

* Khononov, V. (2021). *Learning Domain-Driven Design*. O’Reilly Media.  
  * **Chapter 3: Managing Domain Complexity**\
    Introduces bounded contexts as the answer to inconsistent models and shows how model boundaries and language scope reduce complexity.  
  * **Chapter 8: Command-Query Responsibility Segregation (CQRS)**\
    Explains CQRS as a way to have multiple models in a single context, separating write correctness from read efficiency with command and read models.  
  * **Chapter 10: Design Heuristics**\
    Offers practical rules of thumb for sizing bounded contexts, choosing business-logic patterns, and matching architecture and testing strategy to domain needs.

* Millett, S., & Tune, N. (2015). *Patterns, Principles, and Practices of Domain-Driven Design*. Wrox/Wiley.  
  * **Chapter 6: Maintaining the Integrity of Domain Models with Bounded Contexts**\
    Defines bounded contexts formally and discusses how to keep models cohesive and language consistent within each boundary.  
  * **Chapter 24: CQRS – An Architecture of a Bounded Context**\
    Describes CQRS as a natural architecture for complex bounded contexts, separating command and query models and addressing scaling concerns.  
  * **Chapter 25: Commands – Application Service Patterns for Processing Business Use Cases**\
    Shows how application services coordinate domain objects, handle infrastructure, and process commands while keeping business rules in the domain.  
  * **Chapter 26: Queries – Domain Reporting**\
    Explores reporting patterns within and across bounded contexts, from mapping domain objects to denormalized view caches and projections over event streams.
