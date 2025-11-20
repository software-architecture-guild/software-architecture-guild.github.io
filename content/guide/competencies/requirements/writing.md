---
weight: 1355
title: "Writing Requirements"
description: "This article explains how to write good and understandable requirements."
icon: "article"
date: "2025-10-10T17:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

A practical way to turn messy discovery into testable decisions that ship.

## What are “writing requirements”?

It’s the craft of translating real work into clear, testable statements that the product can honor. You start from business events and responsibilities, not from UI fantasies. You conclude with observable behavior, measurable qualities, and traceability, ensuring every decision is traceable back to goals and rules.

Good requirements are technology-neutral, small, and verifiable. They describe *what* the product must do and *how well* it must do it—never *how* to build it.

## Why it matters?

Requirements are the product’s guardrails. They protect value (we build the right thing) and flow (we build it once). They also reduce downstream trash by making intent obvious to designers, builders, and testers.

**Trade-off:** Speed vs. formality. More ceremony can raise clarity and auditability; too much slows learning. The sweet spot is “just enough precision to be testable and traceable.”

## How to do it

- **Start from work, not screens.**\
Allocate responsibilities from business events to product behavior before drawing UI \
*Quality tie: completeness*; *Risk tie: solution bias*.

- **Define Product Use Cases (PUCs).**\
Split each Business Use Case into PUCs with user-language names (“Schedule de-icing for forecasted freeze”). Keep them tech-neutral.\
*Quality tie: coherence*; *Risk tie: over-specifying UI flow*.

- **Name actors and guarantees.**\
For each PUC, list actors (people/systems), their intent, and what the product must guarantee (pre/post conditions).\
*Quality tie: testability*; *Risk tie: ambiguity*.

- **Write atomic functional requirements.**\
One behavior per line, observable at the interface. Include originator and rationale.\
*Quality tie: traceability*; *Risk tie: hidden assumptions*.

- **Attach fit criteria to every adjective.**\
Turn “fast/secure/easy” into numbers (e.g., “≤2s p95,” “ISO-level cipher,” “first-time success ≥85%”).\
*Quality tie: verifiability*; *Risk tie: untestable claims*.

- **Place non-functionals where they bite.**\
Tie performance, reliability, security, accessibility, and legal constraints to specific PUC steps or messages.\
*Quality tie: operability*; *Risk tie: orphaned NFRs*.

- **Respect constraints, don’t let them design.**\
Record mandated tech, standards, deadlines as bounds. Validate source and flexibility.\
*Quality tie: feasibility*; *Risk tie: cargo-cult decisions*.

- **Sketch interfaces and data contracts early.**\
From your context diagram, list external messages, fields, semantics, and error cases. Include examples and edge values.\
*Quality tie: interoperability*; *Risk tie: integration rework*.

- **Prototype to kill risk, not to commit.**\
Use quick mockups/spikes focused on the riskiest unknown (workflow, latency, integration). Archive learnings; discard the prototype.\
*Quality tie: learnability*; *Risk tie: prototype-creep*.

- **Prioritize by value × risk × dependency.**\
Stage delivery as vertical slices tied to explicit fit criteria. Pull forward high-risk/high-learning items.\
*Quality tie: adaptability*; *Risk tie: late surprises*.

- **Gate quality before backlog.**\
Check each item for clarity, uniqueness, fit criterion, rationale, and traceability (Event → BUC → PUC → Requirement). Reject or rework vagueness.\
*Quality tie: consistency*; *Risk tie: defect injection*.

- **Reuse deliberately.**\
Harvest proven wording, data contracts, decision tables, and standard NFR packs; parameterize terms and limits. Trace reused items to current goals.\
*Quality tie: consistency*; *Risk tie: stale patterns*.

## Examples / Pitfalls

#### 1. Policy vs. Habit

**Summary:** Capture business rules, not today’s muscle memory.
**Concrete pass:** A returns portal team writes, “Supervisor must approve refunds >$100.” During trawling, they learn the policy is “approve based on fraud score and tenure,” but staff used $100 as a quick proxy. The requirement becomes: “For fraud_score ≤X and tenure ≥Y months, the product shall auto-approve refunds up to customer_limit; otherwise route to review.”
**Why it works:** It encodes the *rule*, not a brittle workaround—improving *correctness* and *auditability*.

#### 2. Fit criteria beat adjectives

**Summary:** Numbers prevent arguments later.
**Concrete pass:** A banking app spec says “Login should be fast.” Recast to: “From credential submission to authenticated home view ≤1.5s for 95% of attempts at 4K concurrent sessions; ≤0.1% auth failures attributable to platform.”
**Why it works:** Converts “fast” into *testable performance* and capacity targets.

#### 3. Interface contracts early

**Summary:** Message semantics now, not in sprint 12.
**Concrete pass:** A logistics system will ingest “DeliveryStatusUpdate.” The team publishes the JSON schema, field meanings, allowed enums, idempotency key rules, and sample error cases (duplicate, out-of-order, future timestamp). Partners validate against examples before builds begin.
**Why it works:** Reduces *integration risk* and shortens *cycle time*.

## Conclusion

- Write responsibilities first, UI later.
- Make every requirement testable with fit criteria and rationale.
- Bind qualities and constraints to the exact steps they affect.
- Keep a clean trace: Event → BUC → PUC → Requirement → Test.
- Prioritize by value and risk; gate rigor before work enters the backlog.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional, 2012.
  - **Chapter 8: Starting the Solution**\
    The process moves from understanding the work to allocating responsibilities to the product. Introduces Product Use Cases (PUCs), clarifies actors and guarantees, and writes atomic functional requirements with rationale and fit criteria. Attaches qualities and constraints where they matter, sketches interfaces and data contracts, prototypes to reduce risk, reuses proven assets, prioritizes by value/risk/dependency, and applies a quality gate before backlog.
  - **Chapter 9: Strategies for Today’s Business Analyst**\
    Picks a delivery strategy by balancing knowledge, activities, and people. Profiles typical projects—External, Iterative, Sequential—and explains when you’ve learned enough to advance. Outlines tailored approaches for vendors/OTS, iterative loops, and phase-gated work; encourages creating a living playbook, measuring success by decision quality and feedback speed, and enhancing skills (rules discovery, reuse, facilitation, visualization, systemic thinking).
  - **Chapter 15: Reusing Requirements**\
    Justifies reusing elements to reduce discovery time and enhance quality, then details what to reuse (atomic requirements, scenarios, data definitions, interface contracts, standard NFRs) and where to find them (past specs, tests, standards, regulations). Explains how to make items plug-and-play (tech-neutral text, rationale, fit criteria, parameters), turn repeats into patterns in a tagged library, apply reused items with gating and traceability, use reuse packs for COTS/contracts, and govern the library with ownership, versioning, and right-sized formality.
