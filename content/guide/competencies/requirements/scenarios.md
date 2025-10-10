---
weight: 1340
title: "Collecting Scenarios"
description: "This article explains how to collect and use scenarios."
icon: "article"
date: "2025-10-10T17:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

The fastest way to expose real rules, edge cases, and quality needs—without designing the solution.

## What is Scenario Collection?

Scenarios are short, concrete stories about work that respond to a business event. They show actors, triggers, steps, decisions, data touched, and outcomes, all written in stakeholder language. You collect them by **investigating the work**, not the current software: observe, apprentice, interview, and run workshops to walk through “a day in the life,” then capture a baseline path with named alternatives and exceptions.

## Why it matters?

Scenarios align everyone on *what the work really must do* and *why*, independent of today’s tools. They surface policies, business rules, interfaces, and qualities early enough to prevent costly rework.
**Trade-off:** More rigor (traceable, reviewed scenarios) increases shared understanding and testability but slows early momentum; very lightweight stories move faster but risk ambiguity and missed rules.

## How to do it

- **Anchor on business events.**\
Start from the *event list* (e.g., “Customer returns item”). Write one baseline scenario per event.\
*Quality tie:* completeness; *Risk tie:* scope gaps.

- **Apprentice before you ask.**\
Shadow real work and watch for handoffs and delays. Ask “show me” over “tell me.”\
*Quality tie:* accuracy; *Risk tie:* solution bias.

- **Separate essence from implementation.**\
Write the scenario “WHAT/WHY” first, then record “NOW/HOW” as a contrast.\
*Quality tie:* adaptability; *Risk tie:* fossilizing old constraints.

- **Use a consistent skeleton.**\
Name → Goal → Trigger → Preconditions → Numbered Steps (3–10) → Post conditions → Alternatives/Exceptions → Data/Rules → Stakeholders.\
*Quality tie:* testability; *Risk tie:* ambiguity.

- **Name alternatives intentionally.**\
Only capture branches the business **wants** (e.g., “Pay by invoice”). Keep each as a separate variant.\
*Quality tie:* usability; *Risk tie:* spaghetti flows.

- **Hold exceptions for after the happy path.**\
Add unwanted-but-inevitable deviations (e.g., “ID missing”) and show how flow rejoins.\
*Quality tie:* reliability; *Risk tie:* premature complexity.

- **Make rules explicit and testable.**\
Extract policies from steps (“Prioritize safety vehicles”). Add fit criteria (“allocate route ≤ 30s”). Trace rule → rationale → source.\
*Quality tie:* verifiability; *Risk tie:* vague adjectives.

- **Sketch when it helps.**\
Use simple diagrams (activity/BPMN-lite) to show parallelism or guards; never let lanes dictate design.\
*Quality tie:* shared understanding; *Risk tie:* notation overuse.

- **Capture data where it’s touched.**\
For each step, log inputs/outputs, states, and glossary terms.\
*Quality tie:* consistency; *Risk tie:* data mismatches.

- **Record provenance.**\
Store each atomic finding with originator, evidence (notes, photos), and uncertainty tags.\
*Quality tie:* traceability; *Risk tie:* audit gaps.

- **Probe qualities early.**\
Note performance, security, legal, and supportability right in the steps they matter; convert adjectives to numbers.\
*Quality tie:* nonfunctional clarity; *Risk tie:* late surprises.

- **Review in the room.**\
Run short workshops mixing roles to reconcile vocab and contradictions; time-box and park debate.\
*Quality tie:* alignment; *Risk tie:* meeting sprawl.

## Examples / Pitfalls

#### 1. Policy vs. Habit

**Summary:** Don’t encode yesterday’s workaround as tomorrow’s rule.
**Concrete pass:** In returns processing, a clerk says, “We always issue store credit on Fridays because finance is closed.” The baseline scenario states “Refund according to policy,” and the rule reads: “If payment method supports original refund and system connectivity is available, refund to original method; otherwise, issue credit.” Fridays are not a rule; connectivity is.
**Why it works:** Preserves *essence* and adaptability, avoiding accidental constraints (quality tie: maintainability).

#### 2. Happy path first, then turbulence

**Summary:** Stabilize the normal flow before adding exceptions.
**Concrete pass:** For “Approve loan,” the team first writes the 6-step approved case. Only after review do they add “Credit check service down” and “Applicant under 18,” each with clear rejoin points.
**Why it works:** Keeps *reliability* and *operability* visible without drowning in edge cases.

#### 3. Alternatives are choices, not chaos

**Summary:** Variants are wanted options; keep them separate to avoid tangled flows.
**Concrete pass:** In “Book seat,” the baseline auto-assigns the best seat. Two named alternatives—“Choose seat on map” and “Use saved preference”—are located under their respective steps, each with its own acceptance hints.
**Why it works:** Improves *usability* and keeps reviews crisp (risk tie: spaghetti avoidance).

## Conclusion

- Start from **events**, not features; one event → one baseline scenario + named variants.
- **Watch the work** first; collect evidence, not opinions.
- **Write essence**, then note current implementation—don’t cement old constraints.
- Use a **repeatable template** and keep steps short and numbered.
- Turn **adjectives into fit criteria** and **rules into tests**—trace every rule to its source.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional, 2012.
  - **Chapter 5: Investigating the Work**\
    Why investigate: study the work—not the current system—to uncover policies, rules, events, outcomes, and measurable goals. How to prepare and collect evidence: pick a Business Use Case slice, plan sessions, apprentice and observe real tasks, run focused interviews and mixed-role workshops, and record atomic findings with provenance. Use scenarios, lightweight models, and the Brown Cow lens (NOW/HOW vs WHAT/WHY) to separate essence from implementation, surface quality attributes early, and avoid tool-driven bias.
  - **Chapter 6: Scenarios**\
    What a scenario is: a small, plain-language story of the work responding to a business event, showing actors, steps, decisions, data, and outcomes. How to apply: scale formality to risk; start from events/BUCs; write the happy path, then add named alternatives and exceptions; keep essence before implementation; diagram only when helpful; probe “what if?” ideas and harmful/misuse paths. Use a consistent template (Name, Goal, Trigger, Preconditions, Steps, Post-conditions, Alternatives/Exceptions, Data/Rules, Stakeholders) and trace Event ↔ Scenario(s) ↔ Rules/Data ↔ Requirements/Tests.
