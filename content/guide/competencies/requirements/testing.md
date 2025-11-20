---
weight: 1370
title: "Testing Requirements"
description: "This article explains how to use requirements during implementation and quality assurance."
icon: "article"
date: "2025-10-09T18:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

It’s the discipline of making every requirement **provably satisfied** before you build. You do it by pairing each requirement with (a) a **fit criterion**—the measurement or benchmark that shows it’s met—and (b) a **rationale**—the reason that number matters. Together, they turn wishes into tests and help teams agree on meaning fast.

## Why it matters

Testing requirements catch ambiguity where it’s cheapest—**upstream**. Clear measures align stakeholders, guide design trade-offs, and allow testers to encode acceptance criteria early. A light **Quality Gateway**—a small, repeatable check—keeps unclear or low-value items out of your spec. Explicit trade-off: **speed vs. formality**—more measurement and gating raises up-front effort but lowers rework later. The data is consistent: most defects originate in requirements/design; earlier detection is dramatically cheaper.

## How to do it

- **Write a fit criterion for each requirement.**\
Quantify success (time, rate, count, percentile, certification). If it’s already quantified, the requirement *is* its fit criterion.\
*Quality tie:* testability.

- **Add the rationale next to the number.**\
Capture the “why” (evidence, risk, law, brand) so future changes don’t corrupt intent.\
*Risk tie:* ripple effects in maintenance.

- **Choose the proper yardstick.**\
Seconds for response time, defect rates for quality, percentiles for performance, standards/certifications for subjective goals.\
*Quality tie:* validity of measurement.

- **Define failure first.**\
Ask “what’s unacceptable?” to set thresholds and business tolerances (e.g., 95th/100th percentiles).\
*Risk tie:* ambiguity.

- **Prefer distributions over single numbers.**\
E.g., “≤0.5s for 95%, ≤2s worst-case.” Designers get headroom; testers get clarity.\
*Quality tie:* realism.

- **Use better formats, not more prose.**\
Decision tables for rules, graphs for growth/peaks, and a data dictionary for terms.\
*Quality tie:* unambiguity.

- **Anchor measures to scenarios.**\
Attach criteria to steps/use cases so tests are conducted where work occurs; add a top-level outcome for each use case.\
*Quality tie:* completeness.

- **Cover non-functionals by type.**\
Appearance via brand standard/sign-off; usability via tasks/time/error rates or accessibility certification; performance via percentiles; operational via environment checks; maintainability via time-to-change; security via named standards; cultural/legal via named authorities and laws.\
*Risk tie:* compliance.

- **Run a small Quality Gateway.**\
Gatekeepers test scope, relevance, completeness, fit criterion, terminology, feasibility, level (what vs. how), value, gold plating, and creep before acceptance.\
*Quality tie:* consistency.

- **Scale ceremony to context.**\
Keep the checks; tune the paperwork—from lightweight peer review to staged approvals.\
*Risk tie:* delivery friction vs. rework.

## Examples / Pitfalls

#### 1. Intuitive without numbers

**Summary:** Subjective intent needs operationalized measures.
**Concrete pass:** A city’s road-weather tool has a requirement: “The app shall be intuitive for road engineers.” The team adds: *Rationale:* adoption risk if hard to learn. *Fit criterion:* “A road engineer produces a correct de-icing forecast within 10 minutes of first use, no external help.” Training variant: “9/10 engineers complete core tasks after one day of training.”
**Why it works:** It converts “intuitive” into observable behavior tied to user class and adoption. *Quality tie:* usability.

#### 2. Performance with tails

**Summary:** Percentiles prevent invisible pain at the edges.
**Concrete pass:** A retail checkout requires “fast responses.” The fit criterion states: “≤0.5s for 95% of requests; ≤2s for all others.” Designers keep caches warm; testers measure both bands under peak load.
**Why it works:** It sets expectations for the common case and the worst case, guiding capacity and test design. *Quality tie:* performance realism.

#### 3. Culture and law: name the authority

**Summary:** For subjective/compliance areas, cite the certifier or statute.
**Concrete pass:** A national portal must be non-offensive and compliant. Fit criteria: “Communications dept certifies cultural acceptability for the target audience” and “Product certified to ADA (specified clauses) by the named body.”
**Why it works:** It replaces endless debate with an external verdict and a pass/fail process. *Risk tie:* compliance ambiguity.

## Conclusion

- **Every requirement = description + rationale + fit criterion.** No measure, no entry.
- **Define failure bands and who certifies.** Percentiles and authorities reduce debate.
- **Use tables/graphs and a glossary to kill ambiguity.** Less prose, clearer tests.
- **Attach criteria to flows and gate them.** Small, relentless checks beat big late reviews.
- **Tune ceremony, not standards.** Lightweight where possible, never sloppy.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)*. 3rd ed. Addison-Wesley Professional, 2012.
  - **Chapter 12: Fit Criteria and Rationale**\
  Explains how to make each requirement testable with a precise fit criterion and to record the rationale so stakeholders understand why the number matters. Provides practical guidance on choosing measurement scales, deriving thresholds from “what’s unacceptable,” and attaching criteria to scenarios to eliminate ambiguity.
  - **Chapter 13: The Quality Gateway**\
  Describes a lightweight checkpoint that screens requirements for scope, relevance, completeness, measurability, consistent language, feasibility, appropriate abstraction, value, and creep. Shows how to scale the ceremony to the context and keep unclear or low-value items out of the specification to reduce downstream rework.
