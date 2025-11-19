---
weight: 208
title: "Domains Evolution"
description: "This article explains how domains, subdomains, and designs evolve over time, and how to adapt your domain, context, and implementation decisions as strategy, knowledge, and organization change."
icon: "article"
date: "2025-11-14T08:34:36+02:00"
lastmod: "2025-11-14T08:34:36+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

## Introduction

Your first domain model is a snapshot of how you understood the business at one moment in time. Strategy changes. Markets shift. Teams grow and split. Yet most architectures are treated as if yesterday’s decisions should hold forever.  

> **Domain evolution is about accepting that change is the rule, not the exception—and making your subdomains, bounded contexts, and tactical patterns easy to move as reality shifts.**

### Why domains can’t stay frozen

We like to think “core, supporting, generic” is a one-time classification. It isn’t.  

As the business changes, so does what truly differentiates you:

* A feature that was once pioneering becomes commodity.  
* A boring back-office area becomes your new strategic bet.  
* Cost pressures make “build” suddenly worse than “buy,” or the other way around.

If your architecture doesn’t follow these shifts, you get:

* Heavyweight modeling and custom code in areas that no longer matter.  
* Strategic work stuck on top of old “generic” platforms.  
* Teams and contexts optimized for yesterday’s priorities.

Design follows strategy, not the other way around.

## Reclassifying subdomains as strategy moves

Subdomain types are **strategic labels**, not badges of honor. You should be willing to re-label them as soon as the business reality changes.

Typical moves:

### Core → Generic

This happens when:

* Competitors have fully caught up on a capability.  
* Your customers no longer see it as a reason to choose you.  
* Vendors now offer that capability cheaper and better than you can.

What to do:

* Stop investing in deep modeling and highly bespoke implementations.  
* Look for off-the-shelf or platform options.  
* Treat the domain as something you integrate with, not something you differentiate on.

Emotionally, this is hard—“our core” often has internal prestige. But hanging onto it burns your best architects on non-differentiating work.

### Generic → Core

The inverse: an area you once saw as “commodity” suddenly becomes where you win:

* You spot a new market that depends on it.  
* Your selling story shifts (“we’re not just a tool, we’re an analytics company”).  
* Competitors are weak there, and customers notice.

What to do:

* Elevate it to core in your domain map.  
* Pull modeling and architecture talent into it.  
* Break it out into its own bounded contexts instead of leaving it buried inside others.

If you don’t promote it, your “core” lives in slides, not in the structure of the system.

### Supporting shifts

Supporting subdomains can move in both directions:

* **Supporting → Core** when their behavior becomes part of your unique promise (e.g., “our support and resolution flows are the product”).  
* **Supporting → Generic** when you can safely outsource or buy them (e.g., you adopt an off-the-shelf billing system).

Each reclassification should trigger design questions:

* Do our bounded contexts still line up with this new type?  
* Are we using the right integration patterns with upstream/downstream systems?  
* Are we investing the right level of effort and autonomy here?

If your domain map doesn’t change for years, it’s probably out of date.

## Strategic design: evolving contexts and relationships

Strategic design decisions are the slow, structural ones: where you draw bounded context boundaries and how those contexts relate.

You should regularly ask:

* Does our current context map still reflect reality?  
* Have any upstream/downstream relationships flipped?  
* Have we silently drifted from partnership into a strained customer–supplier relationship?

Typical shifts:

* A partnership between two teams becomes customer–supplier when they land in different org units or time zones. You may need to move from informal collaboration to clear contracts, ACLs, and published languages.  
* A supplier that used to be stable starts shipping breaking changes. You might add anti-corruption layers where you previously conformed.  
* A “shared kernel” grows into an all-purpose dumping ground; shrinking or splitting it can restore autonomy.

> **Strategic design is not “set once in a workshop.” It’s a repeated activity: compare your context map to how people actually work now and adjust.**

## Tactical design: evolving implementation patterns

Tactical patterns—Transaction Script, Active Record, Domain Model, Event Sourcing—should also evolve. They are not religion; they are phases.

You often see this path:

### Transaction Script → Active Record

You start with Transaction Script for a small, linear area:

* A simple use case.  
* A couple of checks.  
* One or two tables touched.

Then complexity accretes:

* Several scripts manipulate the same data.  
* Business rules duplicate between them.  
* Changes require editing multiple places.

At this point, moving to Active Record can help:

* Bring related behavior onto the same “record-centric” object.  
* Eliminate obvious duplication.  
* Keep it data-centric but less scattered.

> **This is still fine for relatively simple domains—especially supporting or generic ones.**

### Active Record → Domain Model

Eventually, you hit the limits:

* You need invariants across multiple fields and associated records.  
* You’re juggling multiple states and transitions.  
* Conditionals multiply and correctness becomes fragile.

Now you need a Domain Model:

* Identify aggregates and their invariants.  
* Encapsulate state changes behind clear methods.  
* Treat entities and value objects as first-class citizens.

> **You don’t rewrite everything. You move just the complex parts to a rich model, leave the rest in simpler patterns, and accept that your system can host multiple styles at once.**

### Domain Model → Event-Sourced Domain Model

Even a great state-based domain model sometimes isn’t enough:

* The business needs auditability (“who changed what, when?”).  
* You need to reason over history (“how did we get here?”).  
* Rules depend on sequences of events, not just current state.

Then event sourcing becomes attractive:

* The domain model emits domain events as the source of truth.  
* State is rebuilt by replaying events or from snapshots.  
* New projections (for analytics, read models, regulatory reports) can be added later.

> **You pay with more complex infrastructure and migration concerns. So you should evolve only the domains where history truly matters—not the whole codebase.**

## Migrating to event sourcing

Migration is where event sourcing usually gets painful. You have to answer: “How do we get from today’s state tables to event streams?”

Two broad strategies:

### Reconstructing “recovered” events

You look at current state and generate synthetic events backwards:

* For each entity, create events that approximate how it got here (“OrderCreated”, “OrderCompleted”).  
* Use these to initialize streams.  
* From now on, real domain events take over.

Pros:

* You can bootstrap without touching old logs.  
* Existing behavior keeps working.

Cons:

* You don’t get true history; you only get a plausible story from the final state.  
* If you treat it as real history, you’ll make wrong assumptions later.

Use this when you need event streams mainly for forward-looking behavior (e.g., new projections), and you can live with shallow history.

### Explicit migration events

The more honest approach:

* For each legacy record, write a single migration event (“PolicyMigratedFromLegacy”).  
* From that point on, real domain events record the true evolution.  

Pros:

* The ledger tells the truth: “we don’t know how we got here before this point.”  
* Projections can treat migration events specially.

Cons:

* You carry migration events in projections and logic forever.  
* It’s more work up front.

Use this when audits, correctness, and transparency matter more than having a clean stream schema.

## Organization changes force design changes

Your architecture reflects your org. When the org changes, pretending the system can stay still is fantasy.

Examples:

* A previously tight partnership between two contexts is split across locations. Communication slows down; you need clearer contracts and maybe separate release trains.  
* A once-aligned customer–supplier relationship becomes toxic: upstream ignores downstream needs, downstream hacks around it. At some point, Separate Ways (duplication, decoupling) is cheaper than constant friction.  
* New reporting and compliance requirements force new read models that cross multiple contexts.

If you don’t revisit your context map and integration patterns as the org moves, teams will create shadow integrations, copy-paste code, and local workarounds. Architecture debt becomes organizational debt, visible in slow delivery.

## Evolving with domain knowledge

Domain knowledge is not static:

* You learn new rules and edge cases.  
* Old assumptions become wrong.  
* People leave, and the knowledge in their heads vanishes.

You should design for this:

* When knowledge is low, use broader bounded contexts so you don’t artificially freeze the wrong boundaries.  
* As language and rules stabilize, split contexts and refine aggregates.  
* When knowledge is lost, use EventStorming, scenario workshops, and artifact mining to rebuild understanding instead of blindly copying old code.

If models and boundaries don’t change as knowledge deepens, your code will keep reflecting your first misunderstanding of the domain.

## Growth without “big ball of mud”

Growth is good—more features, more users, more value. But every growth step adds complexity. The job is to keep that complexity accidental, not structural.

### Subdomains

Signals to watch:

* A subdomain now hosts several unrelated problem areas.  
* Use cases and policies inside it have diverged a lot.  

Actions:

* Split the domain into clearer subdomains based on coherent use cases and shared data.  
* Promote the parts that carry differentiation; demote or simplify the rest.

### Bounded contexts

Signals to watch:

* A context has become the “misc” service for anything that doesn’t fit elsewhere.  
* It’s chatty with half the system, coordinating many workflows.  

Actions:

* Slice out coherent clusters of behavior into new contexts.  
* Tighten the mission of each context so it can evolve independently.

### Aggregates

Signals to watch:

* Aggregates are doing too many jobs: their invariants cover unrelated rules.  
* A single change always touches the same huge aggregate, even for simple cases.  

Actions:

* Re-express invariants and find smaller boundaries.  
* Extract new aggregates around specific invariants and workflows.

Continuous pruning beats big rewrites. The earlier you respond to these signals, the less “big ball of mud” you accumulate.

## Making evolution intentional

Most teams “evolve” architecture only when something breaks. You can do better by making evolution explicit.

Practical moves:

* Add a regular review cadence: once or twice a year, revisit subdomain classifications, context map, and key tactical patterns.  
* Log strategic decisions as Architecture Decision Records (ADRs) so you remember why you chose a pattern and when to re-evaluate it.  
* Define a few fitness functions (tests or monitoring signals) tied to key goals—time-to-change in a core domain, coupling metrics, cycle time across contexts.

The goal is not to predict every change. It’s to make changing your mind cheap.

## Summary

Domains evolve because strategy, markets, organizations, and knowledge evolve. If your architecture pretends otherwise, it slowly drifts away from the business it’s supposed to serve.  

You can stay aligned by reclassifying subdomains as strategy shifts; redrawing bounded contexts and integration patterns as team relationships change; evolving tactical patterns along a path from scripts to rich models to event sourcing; and continuously pruning subdomains, contexts, and aggregates as the system grows.  

Change isn’t a failure of your original design—it’s the environment doing its job. Your job is to make sure the design can follow.

## Recommended Reading

#### Books

* Khononov, V. (2021). *[Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)*. O’Reilly Media.
  * **Chapter 11: Evolving Design Decisions**\
    Explores how changes in strategy, domain classification, knowledge, and organization should drive reclassification of subdomains, evolution of tactical patterns, and adjustments to bounded contexts and integration models.
