---
weight: 207
title: "Discovering Domains and Contexts"
description: "This article explains how to discover business domains and bounded contexts using knowledge crunching, EventStorming, and other collaborative techniques that turn messy reality into actionable models."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

## Introduction

Domain-Driven Design only works if you actually understand the domain you’re driving from. That sounds obvious, but most teams still jump from high-level requirements straight into diagrams and services.  

Discovering domains and contexts is the missing step: a set of collaborative practices that turn tacit expert knowledge into explicit models, language, and boundaries you can safely build on.

### Why domain discovery is a separate skill

You can’t reason your way to a good model from your desk. Real domains are full of competing goals, exceptions, and unwritten rules. If you treat “requirements gathering” as a one-off phase, you’ll ship a system that reflects the loudest stakeholder, not the real business.  

DDD treats domain discovery as its own skillset:

* Knowledge crunching instead of requirement handoff.  
* Direct collaboration between devs and domain experts.  
* Continuous refinement instead of frozen specs.  

The question is not “do we understand enough to start coding?” but “how do we keep learning while we code?”

## Knowledge crunching: turning talk into models

“Knowledge crunching” is just a fancy name for doing the hard work of thinking **with** domain experts, not about them.  

Core ideas:

* Work shoulder-to-shoulder with experts using real scenarios, not rely solely on presentations.  
* Use whiteboards, sticky notes, and concrete examples to force clarity.  
* Aim to separate what’s salient (rules, decisions, outcomes) from noise (implementation trivia, personal preferences).

You’re not trying to capture everything: you’re crushing a messy pile of stories, policies, and workflows into something structured enough to design around.

### Stakeholders, domain experts, and BAs

Not everyone who has opinions about the system is a domain expert.

* **Stakeholders** talk about goals and outcomes (“reduce churn”, “speed up onboarding”).  
* **Domain experts** know how the work actually gets done—edge cases, shortcuts, real constraints.  
* **Business analysts** can help facilitate and structure conversations, but they must not become a wall between devs and experts.  

You want developers in the room when modeling decisions are made. Second-hand knowledge decays fast.

### Discovery is not a phase

Domain understanding is never “done”:

* Early models will be wrong; that’s fine.  
* New regulations, products, and org changes will invalidate pieces of your model.  
* Discovery continues through the whole product life, not just at project kickoff.  

Treat discovery as an ongoing practice: regular sessions with experts, visible models that you update, and code that evolves with the language.

## Shared language as the main deliverable

The most important artifact of discovery is not a diagram, it’s a **Ubiquitous Language**: the set of domain terms everyone uses consistently in conversations, docs, and code.  

You know it’s working when:

* Domain experts can read tests and say “yes, that’s how we talk about it.”  
* Code names (classes, methods, events) match the phrases used in workshops.  
* Ambiguous or overloaded words get split into sharper concepts as understanding grows.

The language should be:

* **Explicit** — captured in glossaries, examples, scenarios.  
* **Evolving** — you rename aggressively when you find a better concept.  
* **Scoped** — each bounded context gets its own precise vocabulary.

If your “model” doesn’t change how people speak about the work, you’ve just produced another drawing.

## Techniques for distilling the problem domain

You don’t discover domains and contexts by guessing; you use repeatable techniques to direct the conversation.

### Focus on hot spots, not everything

You don’t have infinite time with experts, so spend it where it matters:

* Follow the money, risk, and pain: where are the biggest costs, delays, or errors?  
* Chase disagreements and edge cases; that’s where the real rules hide.  
* Timebox low-impact areas and park them for later.  

If the conversation is too smooth, you’re probably working on somewhere that doesn’t drive the business.

### Start from real use cases

Abstract talk is cheap. Instead:

* Walk real scenarios end to end (“a customer signs up, fails KYC, appeals, gets manually approved…”).  
* Ask “what happens next?” until people run out of answers.  
* Pull out decisions (“who decides?”, “based on what?”) and invariants (“this must never happen”).  

Let behaviors drive the model. Data structures come later.

### Ask better questions

Good questions expose policies; bad ones produce vague answers.

Useful patterns:

* “What must be true before this can happen?”  
* “What do you never allow?”  
* “What do you do when X and Y conflict?”  
* “Can you recall the last time this went wrong? What happened?”  

If you keep getting “it depends,” you haven’t found the underlying rule yet.

### Mine existing artifacts

A lot of domain knowledge is frozen in paper and tools:

* Forms, checklists, spreadsheets, ticket templates.  
* Logbooks, exception reports, audit trails.  

Reverse-engineer them:

* Each field or checkbox is a hint about a decision, constraint, or event.  
* Each manual approval step is a signal: the rule wasn’t clear enough to automate.  

You’re not trying to copy the current process, but you also don’t want to ignore what it’s teaching you.

### The model exploration whirlpool

Discovery follows a loop, not a straight line:

1. Propose a model (even if rough).  
2. Try it against real examples and edge cases.  
3. Notice where it breaks or feels awkward.  
4. Refine the language and structure.  
5. Update code and diagrams.  

You’re not failing when a model breaks; that’s the point. The faster you spin this whirlpool, the better your eventual model becomes.

## EventStorming: fast discovery in a room

EventStorming is DDD’s favorite power tool for discovery: a low-tech workshop where a group maps a business process using colored sticky notes on a long wall.  

At its core:

* Work on a single business process at a time.  
* Start from domain events written in past tense (“Order Shipped”, “Payment Failed”).  
* Add commands, actors, policies, read models, external systems, and aggregates as the story fills out.

### Who should be in the room

You want a diverse but small group:

* Domain experts from operations, product, support, etc.  
* Engineers who will actually build/maintain the system.  
* QA/UX if they’re close to the flows.  

Aim for roughly 6–10 people on site; too few and you miss knowledge, too many and half the room goes silent.

### Setting up the space

The environment matters more than the tooling:

* A long, uninterrupted wall or board with paper across it.  
* Lots of sticky notes in different colors; thick markers for everyone.  
* Standing room, minimal chairs, no big central tables to hide behind.  

Supplies should never be the bottleneck. The goal is to make ideas move faster than you can tidy them.

### The EventStorming flow (in plain language)

You can think of the 10 steps as three phases.

**1. Understand what happens**  

* Brainstorm all the **events** that can happen in the process, in past tense.  
* Arrange them into a **timeline**: happy path first, then branches and exceptions.  
* Mark pain points and unknowns so you don’t lose them.  

**2. Understand who and what drives it**  

* Add **commands**: the actions that trigger those events (“Submit Order”).  
* Add **actors**: humans or systems that issue the commands.  
* Add **policies**: rules like “When PaymentFailed and user is VIP, trigger ManualReview”.  
* Add **read models**: what information someone needs to see before they act.  

**3. Shape the model**  

* Identify **aggregates**: groups of commands/events that belong together for consistency.  
* Look for **pivotal events** that mark phase changes (“Order Confirmed”, “Policy Bound”)—they often signal domain or context boundaries.  
* Cluster aggregates into candidate **bounded contexts** based on policy coupling and cohesion.  

You don’t have to follow the cookbook exactly. The real value is making the process visible, not drawing perfect boxes.

### Big-picture vs focused sessions

Two common moves:

* **Big-picture EventStorming** — you run a wide session over an entire domain or product journey to find major flows, pivots, and pain points (often using only events, timelines, and problems).  
* **Process-level EventStorming** — you zoom into one critical process (e.g., “Debt Collection”) and run the full 10 steps to feed design.  

A good pattern is: big picture once, then multiple focused sessions on the core flows.

### Remote EventStorming

Remote workshops are harder but doable:

* Use a digital whiteboard.  
* Keep groups smaller (~5 people), and run multiple sessions instead of one huge one.  
* Merge boards afterward and recap with the whole group so the model doesn’t fork.  

You lose some spontaneity versus a real wall, so you compensate with facilitation: clear legend, strict turn-taking, visible parking lot.

## From events to domains and contexts

Events and timelines are not just pretty; they’re signals.

Patterns to watch for:

* Pivotal events that mark clear phase changes (“Application Approved”, “Policy Cancelled”). These often separate subdomains or bounded contexts.  
* Areas dense with pain points and manual work—good candidates for core or complex supporting subdomains.  
* Clusters of commands/events that share policies and invariants—likely aggregates and early context candidates.  
* Events that mention external systems—likely integration seams where context boundaries will land.

You can overlay your EventStorming board with:

* Subdomain labels (core/generic/supporting).  
* Candidate bounded context names.  
* Notes about upstream/downstream relationships to feed a context map later.

The board is where the problem space and solution space first meet.

## Using discovery results in architecture

Domain discovery and EventStorming are not design theater; they feed directly into architecture work:

* You get a clearer **domain/subdomain map** to guide where to invest modeling effort.  
* You identify candidate **bounded contexts** and integration seams.  
* You sharpen the **ubiquitous language** that will show up in your code, events, and APIs.  
* You find the **risky workflows** where patterns like sagas, outbox, or event sourcing might pay off.

The point is not to emerge with a perfect blueprint. It’s to reduce the number of unknowns before you commit to costly structural decisions.

## Summary

Discovering domains and contexts is about replacing guesswork with structured learning. You crunch knowledge collaboratively with real experts, build a shared language, and use techniques like scenario modeling, artifact mining, and EventStorming to expose flows, rules, and boundaries.  

From there, domains and subdomains become clearer, bounded contexts emerge from the work instead of being imposed top-down, and your architecture has a fighting chance of matching how the business actually functions—today and as it evolves.

## Recommended Reading

#### Books

* Khononov, V. (2021). *[Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)*. O’Reilly Media.
  * **Chapter 12: EventStorming**\
    Explains how to run big-picture and process-level EventStorming sessions, turning domain events and flows into concrete subdomains and candidate bounded contexts.
* Millett, S., & Tune, N. (2015). *[Patterns, Principles, and Practices of Domain-Driven Design](https://www.wiley.com/Patterns%2C%2BPrinciples%2C%2Band%2BPractices%2Bof%2BDomain%2BDriven%2BDesign-p-9781118714706)*. Wrox/Wiley.
  * **Chapter 2: Distilling the Problem Domain**\
    Shows how to separate core and supporting concerns, crunch knowledge with experts, and use language and scenarios to carve out domains and subdomains.
* Brandolini, A. (n.d.). *[Introducing EventStorming](https://www.eventstorming.com/book/)*. Leanpub.  
  * **Core chapters on EventStorming practice**\
    Provides a practitioner’s guide to designing and facilitating EventStorming workshops, with concrete patterns, anti-patterns, and facilitation tips.
