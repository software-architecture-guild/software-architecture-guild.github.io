---
weight: 209
title: "Best Practices"
description: "This article explains best practices for applying Domain-Driven Design (DDD), covering when to invest in DDD, how to collaborate with domain experts, model real-world scenarios, and safely evolve code and language over time to manage complexity effectively."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

## Introduction

DDD isn’t a lifestyle choice. It’s a set of tools for when the domain is tricky, the stakes are high, and you can actually talk to people who know how the business works. Used in the wrong place, it’s a ceremony. Used in the right place, it’s how you turn complexity into something your team can reason about and change.  

This article puts the pieces together: when DDD pays off, how to sell it, how to work with experts, and how to keep your models simple, explicit, and evolvable.

## Practices

### Use DDD where it actually helps

DDD is not for every system, every team, or every feature.

It shines when:

* The domain is non-trivial and essential for the business.  
* You have access to real domain experts.  
* The team is willing to iterate in small steps, not demand a complete design up front.  
* You can build and refine over time, not in a one-shot project.  

When any of those are missing, lean on simpler patterns:

* Transaction Script and Active Record for CRUD-heavy, low-risk areas.  
* Off-the-shelf products for generic capabilities (billing, auth, HR, etc.).  

Save deep modeling and rich domain layers for places that move the needle.

### Sell outcomes, not “DDD”

Most executives don’t care about aggregates or bounded contexts. They care about:

* How quickly you can change rules without breaking things.  
* How predictable delivery is.  
* How well the system reflects real business decisions.  

So don’t sell “we’re doing DDD.” Sell things like:

* “We’ll make the rules explicit, so changing policy doesn’t mean rewriting half the system.”  
* “We’ll map where complexity really is, and keep everything else simple and cheap.”  
* “We’ll reduce the risk that one change in billing accidentally blows up onboarding.”

Inside the team, you can talk about patterns. Outside, talk about risk, speed, and clarity.

### Teach language and context first, patterns second

Most DDD adoptions fail because teams start with tactical patterns (entities, repositories) and never fix how they talk about the domain.

Flip it:

* Start with vision – what is this product trying to be? Core? Supporting? A “fail fast” experiment? The level of rigor should match the bet.  
* Teach ubiquitous language – shared terms, examples, and scenarios that everyone uses in conversation, docs, and code.  
* Introduce domains, subdomains, bounded contexts, and context maps so people see where models start and end.  

Only then talk about aggregates, value objects, and event sourcing. Technology choices are implementations of that shared understanding, not the other way around.

### Work in the problem space before the solution space

Most teams rush into APIs and data models. Best practice: slow down the start.

Move through a deliberate sequence:

1. **Understand the vision**  
   *Is this feature probing a new market, or cementing a core differentiator?*  
   Vision tells you how much DDD effort is worth it.  

2. **Capture required behaviors**  
   Use behavior-driven examples: Given/When/Then, concrete inputs and outputs, and especially *why* the behavior matters. Treat BDD as a requirements language, not a testing fashion.  

3. **Distill the problem space**  
   Cluster related behaviors into capabilities and subdomains (core, supporting, generic). This reduces cognitive load and makes it clear where to invest.  

4. **Focus on what’s important**  
   Spend disproportionate modeling time on the core. Timebox everything else ruthlessly.  

5. **Understand the landscape**  
   Build and maintain a context map: which bounded contexts exist, how they integrate, who is upstream/downstream, and where legacy systems push constraints at you.  

If you skip these, you’ll build beautiful models in the wrong places.

### Use the simplest implementation pattern that fits

DDD isn’t “rich domain model everywhere.”

For each subdomain or bounded context, ask:

* How complex are the rules and invariants?  
* How often will they change?  
* What happens if we get them wrong?  

Then pick the pattern that matches:

* **Transaction Script / Active Record**  
  For simple flows, rarely changing rules, or non-critical areas.  

* **Rich Domain Model**  
  For complex, evolving, high-stakes logic where invariants matter.  

* **Event Sourcing**  
  When history and auditability are first-class (regulation, money, critical decision trails).

You can—and should—mix patterns in one system. Over-modeling everywhere burns attention and makes the architecture harder to work with.

### Work with domain experts like they’re your scarcest resource

Without real domain experts, DDD is cosplay.

Good practice:

* Treat the expert’s time as the rarest resource. Prepare scenarios and questions; don’t show up to “pick their brain.”  
* Model around concrete scenarios, not abstractions. “Walk me through the last three times this failed.” beats “What are the requirements?”  
* Spend joint time on the hard, interesting parts – decisions, exceptions, policies. Don’t drag them through CRUD forms and field names.  

You want deep insight into the core domain, not broad but shallow coverage of everything.

### Let language drive code, and refactor both

Ambiguity is a design smell.

Good DDD practice treats language refactoring as crucial as code refactoring:

* When you discover a better term, rename it everywhere—tests, classes, APIs, docs.  
* When experts use a term repeatedly, give it a real place in the model: a type, an event, a module.  
* When two contexts use the same word to mean different things, split it into context-specific terms instead of arguing over one universal definition.

Non-technical refactoring (renaming, clarifying, splitting concepts) is a first-class activity, not cosmetic work you do “if there’s time.”  

### Expect to throw away models

If your first model survives untouched, it’s probably wrong, and nobody is looking closely.

Better practice:

* Assume your first and second models are disposable. You build them to learn.  
* Use tests and examples to expose where the model bends or breaks.  
* Be ready to unlearn: sometimes you must abandon a clever structure in favor of a dull one that fits the domain better.  

The metric is not how long a model lasts; it’s how quickly you can evolve it as understanding deepens.

### Prove the model in code with boring solutions

Beautiful whiteboard models don’t count until they survive contact with code.

Principles:

* Implement the model with the same terms you use in conversation—no translation step where “Policy” suddenly becomes “ContractDtoV2”.  
* Keep code boring and focused. Fancy frameworks, reflection, and metaprogramming rarely improve clarity.  
* Integrate the model end-to-end early and often: thin vertical slices through UI, app layer, domain, and persistence. See if it still feels right once it’s wired up.  

If it’s hard to test or to explain to a new teammate, it’s probably too clever.

### Carve out safety when dealing with legacy

Most real DDD work happens in brownfield systems. You rarely get a greenfield playground.

Best practice around legacy:

* Treat legacy systems and schemas as upstream contexts. Document what they provide and how they constrain you.  
* Use anti-corruption layers to protect your new model from leaking legacy concepts inside. The extra layer is cheaper than a polluted core.  
* Refactor inside a safe zone. Establish new boundaries and models in one slice, then gradually route more behavior through them.

Don’t start by “fixing the database.” Start by protecting the core domain from being distorted.

### Model and refactor continuously, not in phases

DDD isn’t “we did a modeling workshop in Q1.”

Treat modeling and refactoring as continuous:

* Spin a loop: explore → model → implement → integrate → learn → refactor → repeat.  
* Use tests (TDD/BDD) to support aggressive refactoring without fear.  
* Expect to change models as the business, regulations, and org chart change.

If your model looks the same year after year while the environment shifts, you’re running on stale understanding.

### Don’t solve every problem

Some complexity is not worth automating.

Ask:

* How often does this scenario happen?  
* What is the impact if we keep it manual?  
* How much modeling and implementation cost would automation add?  

It can be perfectly fine to leave rare, weird edge cases for humans to handle—with clear procedures and good tooling—while the system focuses on the 80–95% that bring value.

### How to know if you’re doing it right

Signs you’re on the right track:

* Conversations, docs, and code use the same language.  
* New team members can explain core flows back to domain experts in a couple of days.  
* Changing a core rule touches a small, prominent part of the system, not ten random services.  
* Teams talk about subdomains, contexts, and invariants, not just “the microservices architecture.”  

The outcome is not “we did DDD.” The outcome is understandable, maintainable software that reliably reflects the business and can change with it.

## Summary

Good DDD practice is less about memorizing patterns and more about disciplined habits:

* Use it where the domain is complex and important, not everywhere.  
* Sell outcomes to the business, not jargon.  
* Invest in language, subdomains, and bounded contexts before code structures.  
* Work with domain experts on the most complex parts, using real scenarios.  
* Let language drive code, keep solutions simple, and protect core models from legacy.  
* Expect to throw away models, refactor continuously, and leave some problems to humans.

Done this way, DDD becomes a way to keep complexity legible, rather than another layer of it.

## Recommended Reading

#### Books

* Millett, S., & Tune, N. (2015). *[Patterns, Principles, and Practices of Domain-Driven Design](https://www.wiley.com/Patterns%2C%2BPrinciples%2C%2Band%2BPractices%2Bof%2BDomain%2BDriven%2BDesign-p-9781118714706)*. Wrox/Wiley.
  * **Chapter 10: Applying the Principles, Practices, and Patterns of DDD**\
    A practical checklist of when to apply DDD, how to work with domain experts, how to keep models explicit and straightforward, and how to integrate and refactor continuously in real organizations.  
