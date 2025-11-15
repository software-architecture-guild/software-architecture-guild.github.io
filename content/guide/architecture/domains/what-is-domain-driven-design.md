---
weight: 201
title: "What is Domain Driven Design?"
description: "This article explains what Domain-Driven Design is, why it matters for complex business domains, and how its strategic and tactical patterns help you manage complexity."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Domain-Driven Design (DDD) is a way of building software that starts from the business problem, not from frameworks or technology. It helps you keep complex systems understandable and changeable by putting the business domain at the center of your models, code, and architecture.

DDD is not a framework, a set of annotations, or a microservices recipe. It is a set of principles, patterns, and practices that align people, language, and code so that the system reflects how the business really works.

## Why complex domains hurt

Most systems don’t turn into a mess because people are stupid. They rot because complexity is unmanaged.

Teams mix technical complexity (frameworks, databases, messaging) with domain complexity (rules, policies, workflows) in the same places. Business terms are translated three or four times between requirements, documents, and code. Over time, no one can say with confidence what the system actually does.

A few common symptoms:

* Code and conversations use different languages for the same thing.
* Core business rules are scattered across controllers, stored procedures, and UI code.
* Changing a simple rule requires risky edits in many places.
* The architecture slowly degrades into a “Big Ball of Mud” where everything depends on everything else.

DDD starts by naming this problem clearly: your biggest risk is not that the system is slow today, but that it becomes impossible to safely change tomorrow.

## The core idea of Domain-Driven Design

Domain-Driven Design says: if the problem is in the domain, the solution must be in the domain model.

At its heart, DDD asks you to:

* Put the **business domain** at the center of design and architecture.
* Build and use a **Ubiquitous Language** shared by developers and domain experts.
* Model the domain explicitly and reflect that model directly in the code.
* Contain models inside well-defined **Bounded Contexts** so they don’t corrupt each other.
* Focus the best people and efforts on the **core domain** where the business really competes.

Everything else in DDD — patterns, diagrams, tactical building blocks — exists to support these moves, not the other way around.

## Problem space vs solution space

DDD draws a sharp line between **problem space** and **solution space**.

* In the **problem space**, you explore how the business works. You identify subdomains, understand workflows and policies, and figure out which parts truly differentiate the business.
* In the **solution space**, you decide how to implement those insights in software — architecture styles, boundaries, data models, APIs, storage choices, and so on.

DDD insists that problem space drives solution space:

* You don’t start with “we’re doing microservices” and then retrofit the domain into it.
* You first understand which subdomains exist, how they relate, and which one is the core.
* Only then do you shape bounded contexts, services, and integration patterns around those findings.

If your architecture does not mirror the structure of your domain, complexity leaks everywhere.

## Strategic patterns: where and how to invest

Strategic DDD patterns help you decide **where** to invest and **how** to structure the system so that complexity stays manageable.

### Distilling the domain and focusing on the core

Not all parts of a system are equally important.

* **Core domain**: the place where the business wins or loses. This is where you put your best people, deepest modeling effort, and most rigorous design.
* **Supporting subdomains**: necessary parts that enable the core but don’t differentiate you. You should keep them “good enough,” not perfect.
* **Generic subdomains**: problems that many companies share (authentication, logging, billing basics). These are often better solved with off-the-shelf solutions or standard libraries.

DDD asks: where is the real leverage? Then it pushes you to treat the core domain almost like a product inside the product — with continuous attention, iteration, and refinement.

### Bounded Contexts and their relationships

A **Bounded Context** is a boundary inside which a particular domain model and Ubiquitous Language apply consistently.

Within a bounded context:

* Terms have precise, local meanings.
* The model is internally coherent and optimized for its responsibilities.
* The implementation details (tech stack, style, patterns) can be tailored to that context.

Different contexts can:

* Share terms with different meanings (for example, “Customer” in CRM vs billing).
* Integrate via explicit contracts and context maps, not by sharing the same big database.

Strategic DDD is about choosing these contexts carefully and mapping their relationships so you keep complexity segmented instead of letting it spread everywhere.

## Tactical patterns: how to shape the model

Once you know **where** to invest, DDD offers **tactical patterns** to shape code inside a bounded context.

These include familiar building blocks such as:

* **Entities** — objects with identity and lifecycle.
* **Value Objects** — identity-free values that capture concepts like money, dates, and ranges.
* **Aggregates** — consistency boundaries that group entities and value objects.
* **Domain Services** — operations that don’t naturally belong to a single entity.
* **Domain Events** — records of something meaningful that happened in the domain.
* **Repositories**, **Factories**, and, in some contexts, **Event Sourcing**.

The key is that these patterns exist to express the domain model clearly. You apply them selectively, only where the complexity justifies it. A simple CRUD admin screen does not need full-blown tactical DDD.

## Practices and habits behind DDD

DDD is not only patterns. It is a way of working.

Some core practices:

* **Collaborate with domain experts** continuously. Whiteboards, conversations, event storming sessions, and sketches matter more than big documents.
* **Evolve the model** over time. You don’t design the “perfect model” up front; you learn and refactor as you go.
* **Let language drive design**. When the domain experts’ language changes, the model and code should follow.
* **Be explicit about applicability**. A model that works well in one context may be wrong in another.

Teams that succeed with DDD treat the domain model as a living artifact that grows with the business, not as a diagram that was correct once in a workshop.

## Common misconceptions about Domain-Driven Design

Because DDD has many patterns and famous diagrams, it’s easy to misunderstand what it is.

Typical misconceptions:

* **“DDD = Entities, Aggregates, Repositories.”**  
  No. Those are tactical patterns. You can use them without doing DDD, and you can do DDD without using all of them.

* **“DDD is a framework or library.”**  
  There is no “DDD.framework.” Tools can help, but DDD is mostly about how you think about problems and structure your system.

* **“DDD is only for microservices.”**  
  DDD predates microservices and works with monoliths as well. Bounded contexts can be modules, not just services.

* **“DDD is a silver bullet.”**  
  DDD helps manage complexity; it does not remove it. Bad collaboration or unclear strategy will break any approach, including DDD.

When you treat DDD as a checklist of patterns or a technology choice, you miss its value. When you treat it as a philosophy for aligning domain, language, and architecture, it becomes useful.

## When Domain-Driven Design makes sense

DDD is most valuable when:

* The domain is complex and politically important.
* Rules, policies, and workflows change often.
* The business needs to differentiate itself through software behavior, not just cost.
* Communication between business and tech is a major source of risk.

It is less suitable when:

* The problem is simple, standard, and well-served by generic tools.
* You are building low-risk utilities or one-off scripts.
* There is little need for long-term evolution or deep domain understanding.

You do not “adopt DDD” for everything. You deliberately choose where the investment in modeling and collaboration will pay off.

## Summary

Domain-Driven Design is a way to fight complexity by aligning your architecture, code, and collaboration around the business domain. It splits thinking into problem space and solution space, uses strategic patterns to focus effort and define boundaries, and tactical patterns to express rich models inside those boundaries.

Most importantly, DDD is a long-term habit of working with domain experts, refining language, and letting models evolve as the business changes.

## Recommended Reading

#### Books

* Millett, S., & Tune, N. (2015). *[Patterns, Principles, and Practices of Domain-Driven Design](https://www.wiley.com/Patterns%2C%2BPrinciples%2C%2Band%2BPractices%2Bof%2BDomain%2BDriven%2BDesign-p-9781118714706)*. Wrox/Wiley.  
  * **Chapter 1: What Is Domain-Driven Design?**\
    A clear high-level introduction to DDD, explaining the core challenges of complex domains, the split between strategic and tactical patterns, and common misconceptions.
