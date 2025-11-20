---
weight: 1380
title: "Communicating Requirements"
description: "This article explains how to use requirements during implementation and quality assurance."
icon: "article"
date: "2025-10-09T18:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

It’s the craft of packaging the same underlying truths for different audiences so they can decide, align, and verify their choices. Not everyone needs the whole spec; they need their slice of the truth, presented in the medium they trust. Scenarios, atomic requirements, and a lightweight spec act as the shared spine.

## Why it matters

Good communication cuts rework. Requirements errors are the costliest to fix later, so clarity and early testing of the spec pays back fast. A “Quality Gateway” that checks each atomic requirement for ambiguity, testability, and traceability prevents bad requirements from entering the spec in the first place.

**Trade-off:** speed vs. formality. The lighter your artifacts, the more discipline you need in meeting criteria, ensuring traceability, and conducting quick reviews. Heavy, contract-driven efforts demand more ceremony; small teams can be informal if they still test each requirement through a gate.

## How to do it

- **Start with audiences**\
Map “who needs what, to decide what, by when.” Sponsors want outcomes/risks, users want workflows, builders want precise, testable behavior.\
*Quality tie:* relevance, precision.

- **Use scenarios as the backbone**\
Anchor all content to Business/Product Use Case scenarios and their steps. They’re readable, testable, and naturally traceable to events and data.\
*Quality tie:* traceability, completeness.

- **Assemble, don’t author, the spec**\
Treat the specification as a navigable map that points to atomic requirements (Snow Cards), data dictionary, rules, and models. Cross-link; don’t duplicate.\
*Quality tie:* consistency; *Risk tie:* drift.

- **Write atomic requirements with fit criteria**\
Give each item an ID, origin (scenario/event), rationale, and a measurable fit criterion so it’s testable by anyone who reads it.\
*Quality tie:* testability; *Risk tie:* ambiguity.

- **Pick the lightest effective medium**\
One-pagers for exec decisions; short scenario walkthroughs for users; Snow Cards/tables for teams; quick demos for alignment. Retire throwaway prototypes once they answer the question.\
*Quality tie:* efficiency; *Risk tie:* false commitment.

- **Gate every requirement**\
Run each atomic item through a fast Quality Gateway: within scope, unambiguous, traceable, testable, not gold-plated. Keep it two-person by default (analyst + tester) to stay quick.\
*Quality tie:* correctness; *Risk tie:* creep.

- **Review slices, not tomes**\
Conduct mixed-role inspections for each use case/feature to expose missing cases, unclear terms, or unmeasured qualities. Track decisions and deltas in the item’s history.\
*Quality tie:* completeness; *Risk tie:* conflict.

- **Keep change visible**\
Maintain a thin chain: Goal → Event/BUC → Scenario step → Requirement → Test → Build artifact. Store links where teams already work (tracker/repo/wiki).\
*Quality tie:* maintainability; *Risk tie:* regression.

- **Baseline without freezing learning**\
Snapshot for contracts/audits, but keep working copies live and versioned by release/iteration. Record rationale and fit criteria in each item’s history.\
*Quality tie:* auditability; *Risk tie:* stagnation.

- **Share the language**\
Use a glossary/data dictionary for names, units, and ranges. If a term isn’t defined, don’t use it. Include examples and counterexamples.\
*Quality tie:* consistency; *Risk tie:* misinterpretation.

## Examples / Pitfalls

### 1) “Spec as a bookshelf, not a brick”

**Summary:** Make the spec an index into well-kept parts, not a monolith.

**Concrete pass:** A payments team maintains atomic requirements as Snow Cards in the tracker, scenarios in a shared doc, rules in a reference manual, and a data dictionary in the wiki. The “Specification” page links each feature to its scenario, cards, tests, and glossary entries. When the “refund window” changes, they update the rule and the related fit criteria; the spec stays current because it points, not copies.  

**Why it works:** Cross-linking prevents duplication, keeps consistency, and makes changes propagate intentionally. *Quality tie:* consistency.

### 2) “Buddy-gate beats committee”

**Summary:** A two-person Quality Gateway catches defects fast without ceremony.

**Concrete pass:** For each new requirement on “payout reconciliation,” the analyst drafts a Snow Card with ID, scenario step, rationale, and a numeric fit criterion. A tester reviews the scope and testability in five minutes. Fuzzy words (“fast,” “intuitive”) get replaced with numbers; solution-bound phrasing is stripped. Only then does the item enter the spec.

**Why it works:** Small, repeatable checks enforce correctness and testability before defects spread. *Quality tie:* correctness.

### 3) “Scenario-first demo”

**Summary:** Demo scenarios, not screens, to align with non-technical stakeholders.

**Concrete pass:** In a healthcare portal upgrade, the team walks through “patient requests prescription refill” as a short story: triggers, decisions, exceptions. A paper mock shows two paths (typical vs. out-of-stock). Stakeholders mark a missed exception (controlled substances) and require a specific audit trail. The team updates the scenario and adds two atomic requirements with measurable logging and turnaround time.

**Why it works:** Scenarios surface exceptions and NFRs early and tie new requirements back to concrete steps. *Quality tie:* completeness.

## Conclusion

- Communicate to enable decisions: audience-fit beats volume.
- Let scenarios carry the story; link every requirement to a step.
- Assemble a navigable spec that points to atomic items and shared definitions.
- Gate every requirement; review in small, mixed-role slices.
- Version with intent: baseline for contracts, keep working copies live.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional, 2012.
  - **Chapter 16: Communicating the Requirements**\
    Practical guidance for tailoring the same truths to different audiences; using scenarios as the shared backbone; choosing the lightest effective medium (one-pagers, walkthroughs, prototypes); treating the specification as a navigable index, not a monolith; running focused, mixed-role reviews; keeping change visible through thin, proper traceability; managing baselines without freezing learning; enforcing clear style with a shared glossary and data dictionary.
