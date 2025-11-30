---
weight: 1361
title: "Non-Functional Requirements"
description: "This article explains what non-functional requirements (NFRs) are, why they are critical for system adoption and quality, and how to effectively define and manage them using measurable fit criteria, scoped application, and architectural tactics to ensure a successful product."
icon: "article"
date: "2025-10-10T17:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Non-functional requirements (NFRs) describe **how well** the system performs in terms of usability, performance, reliability, security, maintainability, operability, accessibility, and more. If functional requirements are the verbs, NFRs are the adjectives—and they often decide adoption. Volere treats NFRs as first-class, grouped into families to aid discovery and traceability.

## Why it matters?

Teams ship correct features that still fail because pages are slow, flows are hostile, or ops can’t run the thing safely. NFRs protect value: they make functionality usable, safe, compliant, and affordable to operate. Ignore them and you pay later—usually in rework, churn, incidents, or regulatory pain.  
**Trade-off:** You can move fast with light NFRs, but you risk performance, security, and operability debt that slows you down more later. Aim for **variable formality**—tune the *documentation*, never the *thinking*.

## How to do it

- **Anchor scope levels.**\
Attach NFRs to **steps**, **use cases**, and **the whole product**. This preserves traceability and prevents “global” fluff.\
*Quality tie:* completeness + testability.

- **Use a discovery checklist.**\
Sweep Volere’s NFR families (10–17): Look & Feel; Usability/Humanity; Performance; Operational/Environmental; Maintainability/Support; Security; Cultural/Political; Legal. Use as prompts, not dogma.\
*Risk tie:* omission risk.

- **Write responsibilities, not mechanisms.**\
“Log access to sensitive records” beats “Use Splunk w/ index X.” Keep tech choices in design or constraints unless mandated.\
*Risk tie:* premature design lock-in.

- **Make every NFR measurable.**\
Replace “fast,” “intuitive,” “secure” with **fit criteria** (numbers, distributions, pass/fail checks). E.g., “P95 < 400 ms, P99 < 800 ms.”\
*Quality tie:* testability.

- **Tie to user classes and contexts.**\
State who must succeed and under what conditions (novice vs. expert, mobile on 3G, screen reader).\
*Quality tie:* usability + accessibility.

- **Cover steady state and peaks.**\
Specify normal load, peak events, failure modes, recovery targets (RTO/RPO), and longevity.\
*Quality tie:* performance + reliability.

- **Design for operations.**\
Capture runtime environment, integrations, productization, and release requirements (observability, config, runbooks).\
*Quality tie:* operability.

- **Specify changeability.**\
Define “time to diagnose,” “time to patch,” supported extension points, and support hours/SLOs.\
*Quality tie:* maintainability + supportability.

- **Split security into concerns.**\
Access control (who can do what), privacy/confidentiality, integrity, auditing/traceability, immunity (e.g., malware). Pair each with audit-ready fit criteria.\
*Quality tie:* security + accountability.

- **Respect culture and law.**\
Validate symbols, colors, language, and list applicable laws/standards (and who owns each). Turn obligations into verifiable behaviors and evidence.\
*Risk tie:* compliance + reputational risk.

- **Record NFRs where teams live.**\
Put them next to the use cases, in the spec template, and in test plans. Prototypes help elicit NFRs but never replace written fit criteria.
*Quality tie:* communication.\

- **Tune rigor to context.**\
Distributed/regulated work gets fuller specs; small co-located teams can be lighter—**but never skip the measurement.**\
*Risk tie:* ambiguity.

## Examples / Pitfalls

#### 1. Policy vs. Habit

**Summary:** Don’t encode yesterday’s workaround as today’s NFR.
**Concrete pass:** A retail returns app previously required supervisors to approve refunds > $200 because the database was slow to reconcile. Ops says “we need supervisor approval” as a “security NFR.” In discovery, you trace it to latency, not fraud. The NFR becomes “Reconciliation completes within 30s; queue depth < 50; alerts if breached.” Supervisor approval moves to a business rule for exceptions, not a baked-in workflow.
**Why it works:** It preserves **security** where needed but optimizes **performance** and **operability** by solving the root cause.

#### 2. Adjectives aren’t testable

**Summary:** Replace vague words with fit criteria.
**Concrete pass:** A healthcare portal “must be accessible and easy to learn.” You write: “WCAG 2.2 AA conformance; NVDA/JAWS happy path success rate ≥ 95% across 20 participants; first-task completion ≤ 3 minutes; new-user error rate ≤ 2 per task.”
**Why it works:** Testable targets drive **usability** and **accessibility** outcomes instead of opinions.

#### 3. Global NFRs hide local pain

**Summary:** Attach NFRs at the tightest sensible scope.
**Concrete pass:** A logistics route optimizer has a global “response < 1s” NFR. In reality, most screens are fine at 500ms, but “Generate Route” needs P95 < 5s while “Save Draft” can be 2s. You split NFRs per use case step and instrument each separately.
**Why it works:** Scoped NFRs improve **performance** where it matters and avoid overspending elsewhere.

## Conclusion

- NFRs decide whether “working” software is **adopted**. Treat them as first-class.
- Always add **fit criteria**; no measurement, no requirement.
- Attach NFRs at **step/use-case/product** scope for clarity and cost control.
- Use Volere’s families as a **trawling checklist**; don’t let the list design the product.
- Keep **what** vs. **how** separate; design choices live downstream.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley Professional, 2012.
  - **Chapter 11: Non-functional Requirements**\
    Explains why qualities (usability, performance, security, operability, etc.) decide adoption, and how to scale rigor without skipping the thinking. Shows where NFRs attach (step, use-case, product), uses Volere’s eight families (10–17) as a discovery checklist, and warns against writing solutions instead of verifiable quality responsibilities. Emphasizes recording NFRs where teams work (use cases, template) and tracing each to the originating work.
  - **Chapter 12: Fit Criteria**\
    Makes every requirement—especially NFRs—measurable and testable by replacing adjectives with concrete pass/fail checks and numeric targets, so intent becomes verifiable in analysis and validation.
