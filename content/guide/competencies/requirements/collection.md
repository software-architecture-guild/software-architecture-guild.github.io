---
weight: 1320
title: "How to Collect Requirements?"
description: "This article explains how to gather requirements."
icon: "article"
date: "2025-10-10T17:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

A fast, practical way to discover what’s needed—before you build—so you hit value, not just velocity.

## What is “collecting requirements”?

Structured discovery. You’re not transcribing wishes; you’re uncovering the work’s policy, the events that trigger it, and the product’s responsibilities. Stay technology-neutral until design time, but capture **what** the product must do and **how well** —both measurable and testable.

It fits any delivery method. Run a light loop: scope → learn the work (events/BUCs) → decide product responsibilities (PUCs) → write testable requirements → gate for quality → reuse/review → hand to dev. Iterate thin slices and keep traceability (Event → BUC → PUC → requirement → test).

## Why it matters?

Because owner value is the point. Frame benefit, cost, and risk early so you deliver outcomes, not shiny demos. That keeps discovery honest and aligned with what the payer actually needs.

Because unmanaged risk burns sprints. Scenarios and fit criteria surface gaps and non-functional traps before they explode in delivery. When qualities are measurable, they’re testable—and surprises stay small.

Because quality must be intentional, tie usability, performance, security, and operability to the exact scenarios where they matter. Put numbers where the work bites, not adjectives at the end.

Because speed without judgment is a waste. Make the trade-off explicit: be as informal as you can, as formal as you must. Let risk, regulation, and outsourcing decide the ceremony—not habit.

## How to do it

- **Run a Project Blastoff:**\
Purpose, scope, stakeholders, constraints, **go/no-go**. Output: context + stop-rules.\
*Quality tie:* reduces creep; aligns to value.

- **Organize by Business Events:**\
List external triggers (incl. time). Partition into **BUCs**.\
*Quality tie:* coverage + traceability.

- **Trawl, don’t ask:**\
Interviews, apprenticing, workshops, doc digs. Treat statements as clues; extract **rules** and **data**.\
*Quality tie:* correctness, consistency.

- **Sketch quick models:**\
Context/flows/data to unblock decisions. Prefer throwaways.
*Risk tie:* cheap learning.

- **Walk Scenarios:**\
For each event/BUC, write main/alt/exception paths. Derive **PUCs**.\
*Quality tie:* edge cases → acceptance tests.

- **Write atomic requirements:**\
Separate **FRs** from **NFRs**. Use Snow Card attributes (description, rationale, originator, fit criterion, priority, conflicts, history).\
*Quality tie:* testable, traceable.

- **Attach fit criteria:**\
Numbers beat adjectives (e.g., p95 < 200 ms, SUS ≥ 75).\
*Quality tie:* verifiable acceptance.

- **Gate with a Quality Gateway:**\
Check scope, clarity, consistency, feasibility, testability, and vocabulary. Reject or rework.\
*Risk tie:* defect prevention.

- **Reuse on purpose:**\
Pull/adapt proven requirements and NFR catalogs. Maintain a reuse library.\
*Quality tie:* consistency; fewer omissions.

- **Iterate as slices:**\
Prioritize by **value + uncertainty**. Pull risky NFRs forward (perf, security, integration). Write just-in-time to test this slice.\
*Quality tie:* evidence-driven learning.

- **Measure “done” with evidence:**\
Fit-criteria pass rates, risks retired, stakeholder outcomes achieved. Feed into the next plan.

## Examples / Pitfalls

#### 1. Chain it end-to-end

**Summary:** Connect **Event → Scenario → Requirements → Fit criteria → Test** so nothing falls through the cracks.

**Concrete pass:** Imagine an online retailer. A **customer submits a return request** —that’s your event. The **scenario** describes what follows: the system validates the order, checks eligibility, and issues a return label. From this flow, you derive the key **requirements**: verify the order ID against purchase history, confirm the return window is ≤ 30 days, and generate a prepaid label within one minute. Add the **fit criteria**: validation accuracy 100%; p95 label generation < 60 seconds; confirmation email delivered within two minutes. Finally, the **test**: when a valid request is given, the customer receives a label and confirmation within those time bounds.

**Why it works:** The chain links behavior, quality, and verification. Nothing is vague, and completeness can be inspected by coverage, not volume.

#### 2. Policy vs. Habit

**Summary:** Separate durable **policy** from today’s **habit** before you encode behavior.

**Concrete pass:** A finance team insists, “We export invoices to Excel and manually round tax totals.” Instead of automating that ritual, you ask whether this is a legal requirement or a temporary shortcut. If it’s a **policy**, you name and enforce it (e.g., “rounding follows Regulation 12.4, nearest cent, always shown in summary line”). If it’s a **habit**, don’t enshrine it: implement correct rounding logic in-system and deprecate manual edits. Keep an export for audits, but remove the spreadsheet dependency.

**Why it works:** You implement what the business truly needs, not what current tools force them to do. Rules stay clean; workarounds fade out.

#### 3. Adjectives without numbers

**Summary:** Replace “fast/intuitive/secure” with measurable, scenario-bound targets.

**Concrete pass:** A user logs into a healthcare portal to view lab results. Instead of saying “the page must load quickly and be easy to use,” you make it measurable: p95 page load ≤ 2 seconds under 500 concurrent users; 90% of patients locate results within 15 seconds without help; all access uses multi-factor authentication, and unauthorized attempts are locked after three failures. Now usability, performance, and security are concrete, observable, and testable.

**Why it works:** Numbers turn intentions into evidence. When qualities are explicit, teams can design, test, and monitor against them—no arguments, no guessing.

## Conclusion

- **Start with the work.** Events and scenarios anchor completeness and traceability.
- **Write to be tested.** Every requirement carries a fit criterion and rationale.
- **Guard the gate.** A single quality gateway prevents expensive ambiguity.
- **Iterate thin, risky first.** Stage requirements: learn from honest feedback.
- **Right-size formality.** Standards stay; ceremony scales with risk.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional, 2012.
  - **Chapter 2 — The Requirements Process**  
    A practical discovery loop that plugs into any delivery method: start with Project Blastoff (purpose, scope, stakeholders, constraints), organize by business events and trawl for real rules, sketch quick models, walk scenarios to derive Product Use Cases, and write atomic, testable requirements with fit criteria. Guard quality with a gateway, reuse proven requirements, run focused reviews, iterate in thin slices, keep artifacts lean (Volere template, Snow Card), tailor formality to risk, and treat the process as a toolkit—not dogma.
  - **Chapter 14 — Requirements and Iterative Development**  
    The iterations stage discovery doesn’t replace it. Plan slices by value and risk, write requirements just-in-time at the depth needed to test, and use scenarios as the spine from stories to acceptance. Time-box spikes/prototypes to answer one risky question, maintain a lightweight quality gateway, make changes visible and re-prioritize, store living documents for team access, and close the loop each sprint with evidence (fit-criteria pass rates, risks retired, outcomes achieved).
  - **Chapter 17 — Requirements Completeness**  
    “Complete” means sufficient, measurable, and traceable coverage—no vital gaps or contradictions. Define stop-conditions, enumerate external events (including time), and ensure each has scenarios, requirements, and tests; maintain a simple Event ↔ Scenario ↔ FR/NFR ↔ Test matrix. Attach quantified NFRs where they bite, make rules and data explicit with owners, specify interfaces and ops behaviors, preserve consistent vocabulary and traceability, conduct short inspections per use case, and scale ceremony to regulation and outsourcing needs.
