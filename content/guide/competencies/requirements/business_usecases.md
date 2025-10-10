---
weight: 1330
title: "Business Use Cases"
description: "This article explains how to identify Business Use Cases."
icon: "article"
date: "2025-10-10T17:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Pin down what the business does when the world pokes it—so you can design the proper product boundaries and avoid scope soup.

## What is a Business Use Case?

A **Business Use Case (BUC)** is the work’s planned response to a real-world event. Think in terms of *work first*: people, policies, tools, and adjacent systems—not “the system.” Each external **business event** (e.g., “Weather service publishes a forecast”) triggers a unit of business response you can observe, model, and verify. BUCs are technology-neutral and live at the boundary between the work and its environment.

BUCs differ from **Product Use Cases (PUCs)**. From each BUC, you later decide what the product should automate. Keep the BUC→PUC trace so product scope choices remain grounded in business reality.

## Why it matters?

Event-based partitioning keeps you aligned with how the world interacts with the business, not with today’s org chart or codebase. You get clear boundaries, natural stakeholders, and parallelizable discovery. It also anchors **scope, stakeholders, and goals**—the blastoff trio that prevents wandering and rework.

**Trade-off:** depth of event discovery vs. iteration speed. Go too light and you miss critical events; go too heavy and you stall delivery. Calibrate formality by project size (“rabbit/horse/elephant”) but never skip scope–stakeholders–goals.

## How to do it

- **Run a Project Blastoff.**\
Agree on purpose, work scope, stakeholders, constraints, and measurable goals. This is your launchpad and stop-go gate.\
*Quality tie:* alignment, feasibility.

- **Separate work from environment.**\
Draw a **work/context diagram**: one circle for the work, boxes for adjacent systems, named flows on the boundary. This is a boundary contract, not a solution sketch.\
*Risk tie:* scope creep.

- **List external events (including time).**\
For every inbound/outbound flow, ask “What happened out there?” Capture event name, trigger flow, and expected business response.\
*Quality tie:* completeness.

- **Name BUCs in stakeholder language.**\
Each event maps to one BUC (“Publish district forecast” → “Plan road treatment”). Avoid tech verbs.\
*Risk tie:* ambiguity.

- **Check BUC boundaries.**\
BUCs should not call each other; they share only stored data. That lets multiple analysts explore in parallel.\
*Quality tie:* modularity; *Risk tie:* coupling.

- **Identify stakeholders from the boundary.**\
Every adjacent system needs a human owner. Build a stakeholder list (sponsor, customers, user classes, regulators, others) from the context diagram.\
*Quality tie:* traceability.

- **Capture the goal with PAM.**\
For the initiative, write **Purpose–Advantage–Measurement** so success is testable (“reduce ice-related accidents to ≤1 per 10,000 vehicle-miles”).\
*Quality tie:* testability.

- **Scale formality to size.**\
Rabbits: wall sketch + scenarios. Horses: written BUC set. Elephants: QA-checked blastoff, managed artifacts.\
*Risk tie:* over/under-engineering.

- **Derive PUCs later.**\
Once a BUC is understood, decide which parts become product behavior. Keep explicit BUC↔PUC links to preserve intent.\
*Quality tie:* scope control.

- **Attach fit criteria early.**\
When a BUC implies qualities (latency, accuracy, throughput), record measurable fit criteria. This avoids “wish” requirements.\
*Quality tie:* verifiability.

## Examples / Pitfalls

#### 1. Return window vs. Policy drift

**Summary:** Don’t encode a store habit as a hard rule.
**Concrete pass:** A retailer processes “returns within 14 days” because that’s how the POS is configured. In discovery, you capture the policy goal: “minimize fraud while preserving customer goodwill.” The BUC becomes “Handle return request based on proof-of-purchase and item condition,” with a parameterized window by product category and season.
**Why it works:** You model the business intent, enabling flexible rules without frequent system rewrites.

#### 2. Who owns the credit decision?

**Summary:** Boundary mistakes cause rework and missed obligations.
**Concrete pass:** In a loan-origination effort, analysts put “approve loan” inside the product. The context review shows approvals are made by a third-party bureau, plus an internal credit committee. You move “decisioning” outside and keep the BUC as “Assemble application and request decision,” with flows for “Decision response,” “Exception review,” and “Adverse action notice.”
**Why it works:** Clear boundaries reduce coupling and surface the right stakeholders and compliance steps.

#### 3. BUC chaining slows teams

**Summary:** Letting BUCs call each other blocks parallel discovery.
**Concrete pass:** For a patient portal, “Patient submits intake form” directly triggers “Schedule appointment” in the same BUC. You split them: one BUC validates and stores the intake; another matches availability and proposes slots. Teams work in parallel, aligning only on shared data (validated intake, scheduling constraints).
**Why it works:** Independent slices de-risk scope and enable parallel analysis; shared data is the only coupling.

## Conclusion

- Use **events** to carve the work into clean, observable BUCs.
- Anchor discovery with **blastoff**: scope, stakeholders, goals, constraints.
- Keep **boundaries explicit**; flows define responsibility.
- Decide product automation **after** you understand the BUC; keep BUC↔PUC traceability.
- Measure what matters—attach **fit criteria** so success is testable.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley, 2012.
  - **Chapter 3 — Scoping the Business Problem**\
    Establishes the “Project Blastoff”: defines the *work* to be improved, its boundaries, stakeholders, constraints, and measurable goals. Uses a work/context diagram to separate the work from its environment, identifies stakeholder classes (sponsor, customer, users, others), frames goals via Purpose–Advantage–Measurement, records constraints and naming conventions, estimates cost, assesses risks, and makes an objective go/no-go decision.

  - **Chapter 4 — Business Use Cases**\
    Partitions the work by external business events to create Business Use Cases (BUCs)—technology-neutral slices of observable business response. Calibrates formality by project size, derives events from the context boundary (including time-triggers), keeps BUCs independent (shared data only), and traces product scope by mapping BUCs to Product Use Cases (PUCs) and their actors after the business is understood.
