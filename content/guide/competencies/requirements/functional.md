---
weight: 1360
title: "Functional Requirements"
description: "This article explains what functional requirements are."
icon: "article"
date: "2025-10-09T18:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Functional requirements (FRs) describe the actions the product must perform to support the work: calculate, validate, route, notify, transform, store, and retrieve. They remain technology-neutral, allowing designers the freedom to choose the “how.” In practice, you derive them from agreed Product Use Case (PUC) scenarios and write them as atomic, verifiable items.

A clean chain from event to behavior keeps you honest: **Business event → BUC → PUC → step → atomic requirement**. That hierarchy preserves traceability without arguing about “high- vs. low-level” requirements.

## Why it matters?

Owners buy outcomes, not documents. FRs translate intent into a precise, testable scope, enabling reliable delivery, healthy handoffs, and faster change. Done poorly, they inject ambiguity, hide rules, and create rework.

**Trade-off:** depth vs. speed. Over-detailed specs slow discovery and hinder learning, while under-specified items lead to risky interpretation at build time. Tune rigor to risk (“rabbit/horse/elephant”) and context.

## How to do it

- **Start from scenarios**\
Walk each PUC step and ask, “What must the product do here?” Convert each step into one or more atomic FRs.\
*Quality tie:* completeness, testability.

- **Write atomic items**\
One intent, one outcome, one place to test. Split when different rules, actors, or data paths appear.\
*Quality tie:* verifiability, changeability.

- **Pair description with rationale**\
State the business reason so reviewers judge intent, not taste, and testers know what to prove.\
*Risk tie:* bike shedding, misinterpretation.

- **Make fit measurable**\
Use fit criteria or acceptance tests to make “done” observable. Decision tables help with combined rules.\
*Quality tie:* unambiguity, testability.

- **Model the data early**\
A quick business data model + data dictionary surfaces CRUD actions, validations, and custodial processes. Use stakeholder vocabulary.\
*Quality tie:* consistency, completeness.

- **Cover variants and exceptions**\
Distinguish “alternative good paths” from “must-handle problems,” and show how flows rejoin.\
*Risk tie:* hidden failure modes.

- **Kill fuzzy wording**\
Replace “fast/appropriate” with numbers, ranges, or explicit rules. If a sentence reads two ways, rewrite it.\
*Quality tie:* clarity.

- **Separate constraints**\
Platform mandates and integrations are **technological requirements/constraints**, not FRs. Keep them distinct so they bound design without dictating it.\
*Risk tie:* premature solutioning.

- **Group for sense-making**\
Keep items atomic, then group by PUC or feature for review, ownership, and release planning. Maintain IDs and tags to trace back up the chain.\
*Quality tie:* traceability, operability.

- **Tune formality**\
Rabbits can keep FRs in well-written stories, while elephants require a complete specification with attributes (originator, fit, rationale, priority).\
*Risk tie:* inadequate handoffs.

## Examples / Pitfalls

#### 1. Policy vs. Habit

**Summary:** Don’t bake current workarounds into FRs.

**Concrete pass:** In a returns process, staff always “print two labels” because the old scanner loses pages. The scenario step is “identify package and initiate return.” The atomic FR becomes “product shall register return with package ID and produce customer confirmation,” not “print two labels.” The “two labels” sit under constraints (if still needed) or vanish when scanners change.

**Why it works:** It keeps FRs about invariant business outcomes, not legacy procedures—improves portability across solutions.

#### 2. One requirement, one test

**Summary:** Merge or split until a single fit criterion can verify it.

**Concrete pass:** Loan-approval step spawns a draft FR: “validate application completeness and income eligibility and credit score thresholds.” That’s three rules. Rewrite as separate FRs, each with its own fit criterion and decision table. Now QA can prove each rule independently, and ops can change thresholds without collateral edits.

**Why it works:** Atomicity increases testability and change isolation.

#### 3. Data reveals missing behavior

**Summary:** Your data model points to FR gaps.

**Concrete pass:** A clinic intake model introduces **Allergy**, **Medication**, and **Encounter** with relationships. The dictionary defines units and ranges. Seeing **Allergy** prompts FRs to capture, update, and check conflicts during medication ordering—behaviors never mentioned in interviews but critical to safety.

**Why it works:** Data modeling exposes CRUD and validation responsibilities that scenarios alone may miss.

## Conclusion

- Derive FRs from scenarios; keep them atomic, measurable, and technology-neutral.
- Use data models and a dictionary to drive completeness and consistent language.
- Separate constraints from behavior; group FRs for comprehension while preserving traceability.
- Tune formality to risk and distribution; include rationale and fit criteria for every atomic item.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional.
  - **Chapter 10: Functional Requirements**\
  Defines functional requirements as small, testable, technology-neutral statements of what the product must do, derived step-by-step from Product Use Case (PUC) scenarios. Emphasizes right-sizing formality, writing atomic items with clear rationale and measurable fit criteria, and using data models plus a data dictionary to surface CRUD, validations, and consistent language. Covers alternatives vs. exceptions, explicit conditional rules (e.g., decision tables), removing ambiguity, separating technological constraints from behavior, grouping for comprehension while preserving traceability, when to express behavior via scenarios/stories/process models, and how to specify deltas when buying COTS.
