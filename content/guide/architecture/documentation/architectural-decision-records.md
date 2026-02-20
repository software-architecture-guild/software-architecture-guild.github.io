---
weight: 285
title: "Architectural Decisions Records"
description: "This article explains what architectural decision records are, how to structure and use them to document, govern, and evolve key software architecture choices."
icon: "article"
date: "2025-11-29T00:08:52+01:00"
lastmod: "2025-01-29T00:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Architectural decisions shape how your system behaves years from now: what it can do, how easily it changes, and where it breaks under stress. Architecture Decision Records (ADRs) make those choices visible, traceable, and governable, rather than leaving them buried in conversations and old slide decks.

## Why Architectural Decision Records Matter

ADRs exist to fight decision amnesia. They capture not just *what* you chose, but *why*—the context, constraints, trade-offs, and expected consequences—so future teams do not have to reverse-engineer intent from code and rumors.

An ADR log becomes the memory of your architecture. It tells a coherent story across years, reorganizations, and rewrites, making it possible to revisit, challenge, or roll back decisions with full context instead of guesswork.

### Making trade-offs explicit

Every non-trivial architectural choice is a trade-off: performance versus simplicity, flexibility versus cost, time-to-market versus robustness. Too often, these trade-offs live in someone’s head and evaporate when people leave.

By writing an ADR, you force yourself to:

* State the problem and constraints clearly.  
* List realistic options.  
* Explain why one option wins under current conditions.  
* Acknowledge both positive and negative consequences.

This makes it much harder to fall into “silver bullet” thinking or blind trend-following. The trade-offs are on the page where everyone can see and challenge them.

### Aligning stakeholders and avoiding rework

Unrecorded decisions get re-litigated constantly. New team members question choices, leaders forget past agreements, and different groups act on different assumptions.

ADRs give everyone a shared reference:

* Product and business can see which decisions support which goals.  
* Engineers can understand constraints instead of treating them as arbitrary.  
* Operations and security can trace risks back to conscious trade-offs.

Instead of repeating the same debates every quarter, you can point to the ADR, decide whether its context still holds, and either reaffirm or replace it.

### Enabling governance and evolution

A decision without enforcement is wishful thinking. ADRs connect choices to governance: reviews, tests, and checks that keep the system aligned with the architecture.

They also support evolution. When context changes—new scale, new regulations, new business model—you can inspect the ADR log, see which assumptions broke, and deliberately supersede decisions instead of accumulating accidental drift.

## What Exactly Is an Architecture Decision Record

An ADR is a short, focused document that records a single architectural decision. It is intentionally lightweight so you can create many of them over the life of a system.

### One decision per record

Each ADR should capture a single decision at a useful level of granularity—for example:

* “Use an event-driven integration between Billing and Orders.”  
* “Adopt PostgreSQL as the primary operational data store.”  
* “Expose public APIs via an API gateway with token-based auth.”

Trying to cram multiple unrelated decisions into a single ADR makes it challenging to understand, govern, or supersede them later.

### Typical structure of an ADR

There are many templates, but most ADRs share a similar shape:

* **Title** – A short, descriptive name (for example, “ADR-007: Event-Driven Integration Between Billing and Orders”).  
* **Status** – Current state of the decision (proposed, accepted, deprecated, superseded).  
* **Context** – The background: problem, constraints, risks, and any relevant technical or business drivers.  
* **Decision** – The choice you made, clearly and concretely stated.  
* **Consequences** – The expected impact, both positive and negative, including trade-offs and follow-up work.  
* **Governance** – How the decision will be enforced and verified (reviews, tests, checks).  
* **Notes / Alternatives** – Options considered and why they were rejected, plus any implementation notes.

This structure forces you to think through not just “what” but “why”, “so what”, and “how we keep it true”.

### ADRs vs. other documentation

ADRs are not design docs, RFCs, or tickets:

* **A design doc** often covers a bigger change with many moving parts; it may reference several ADRs.  
* **An RFC** is usually about reaching agreement; an ADR records the agreement once reached.  
* **A ticket** tracks work; an ADR tracks the decision the work is implementing.

Think of ADRs as the index of your architecture’s long-term bets. Other documents can be long and ephemeral; ADRs should be short and durable.

## Using ADRs in Practice

ADRs only work if they are easy to write, easy to find, and part of normal engineering flow.

### What deserves an ADR

You do not need an ADR for every trivial choice. Focus on decisions that:

* Affect key architecture characteristics (performance, reliability, security, scalability, modifiability).  
* Are hard or expensive to reverse (databases, core protocols, pervasive libraries, hosting models).  
* Impact many teams or services.  
* Change existing architectural boundaries or contracts.

A useful heuristic: if you would be unhappy discovering this change after the fact in production, it probably deserves an ADR.

### Where ADRs live and how to organize them

ADRs work best when they are:

* Stored in version control alongside the code they govern.  
* Plain text (for example, Markdown) to make editing and reviewing easy.  
* Collected in a single log per system or product, with stable IDs and links between related ADRs.

Common patterns include:

* A `/adrs` directory in the main repository.  
* Naming ADRs with incremental numbers and short titles.  
* Tagging or grouping ADRs by domain, subsystem, or concern.

The goal is for any engineer to be able to discover relevant decisions with a quick search.

### Writing effective ADRs

A good ADR is short, specific, and honest about trade-offs. In practice:

* Keep context focused on what materially influenced the decision (constraints, risks, requirements), not a project history.  
* Make the decision statement crisp enough that someone could check whether the system complies.  
* Be explicit about negative consequences and debts you are taking on—not just the benefits.

Avoid vague wording like “we will use microservices” without clarifying scope, boundaries, and what “microservice” means in your context.

### Connecting ADRs to architecture characteristics and views

Every architectural decision exists to support or balance specific characteristics: for example, “we use asynchronous messaging here to improve resilience and decouple workloads.” ADRs should:

* Name the characteristics they primarily serve (for example, performance, scalability, security).  
* Link to relevant architecture views (context, structural, deployment) where the decision is visible.

This makes it clear how decisions and models fit together and helps teams identify which decisions to revisit when characteristics shift.

### Governance: keeping decisions real

A decision written down but never enforced is just documentation theater. Effective ADR practice ties decisions to governance mechanisms:

* **Manual** – Architecture reviews, pairing, checklists in peer review.  
* **Automated** – Tests, static analysis, linters, fitness functions, policy checks in CI/CD.

For example:

* An ADR about API versioning might be enforced by automated tests that reject breaking changes without a new version.  
* An ADR about data residency might be enforced by policies that block deployments to disallowed regions.

When context changes, you either adjust enforcement or formally supersede the ADR. Status changes (“superseded by ADR-023”) keep the log honest.

## Common Pitfalls and How to Avoid Them

ADRs solve some problems but can create others if misused.

### Decision paralysis and over-engineering

It is easy to stall on “writing the perfect ADR” or to create heavy, formal documents for minor choices. Symptoms:

* Decisions are delayed because the ADR is not “ready”.  
* Nobody wants to write ADRs because they feel like bureaucracy.

Counter-move:

* Keep ADRs small and fast to write—aim for a page, not a report.  
* Treat them as snapshots of best current understanding, not immutable contracts.

You can always add more detail later or supersede them.

### Silver bullet and trend-following

ADRs can be misused to rubber-stamp fashionable choices (“we use microservices everywhere”, “everything event-driven”) without real analysis.

Avoid this by:

* Always listing plausible alternatives, including “do nothing”.  
* Tying the decision explicitly to the characteristics and constraints it serves.  
* Being honest in the consequences section about costs, risks, and complexity.

If you cannot articulate trade-offs, you are not ready to finalize the ADR.

### Not involving stakeholders

Architecture decisions made in isolation often miss crucial constraints or create friction later. An ADR written by a single person without input is a red flag.

Better practice:

* Involve relevant stakeholders (product, operations, security, affected teams) in the decision discussion.  
* Reflect that input in the context and consequences sections.  
* Use code review or architecture review as the approval mechanism for the ADR.

This increases buy-in and reduces surprises downstream.

### Ignoring reversibility

Some decisions are easy to change; others are one-way doors. Treating everything as reversible is dangerous; treating nothing as reversible is paralyzing.

In the ADR:

* Note how reversible the decision is and at what cost.  
* Prefer reversible or incremental steps when uncertainty is high.  
* Mark truly hard-to-reverse decisions with extra scrutiny and governance.

This helps future teams decide whether to challenge a decision or work around it.

## Summary

Architecture Decision Records turn your architecture from a pile of undocumented choices into a deliberate, traceable set of long-term bets. They capture context, trade-offs, and consequences in a form that is small enough to write often and structured enough to govern.

By writing focused ADRs for significant decisions, linking them to architecture characteristics and views, and backing them with real governance, you build an honest decision log instead of a mythology. That log is what lets your architecture evolve with clarity rather than drift on the inertia of forgotten choices.

## Recommended Reading

#### Books

* Richards, M., & Ford, N. (2020). *[Fundamentals of Software Architecture: An Engineering Approach](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)*. O’Reilly Media.  
  * **Chapter 19: Architecture Decisions**\
    Presents a structured approach to making and documenting architecture decisions, introduces ADRs, and highlights common decision anti-patterns and governance practices.
