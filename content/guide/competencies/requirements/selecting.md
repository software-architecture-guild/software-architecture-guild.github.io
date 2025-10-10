---
weight: 1350
title: "Selecting Requirements"
description: "This article explains how to distinguish good requirements from bad."
icon: "article"
date: "2025-10-09T18:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Selecting requirements is the act of deciding **what** to build—anchored in the **business situation you’re trying to change**, not today’s toolset. You describe the current way of working, the pain it causes, and the advantage you want—independent of any solution. From that essence, you pick product responsibilities that actually matter.

In practice, you separate **symptoms** (slow, error-prone, expensive) from **causes** (rules, data, handoffs, constraints), define measurable outcomes, and only then choose the pieces that become product behavior.

## Why it matters?

Good selection shrinks the scope, lowers ambiguity, and makes testing real. It protects you from shipping elegant features that don’t solve the owner’s problem. Poor selection does the opposite: infinite backlogs, UI bike-shedding, and “requirements” that are just design guesses.

**Explicit trade-off:** depth of discovery vs. iteration speed. Go too shallow and you chase symptoms; go too deep and you stall delivery. Find the smallest slice of understanding that yields **testable goals** and **stable rules**, then iterate.

## How to do it

- **Write the problem in plain language.**\
One paragraph that names the current workflow, the pain, and the desired advantage—no UI, no tools.\
*Risk tie:* misalignment.

- **Trace symptoms to causes.**\
Ask “why?” until you hit a policy, rule, data definition, handoff, or constraint. Validate with real cases.\
*Risk tie:* treating symptoms.

- **State the essence before the implementation.**\
Capture “what must happen” and “why it matters.” Park “how we do it now” for later.\
*Quality tie:* adaptability.

- **Bound the work with a simple context.**\
Draw the work, the external parties/systems, and the named interfaces/events. This is your scope contract.\
*Risk tie:* scope creep.

- **Make success measurable.**\
Pair every goal with a fit criterion (units, threshold, event) and an accountable owner.\
*Quality tie:* testability.

- **Separate policies from procedures.**\
Record rule text, source, and rationale. Challenge habits born of old constraints.\
*Quality tie:* correctness.

- **Map essence → product responsibilities.**\
Decide which parts become part of the product behavior versus remain in the business. Show the trace.\
*Quality tie:* traceability.

- **Ideate only after measures exist.**\
Run “what if” changes (remove a handoff, automate a rule, reorder work) and keep each idea linked to a goal/policy.\
*Risk tie:* gold-plating.

- **Continuously review wording for testability.**\
Replace adjectives (“fast,” “intuitive”) with measurable fit criteria tied to real events/data.\
*Quality tie:* un-ambiguity.

## Examples / Pitfalls

#### 1. Policy vs. Habit

**Summary:** Don’t encode yesterday’s workaround as tomorrow’s rule.  
**Concrete pass:** In a retail returns flow, staff insist on “manager approval for all returns” because the old POS couldn’t check fraud patterns. Essence work reveals the real policy: “Returns over $200 or flagged by risk score require escalation.” The product implements automated risk scoring and conditional approval, rather than a blanket manual step.  
**Why it works:** It preserves **policy** while removing legacy **procedure**, improving **throughput** and **usability** without violating **risk controls**.

#### 2. Fast vs. Fit criterion

**Summary:** Vague qualities are untestable; quantify them.  
**Concrete pass:** A healthcare portal asks for “fast appointment search.” Team rewrites as: “Return available slots across three clinics within **2 seconds (p95)** for the last search; support **10 concurrent users per clinician** during peak 08:00–09:00.” Load tests and capacity planning become straightforward; stakeholders sign off on what “fast” means.  
**Why it works:** It turns aspiration into **measurable performance**, reducing **ambiguity risk** and enabling **operability** planning.

#### 3. Scope boundary drift

**Summary:** If the context boundary moves, requirements quality evaporates.  
**Concrete pass:** In a logistics project, early diagrams show “Carrier Settlement” outside the scope. Mid-project, a feature appears to “export invoices to carriers.” Team halts and updates the context: either bring Settlement inside (with owners, rules, events) or keep it out and formalize the interface contract. They pick the latter and define an “Approved Shipment Ledger → Carrier Settlement API” with versioned fields and SLAs.  
**Why it works:** It defends **scope** and clarifies **interfaces**, reducing integration **failure risk**.

## Conclusion

- **Start with essence.** Describe the work and the advantage in plain language; postpone design.
- **Measure everything that matters.** Goals without fit criteria are opinions.
- **Draw the boundary.** Context and interfaces are your scope contract.
- **Respect policies, challenge habits.** Keep rules; modernize procedures.
- **Trace selection.** Show how each product responsibility solves a measured problem.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional, 2012.
  - **Chapter 7: Understanding the Real Problem**\
    Focus on defining the business situation before selecting features: describe the current work, pains, and desired advantages. Separate symptoms from causes by tracing to rules, data, handoffs, and constraints. Express the essence of the work (what/why) before implementation, define the scope with a simple context and interfaces, and make success measurable with fit criteria and owners. Distinguish policies from procedures, explore “what if” improvements only after goals are clear, and avoid traps like jumping to UI, copying the current system, or using vague adjectives.
