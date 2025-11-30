---
weight: 202
title: "What is the business domain?"
description: "This article explains what a business domain is and how domains and subdomains structure your problem space. Learn how this understanding shapes architectural decisions, staffing, and investment strategies, ensuring your software aligns with core business objectives."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

## Definition

When you design software, “the business domain” is the playing field you are actually designing for. It is the part of reality your system interacts with: the services the company provides, the rules it must respect, and the outcomes it must achieve.

If you can’t clearly describe that domain, every later decision—requirements, architecture, technology—rests on guesswork.

A business domain is the company’s main area of activity: the customer-facing service it delivers to the market. An airline’s domain is air travel; a food-delivery startup’s domain is food ordering and delivery; a SaaS billing platform’s domain is subscription billing and payments.

A few important points:

* A company can operate in multiple domains at once (e.g., banking, insurance, and investments).
* Domains are not permanent. Strategy changes, acquisitions, and regulation can shift or split them over time.
* The domain defines what “success” means for your system: which outcomes matter and which are noise.

> **When you say “we are building software for X,” that X is your business domain.**

### Domains, subdomains, and the problem space

Treat “domain” as the top level of your problem space. Inside it, you break things down into **subdomains**: finer-grained business capabilities that together deliver the overall service.

For example, in an online ticketing platform:

* The domain is ticket sales and event discovery.
* Subdomains might include search and recommendations, payments, fraud detection, ticket fulfillment, and customer support.

No single subdomain wins the game on its own. They need to collaborate to produce tangible outcomes, like “customer buys a ticket they actually want and can enter the venue with minimal friction.”

Thinking in subdomains gives you a realistic map of the problem space. Instead of treating “the system” as a single blob, you see it as a set of cooperating capabilities with different characteristics and priorities.

## Types of subdomains

Domain-Driven Design adds another crucial distinction: not all subdomains matter equally. It classifies them into three types, each with a different strategic value.

* **Core subdomains**  
  Where the company competes and differentiates. They are usually complex, full of domain rules, and under constant strategic pressure. This is why you are writing custom software in the first place.

* **Generic subdomains**  
  Complicated problems, but already solved by the industry in a reusable way: authentication, invoicing, document storage, and off-the-shelf CRM. You rarely win by reinventing these.

* **Supporting subdomains**  
  Necessary to deliver the service, but not the reason customers choose you. They tend to be simpler, more CRUD-like, and more stable than the core.

> **This classification is not about “important vs unimportant.” It is about where to invest time, money, and attention.**

### Core subdomains

A core subdomain is the essence of why your product exists.

In a ride-hailing platform, the core might be:

* Pricing and matching algorithms.
* Real-time dispatch and routing.
* Fraud and risk scoring that lets you scale safely.

Characteristics of core subdomains:

* High complexity and strong entanglement with business strategy.
* High volatility—business rules and models change as the company experiments, grows, and reacts to competitors.
* Justifies your best people, deeper design, and tighter collaboration with domain experts.

You build these in-house and treat them like a product inside the product.

### Generic subdomains

Generic subdomains are complicated problems that many companies share: identity, logging, payment gateways, basic accounting, and email delivery.

They usually:

* Have mature commercial products or open-source solutions.
* Change slowly relative to your core.
* Don’t differentiate yourself, as long as they are “good enough” and reliable.

Here, your goal is to buy, integrate, and configure, not to innovate. You focus on stability, security, and cost.

### Supporting subdomains

Supporting subdomains enable the core but are not where you compete: internal administration panels, simple back-office workflows, some reporting flows, and many integration “glue” pieces.

Common traits:

* Mostly CRUD and straightforward workflows.
* Lower volatility and fewer “clever” algorithms.
* Can often be handled with rapid frameworks, low-code tooling, or even manual processes in early stages.

These should be intentionally “good enough.” Over-engineering them steals capacity from the core.

## Working with domains

### Comparing subdomains

Classifying subdomains is not a gut-feeling exercise; it is a strategic analysis tool. Looking at a domain through four lenses helps: competitive advantage, complexity, volatility, and solution strategy.

* **Competitive advantage**  
  Only core subdomains give you a real edge. Generic and supporting ones must be solid, but they don’t cause customers to switch to you.

* **Complexity**  
  Heavy domain rules, optimization algorithms, and nuanced edge cases often indicate core. Straight-line CRUD and basic workflows often indicate support.

* **Volatility**  
  Core subdomains evolve constantly as product strategy shifts. Generic subdomains evolve at the pace of vendors and standards. Supporting subdomains change slowly unless your internal processes are chaotic.

* **Solution strategy**  
  Core → built in-house with strong engineering and rich domain models.  
  Generic → buy or adopt OSS; integrate carefully.  
  Supporting → build simply; frameworks, low-code, or outsourcing are fine.

Once you see subdomains through these lenses, it becomes evident that “treat every part of the system equally” is a bad idea.

### Finding and refining subdomain boundaries

You rarely get a ready-made list of subdomains from the business. You have to discover and distill them.

Practical starting points:

* Look at existing organizational units (departments, teams, product lines) as coarse candidates.
* Map out major business processes end-to-end (e.g., Acquire Customer, Fulfill Order, Collect Payment).
* Identify sets of tightly related use cases, data, and actors that hang together.

Then refine:

* Split coarse areas where you see very different goals, rules, or metrics.
* Watch for a “generic-looking” area that hides a core slice (for example, a “Customer Service” area that actually contains a unique routing algorithm).
* Stop when further splitting no longer changes architectural or staffing decisions.

The goal is not the perfect taxonomy. The goal is a helpful map that guides design and investment.

### Using domains and subdomains to shape architecture

Once you understand the domain and its subdomains, you can let that knowledge drive your architecture instead of the other way around.

Some implications:

* Core subdomains deserve richer models, more focused bounded contexts, and more deliberate architecture styles (and are often good candidates for DDD’s tactical patterns).
* Generic subdomains may live behind integration boundaries, with clear contracts to vendors or external systems.
* Supporting subdomains can share more pragmatic infrastructure and even tolerate “messy but contained” implementation, as long as they don’t pollute the core.

Subdomains also inform:

* How you split the system into services, modules, or bounded contexts.
* Where to place anti-corruption layers between clean new models and legacy “mud.”
* Which parts must be easy to replace instead of being reused across the whole system?

If you ignore the domain and jump straight to solution patterns, you end up with services and modules whose boundaries reflect your org chart or framework defaults—not the real problem space.

### Focusing on the core domain

A critical step in domain analysis is to write down what is actually core and treat it as a product, not a project.

That means:

* Creating a domain vision statement that explains why this software exists and what unique value it should deliver.
* Using that vision to prioritize scope: if a delivery date slips, you cut peripheral features, not core quality.
* Accepting that the core will evolve as the market responds—competitors will copy you, regulations will shift, and your strategy might move.

Sometimes you only discover the core after experimenting:

* You ship an initial version with a “good enough” model.
* The market responds strongly to a particular capability.
* That area becomes core; you then refactor and invest more deeply in its model and architecture.

The key is to be deliberate: know what you are treating as core today, and revisit that decision regularly.

### Domain experts and the limits of diagrams

You cannot analyze a domain in isolation from the people who live in it.

Domain experts are those who actually own or operate the business processes: operations leads, frontline staff, product managers with deep customer context—not just analysts or architects. Their mental models, vocabulary, and stories are your raw material.

Your job as an architect is to:

* Find the real domain experts, not just the loudest voices.
* Extract knowledge through conversations, workshops, and examples, not just requirement documents.
* Challenge “requirements” that merely mirror legacy constraints, and dig for the underlying intent and outcomes.

Domain diagrams, capability maps, and subdomain lists make sense only if they accurately reflect these people’s world.

## Summary

The business domain is the real-world problem space your system serves. Inside it, subdomains give you a more precise map of capabilities—and classifying them as core, generic, or supporting tells you where to invest and how to shape your architecture.

When you let domains and subdomains drive boundaries, staffing, and technical choices, you avoid spreading effort evenly over everything. You put your best minds and most careful models where the business actually competes, keep generic and supporting areas deliberately “good enough,” and give your system a chance to stay understandable and changeable as the company evolves.

## Recommended Reading

#### Books

* Khononov, V. (2021). *[Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)*. O’Reilly Media.
  * **Chapter 1: Analyzing Business Domains**\
    Introduces domains and subdomains, shows how to classify them as core/generic/supporting, and explains how this analysis anchors all later design decisions.  
* Millett, S., & Tune, N. (2015). *[Patterns, Principles, and Practices of Domain-Driven Design](https://www.wiley.com/Patterns%2C%2BPrinciples%2C%2Band%2BPractices%2Bof%2BDomain%2BDriven%2BDesign-p-9781118714706)*. Wrox/Wiley.
  * **Chapter 3: Focusing on the Core Domain**\
    Explains how to distill the problem domain into subdomains, identify what is truly core, and align architecture, staffing, and quality levels with that analysis.
