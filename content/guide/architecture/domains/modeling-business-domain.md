---
weight: 203
title: "Modeling Business Domain"
description: "This article explains how to effectively model a business domain, covering the discovery of domain knowledge, the development of a ubiquitous language, and the application of model-driven design. Learn to use various implementation patterns to keep your code aligned with business needs and ensure maintainable software."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

## Introduction

You can have perfect infrastructure and clean code and still ship the wrong thing. The usual root cause is simple: the software model and the business model drift apart.  

Modeling the business domain is how you close that gap. It is the discipline of turning fuzzy expert knowledge into precise concepts, language, and code that actually match how the business thinks and works.

### Why model the business domain at all?

Every serious system exists to solve business problems: reduce manual work, enforce policies, support decisions, or coordinate people and data. Those problems live in the domain, not in the framework.  

When you skip modeling and jump straight to implementation:

* Requirements become shallow translations of current screens and spreadsheets.
* Edge cases stay in experts’ heads instead of in code.
* The same concept shows up under three different names across modules and teams.
* Changing a rule becomes dangerous because no one knows where it truly lives.

Modeling the domain is not “extra architecture.” It is the only way to ensure your software accurately reflects the business you serve.

### From domain knowledge to domain model

You do not become a domain expert. You learn enough of experts’ mental models to design effective software. That is a different job.  

Two important consequences:

* You are always **learning**, not just “implementing requirements.”
* The value of your model depends on the **quality of knowledge flow** from experts to the team.

Classic lifecycles mishandle this:

* Analyst talks to domain experts.
* Analyst writes documents.
* Developers implement documents.
* Testers check that the implementation matches the documents.

Every step translates and compresses the original understanding. By the time the code runs in production, no one remembers why a rule exists or when it is allowed to change.  

Domain modeling pushes you in the opposite direction:

* Get engineers and experts in the same room.
* Talk in the business’s own language.
* Sketch models together.
* Let code and conversations feed back into each other continuously.

The goal is not to “capture everything” up front. The goal is to create a model that can evolve as you learn.

## Ubiquitous Language: the backbone of modeling

Domain-Driven Design’s primary tool for knowledge flow is the **Ubiquitous Language**: a single shared language for the project’s domain, used by everyone and reflected directly in the code.  

A good ubiquitous language has a few properties:

* It is **business-first**. Terms describe what the business sees and cares about, not database tables or UI widgets.
* It lives in **conversations, docs, tests, and code**. Class names, method names, and test scenarios all use the same words.
* It is comfortable for **domain experts**. They should be able to read scenarios and tests and say, “Yes, that’s how we talk about it.”

### Business-first language, not tech jargon

“Campaign can be published only if at least one placement is active” is a domain statement.  

“active_placements table has at least one record” is an implementation detail.  

When requirements and conversations are dominated by database and UI language:

* Hidden domain rules stay hidden.
* People argue about columns instead of policies.
* The model gets shaped around accidental constraints.

Modeling the domain means insisting that rules are stated the way the business would say them, then mapping them down into code.

### One meaning per term, one term per meaning

Ambiguity kills domain models.

Two common traps:  

* **Ambiguous terms**  
  One word used for multiple concepts (“policy” as a rule vs. “policy” as an insurance contract). The fix: split into distinct terms and model them separately.

* **Synonymous terms**  
  Several words for the same thing (“user,” “customer,” “account,” “seat”) are used interchangeably. The fix: pick one name for one concept and stick to it.

Simple rule: one meaning per term, one term per meaning. If you cannot say which one you mean, your model is already in trouble.

### Making the language real

A ubiquitous language is not a wiki page you write once. It becomes real only when it shows up everywhere:  

* Glossary maintained collaboratively by the team.
* Business-readable tests (for example, Given–When–Then scenarios) that domain experts can review.
* Code names that reflect domain concepts, not coordinates in the database.

Language evolves as understanding deepens. Modeling the domain means being willing to rename things in code when you discover a better concept.

## What is a model, really?

A **model** is a simplified, purpose-driven representation of reality. It is the equivalent of a map: useful precisely because it ignores most details.  

Key points:

* All models are wrong, but some are useful.
* A good model emphasizes what matters for current decisions and ignores the rest.
* Simplicity is a deliberate choice, not laziness.

For example, a shipping model might care about:

* Shipments, routes, carriers, delivery windows, and customs checks.
* But completely ignore engine type, fuel consumption, or driver break schedules.

Those details matter to someone, just not for the problem you are solving today.

### Domain vs Domain model

The **domain** is the real-world area: shipping, lending, and onboarding.  

The **domain model** is a conceptual structure that helps you solve problems in that domain. It captures entities, behaviors, relationships, and invariants that matter for your use cases.  

You judge a domain model by:

* How well it helps you reason about rules and scenarios.
* How safely does it let you change behavior when the business changes?
* How clearly it aligns with the ubiquitous language.

You do **not** judge it by how closely it mirrors “how things work in reality” in full detail.

### Analysis model vs Code model

Teams often produce diagrams, whiteboard sketches, or UML to understand the domain. That is your **analysis model**. The classes, methods, and modules you implemented constitute your **code model**.  

The trap is letting these drift apart:

* The diagram says “Reservation,” the code says “BookingEntityV2.”
* The diagram shows a rule that never actually got implemented.
* The code contains new concepts that nobody ever fed back into the diagrams.

Model-driven design pushes you to keep **one evolving model** that’s expressed in both places:

* The same names and concepts appear in conversations, sketches, and code.
* Changes in one side (new insight, bug fix, edge case) are reflected in the other.
* Code becomes the **primary expression** of the model, because it is the only thing that actually runs.  

If your diagrams and code disagree, the code wins. So you might as well make the code a first-class model.

## Model-Driven Design: binding analysis and code

**Model-Driven Design (MDD)** is the practice of making the domain model the backbone of both design and implementation. It ties DDD’s collaboration and language work directly to code.  

In practice, that means:

* You model with domain experts and developers in the same loop.
* You implement slices of the model in code early, not after a huge analysis phase.
* You use feedback from running code to refine concepts, constraints, and names.

### Why big upfront design fails

When architects hand off “finished designs” to developers:

* Developers run into constraints that the diagrams ignored.
* They improvise local fixes that distort the original ideas.
* Domain terms get replaced with generic “manager/service/util” names.
* The business changes while you are still implementing the old model.  

You end up with two models: the pretty one in documents and the real one in code. Only one of them matters, and it is not the one on the wiki.

Model-driven design replaces this with continuous modeling:

* Sketch just enough to start.
* Implement a thin slice in code.
* Show it to domain experts in domain language.
* Adjust the model and code together.

### Using the Ubiquitous Language as the bridge

The ubiquitous language is what keeps analysis and code in sync:  

* Names in diagrams become names in classes, methods, and modules.
* Terms introduced during implementation are validated with domain experts and added to the language.
* Ambiguous or overloaded names are cleaned up in both worlds at the same time.

If you feel friction while saying a sentence out loud (“when a booking is… reservation… whatever”), that is a signal the model needs refining. Listen to that.

### Modeling behavior, not just data

A lot of “modeling” degenerates into drawing entity-relationship diagrams and calling it a day. That is not enough.

Effective domain models focus on:  

* Behaviors: what can happen, in which order, under which conditions.
* Invariants: what must always be true.
* Decisions: who or what decides, based on which inputs.

Data shapes matter, but they are meant to support behavior and rules, not serve as the model on their own.

### When (and where) to apply model-driven design

You do not need heavy modeling everywhere. In fact, you **should not**.  

Apply model-driven design when:

* The area is part of your core or a complex supporting subdomain.
* Rules are subtle, interdependent, or politically sensitive.
* Misunderstandings between business and tech have a high cost.

Keep things lighter when:

* The problem is simple and stable.
* You can safely buy or outsource the solution.
* Domain experts are already overloaded and need to focus on the core.

A good starting point is to map domains and subdomains, identify the core, and then deliberately decide where to allocate modeling effort first.

## Implementation patterns for the domain layer

All this thinking has to land somewhere in code. DDD talks about a **domain layer**: the part of the system where business rules live, insulated from UI and infrastructure.  

There are multiple implementation patterns you can use, depending on the context.

### Domain Model pattern

The **Domain Model** pattern uses rich objects that combine data and behavior, designed to be mostly persistence-ignorant.

Good fit when:

* The domain or subdomain is complex and strategically important.
* Rules interact, and you need to enforce invariants consistently.
* You are willing to invest in a carefully shaped code model.  

It is a bad fit when:

* The problem is almost pure CRUD.
* The cost of sophisticated modeling outweighs the benefits.
* The team is not ready to maintain that level of abstraction.

### Transaction Script and Table Module

Not every subdomain deserves a rich domain model.

* **Transaction Script**: one procedure per business transaction, often in an application/service class, handling validation and persistence inline.
* **Table Module**: logic organized around database tables, with classes that encapsulate operations on a table.  

They are helpful when:

* Rules are straightforward and mostly linear.
* You need something simple and explicit for juniors or small teams.
* The area is supporting or generic, not core.

They become a problem when you try to stretch them over genuinely complex, evolving logic.

### Active Record and Anemic Domain Model

You will also see:

* **Active Record**: each entity handles its own persistence.
* **Anemic Domain Model**: entities with data only, logic pushed into services.  

These are often criticized in DDD circles, sometimes fairly. But in many supporting or generic areas, they are entirely adequate and simpler to maintain.

The important thing is not dogma. It is making an explicit choice:

* Rich domain model where you need deep behavior and invariants.
* Simple script or record-based patterns where CRUD is truly enough.
* Clear separation so a “cheap” pattern in one context does not leak into your core.

### Mixing patterns across contexts

Large systems almost always mix patterns:

* Core subdomain → rich domain model.
* Supporting admin module → transaction scripts.
* Integration glue → simple scripts or table modules.

Modeling the domain involves choosing the correct implementation pattern for each context, rather than forcing everything into one mold.  

## Summary

Modeling the business domain is how you turn expert knowledge into software that actually matches reality and can adapt as the business changes.  

You start by improving knowledge flow with domain experts, shape a ubiquitous language, and use it to drive both analysis and code. You treat the domain model as a purpose-driven abstraction rather than a perfect mirror of the real world, and you use model-driven design to keep diagrams and code aligned. Finally, you choose implementation patterns that fit each context, reserving rich domain modeling for the places where it truly pays off.

## Recommended Reading

#### Books

* Khononov, V. (2021). *[Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)*. O’Reilly Media.
  * **Chapter 2: Discovering Domain Knowledge**\
    Explores how to work with domain experts, build a ubiquitous language, and treat modeling as a continuous learning process rather than a one-off phase.  
* Millett, S., & Tune, N. (2015). *[Patterns, Principles, and Practices of Domain-Driven Design](https://www.wiley.com/Patterns%2C%2BPrinciples%2C%2Band%2BPractices%2Bof%2BDomain%2BDriven%2BDesign-p-9781118714706)*. Wrox/Wiley.
  * **Chapter 4: Model-Driven Design**\
    Describes how to bind analysis and code through a shared model and language, and why the code model should be treated as the primary expression of the domain.  
  * **Chapter 5: Domain Model Implementation Patterns**\
    Surveys implementation patterns such as Domain Model, Transaction Script, Table Module, and Active Record, explaining where each fits in a layered architecture.
