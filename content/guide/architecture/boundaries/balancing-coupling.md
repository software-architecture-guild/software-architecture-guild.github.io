---
weight: 254
title: "Balancing Coupling"
description: "This article explains what balancing coupling is, combining strength, distance, and volatility to reason about stability, complexity, and cost of change."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Coupling is unavoidable, but pain from coupling is not. Systems hurt when the wrong parts are tightly connected across long distances and change all the time. This article shows how to balance coupling across three axes—strength, distance, and volatility—so you can reduce surprise, keep complexity local, and make change a controlled cost instead of a gamble.

## Why Balancing Coupling Matters

Balancing coupling is about deciding where you are willing to pay for shared knowledge and coordination. You can’t make everything loosely coupled without losing cohesion, and you can’t make everything tightly coupled without drowning in global complexity. Once you see coupling as three interacting dimensions, you can design seams that are stable enough, cheap enough to change, and modular enough that problems don’t spill everywhere.

### From “Less Coupling” to “Right Coupling”

The naive goal is “reduce coupling.” The realistic goal is more precise:

* Keep **strong coupling** where parts genuinely need to move together.  
* Keep **long distance** only where shared knowledge is small and stable.  
* Accept **high volatility** only behind seams that are carefully shaped.  

In other words, you want **contrast**: if one dimension is high, at least one of the others should be low. When strength, distance, and volatility are all high in the same place, you’ve built a hotspot for pain.

## Understanding the Three Axes

Balancing coupling assumes three dimensions that you already know from earlier work, but we’ll recap them briefly.

### Strength: How Much Knowledge Crosses the Boundary

Strength is about what knowledge crosses a boundary:

* At the weak end, you share only minimal data in **contract** form.  
* In the middle, you share rich **models** or functional behavior.  
* At the strong end, integration becomes **intrusive**: direct table access, scraped HTML, shared internals.  

High strength means changes in one side are more likely to force changes in the other, because more assumptions are shared.

### Distance: How Far That Knowledge Must Travel

Distance measures how much coordination you need to change both sides:

* Short distance: same class, module, or team with shared deploys.  
* Long distance: different services, repos, organizations, or vendors.  

Long distance doesn’t automatically mean bad design, but combining long distance with high strength makes every change a political and logistical project.

### Volatility: How Often Things Change

Volatility is how often you expect change:

* Low volatility: stable legacy systems, generic shared utilities, slow-moving regulations.  
* High volatility: core business rules, active experiments, brand-new capabilities.  

High volatility is not inherently bad; it just means you should be careful what it’s coupled to and how.

## Binary Lens: Simple Rules for Stability, Cost, and Modularity

Before using numbers, you can reason in a binary way: each dimension is either **high** (1) or **low** (0). That’s enough to get useful rules of thumb about stability, change cost, and modularity.

### Stability: Volatility vs Strength

Stability is about whether a relationship is likely to hold together without constant repairs.

* High volatility **and** high strength is the dangerous combo: something changes often, and many assumptions are shared.  
* If either one is low, you’re safer:  
  * Low volatility + high strength: tightly coupled but stable (classic legacy upstream).  
  * High volatility + low strength: lots of change, but little shared knowledge to break.  

You can summarize it as:

`STABILITY = NOT (VOLATILITY AND STRENGTH)`  

If both are high, stability is low; otherwise you’re okay.

### Change Cost: Volatility vs Distance

Change cost is about how much coordination and ceremony you need when something moves.

* High volatility **and** high distance means every change triggers cross-team, cross-system work.  
* If volatility is high but distance is low, teams can change together cheaply.  
* If distance is high but volatility is low, you rarely need to coordinate at all.  

As a rule:

`CHANGES COST = VOLATILITY AND DISTANCE`  

If both are high, expect expensive change.

### Modularity vs Complexity: Strength vs Distance

Modularity is about where complexity lives—locally or globally. Strength and distance combine like this:

* **High strength + low distance** → high cohesion: things that share a lot of knowledge are close together, so changes are local.  
* **Low strength + high distance** → loose coupling: distant things don’t share much knowledge, so they rarely have to change together.  
* **High strength + high distance** → global complexity: many assumptions shared across far-apart parts; coordination is hard.  
* **Low strength + low distance** → local complexity: unrelated things packed together; you’re not using proximity to reduce coordination.  

A useful mental rule:

*Contrast between strength and distance tends toward modularity; sameness tends toward complexity.*  

High–low or low–high: good. High–high or low–low: smells like trouble.

## Numeric Lens: Measuring Balance

Once you get the intuition, you can move from binary categories to a numeric scale from 1–10 for each axis. That lets you compare designs, rank hotspots, and capture “hand-wavy” feelings in a simple score.

### Scales for Strength, Distance, and Volatility

A practical scale might look like this:

* **Strength (1–10)**:  
  * 1–2: contract-level coupling (narrow DTOs, stable contracts)  
  * 3–5: shared models  
  * 8–9: functional coupling  
  * 10: intrusive coupling (direct DB access, scraping)  
* **Distance (1–10)**:  
  * 1: same object or class  
  * 3–4: same module or service  
  * 7–8: shared libraries, multiple services  
  * 9–10: different products, vendors, or organizations  
* **Volatility (1–10)**:  
  * 1: very stable legacy  
  * 3–4: supporting/generic capabilities  
  * 8–10: core or inferred core capabilities that change frequently  

The exact mapping is less important than being consistent across seams in your system.

### Modularity Score: Strength vs Distance

First, you compute how modular a relationship is in terms of strength vs distance:

`MODULARITY = |STRENGTH - DISTANCE| + 1`  

* If strength and distance are very different (big gap), modularity is higher.  
* If they are similar, modularity is low: either you have global complexity (high–high) or local clutter (low–low).  

A big difference says: “Either these things are close and deeply connected, or far and barely connected.” Both situations are easier to reason about than “deeply connected and far apart” or “barely connected but glued together.”

### Balance Score: Letting Volatility Compensate

Then you let low volatility compensate for poor modularity. Even a bad strength–distance combo might be acceptable if almost nothing ever changes there.

You treat low volatility as a second candidate score:

* `(10 - VOLATILITY + 1)` means: the more stable something is, the more it contributes to balance.  

Then you combine both:

`BALANCE = max(|STRENGTH - DISTANCE|, 10 - VOLATILITY) + 1`  

Interpretation:

* High balance score → seam is reasonably safe: either it’s modular, or it’s stable.  
* Low balance score → seam is both non-modular and volatile; that’s where you expect recurring pain.

### Maintenance Effort as a Mental Model

You can also think of **maintenance effort** as a product:

`MAINTENANCE EFFORT = STRENGTH * DISTANCE * VOLATILITY`  

Any dimension close to 1 can neutralize the others:

* Very low volatility: legacy upstream you rarely touch, even if coupling and distance are high.  
* Very low distance: one team owns both sides and deploys together, even if coupling and volatility are high.  

This isn’t a precise formula; it’s a reminder that you can often fix pain by turning just one knob.

## Rebalancing Coupling Over Time

Design is not a one-shot optimization; the system evolves, and your original bets about where change will happen go wrong. Balancing coupling is something you do again and again as you learn more about real change patterns.

### Tactical vs Strategic Change

Not all changes stress the system equally:

* **Tactical changes**: bug fixes, small features, minor refactors that fit existing boundaries. A healthy design should absorb these without rethinking coupling.  
* **Strategic changes**: new product lines, regulatory shifts, major capability overhauls. These can turn previously quiet seams into high-volatility hotspots.  

Strategic changes are where you usually need to rebalance strength, distance, or volatility.

### Choosing Which Knob to Turn

When a seam becomes painful, ask which dimension is easiest to change first:

* **Strength**: Can we share less knowledge? Move toward contract coupling, or split internal vs public models.  
* **Distance**: Can we bring ownership closer together, or reduce the number of teams and repos in the loop?  
* **Volatility**: Can we isolate the high-change part behind a stable interface so the rest of the system sees less churn?

Pick one lever, apply it deliberately, then re-evaluate. If local tuning isn’t enough, you may need a bigger structural move.

## Fractal Design: Same Rules at Every Level

Balanced coupling is fractal: the same ideas apply from methods to classes, from components to services, from services to systems. If boundaries follow the same rules at each level, the whole system grows in a predictable way.

### Self-Similarity Across Scales

You can treat any “thing” as a system of smaller things:

* A method has internal operations and external callers.  
* A class has methods and collaborators.  
* A component has classes and interfaces.  
* A system has components and external integrations.

The strength–distance–volatility lens works at each level. A method intertwined with a distant global variable is the same kind of problem as a service intertwined with a distant upstream vendor.

### Fractal Modularity

To keep complexity under control as you add features:

* Group elements by **responsibility and goal** at each level.  
* Ensure each boundary hides internal detail in the same way as the next level up.  
* Avoid “shallow” abstractions that leak internals and break the fractal pattern.  

If a boundary pattern would not work at the next scale up or down, it’s probably going to cause trouble as the system grows.

## Summary

Balancing coupling means treating strength, distance, and volatility as three independent dials instead of one fuzzy “tight vs loose” slider. You use simple binary rules to reason about stability, change cost, and modularity, then refine them with numeric scores to compare designs and locate hotspots. Over time, you rebalance those dials as real change patterns emerge, using the same principles at every level of your system.

You won’t remove coupling, and you don’t need to. The goal is to ensure that strong, long, and volatile relationships are rare and intentional, and that most seams either keep complexity local or sit in parts of the system that barely change.

## Recommended Reading

#### Books

* Vlad Khononov (2024). *[Balancing Coupling in Software Design](https://coupling.dev/)*. Self-published.  
  * **Chapter 10: Balancing Coupling**\
    Introduces the three-axis model and shows how to reason about stability, cost of change, and modularity using both binary logic and numeric scales.  
  * **Chapter 11: Rebalancing Coupling**\
    Explains how tactical and strategic changes can unbalance seams and how to restore balance by adjusting strength, distance, or volatility.  
  * **Chapter 12: Fractal Geometry of Software Design**\
    Describes how the same coupling rules apply at every level, keeping growth orderly when you repeat boundary patterns consistently.  
  * **Chapter 13: Balanced Coupling in Practice**\
    Provides case studies across microservices, patterns, domain objects, and methods to illustrate how balanced coupling looks in real codebases.  
  * **Chapter 14: Conclusion**\
    Summarizes the contrast between modularity and complexity and reinforces strength, distance, and volatility as core design lenses.
