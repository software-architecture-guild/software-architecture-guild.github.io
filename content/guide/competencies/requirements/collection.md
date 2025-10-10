# How to collect requirements

A fast, practical way to discover what’s needed—before you build—so you hit value, not just velocity.

## What is “collecting requirements”?

Structured discovery. You’re not transcribing wishes; you’re uncovering the work’s policy, the events that trigger it, and the product’s responsibilities. Stay technology-neutral until design time, but capture **what** the product must do and **how well** —both measurable and testable.

It fits any delivery method. Run a light loop: scope → learn the work (events/BUCs) → decide product responsibilities (PUCs) → write testable requirements → gate for quality → reuse/review → hand to dev. Iterate thin slices and keep traceability (Event → BUC → PUC → requirement → test).

## Why it matters

* **Owner value.** Frame benefit, cost, risk early; deliver outcomes, not demos.
* **Risk control.** Scenarios and fit criteria expose gaps and non-functional traps before they burn sprints.
* **Quality on purpose.** Tie usability, performance, security, operability to the scenarios where they bite.
* **Explicit trade-off.** **Speed vs. formality:** be as informal as you can, as formal as you must.

## How to do it

* **Run a Project Blastoff:** Purpose, scope, stakeholders, constraints, **go/no-go** . Output: context + stop-rules. *Quality tie:* reduces creep; aligns to value.
* **Organize by Business Events:** List external triggers (incl. time). Partition into **BUCs** . *Quality tie:* coverage + traceability.
* **Trawl, don’t ask:** Interviews, apprenticing, workshops, doc digs. Treat statements as clues; extract **rules** and **data** . *Quality tie:* correctness, consistency.
* **Sketch quick models:** Context/flows/data to unblock decisions. Prefer throwaways. *Risk tie:* cheap learning.
* **Walk Scenarios:** For each event/BUC, write main/alt/exception paths. Derive **PUCs** . *Quality tie:* edge cases → acceptance tests.
* **Write atomic requirements:** Separate **FRs** from **NFRs** . Use Snow Card attributes (description, rationale, originator, fit criterion, priority, conflicts, history). *Quality tie:* testable, traceable.
* **Attach fit criteria:** Numbers beat adjectives (e.g., p95 < 200 ms, SUS ≥ 75). *Quality tie:* verifiable acceptance.
* **Gate with a Quality Gateway:** Check scope, clarity, consistency, feasibility, testability, vocabulary. Reject or rework. *Risk tie:* defect prevention.
* **Reuse on purpose:** Pull/adapt proven requirements and NFR catalogs. Maintain a reuse library. *Quality tie:* consistency; fewer omissions.
* **Iterate as slices:** Prioritize by **value + uncertainty** . Pull risky NFRs forward (perf, security, integration). Write just-in-time to test this slice. *Quality tie:* evidence-driven learning.
* **Measure “done” with evidence:** Fit-criteria pass rates, risks retired, stakeholder outcomes achieved. Feed into the next plan.

## Examples / Pitfalls

### 1) Chain it end-to-end (make completeness tangible)

**Summary:** Connect **Event → Scenario → Requirements → Fit criteria → Test** so nothing falls through the cracks.

**Concrete pass:** Imagine an online retailer. A **customer submits a return request** —that’s your event. The **scenario** describes what follows: the system validates the order, checks eligibility, and issues a return label. From this flow, you derive the key **requirements** : verify order ID against purchase history, confirm return window ≤ 30 days, and generate a prepaid label within one minute. Add the **fit criteria** : validation accuracy 100%; p95 label generation < 60 seconds; confirmation email delivered within two minutes. Finally, the **test** : given a valid request, the customer receives a label and confirmation within those time bounds.

**Why it works:** The chain links behavior, quality, and verification. Nothing is vague, and completeness can be inspected by coverage, not volume.

---

### 2) Policy vs. habit (don’t cement workarounds)

**Summary:** Separate durable **policy** from today’s **habit** before you encode behavior.

**Concrete pass:** A finance team insists, “We export invoices to Excel and manually round tax totals.” Instead of automating that ritual, you ask whether this is a legal requirement or a temporary shortcut. If it’s a **policy** , you name and enforce it (e.g., “rounding follows Regulation 12.4, nearest cent, always shown in summary line”). If it’s a **habit** , don’t enshrine it: implement correct rounding logic in-system and deprecate manual edits. Keep an export for audits but remove the spreadsheet dependency.

**Why it works:** You implement what the business truly needs, not what current tools force them to do. Rules stay clean; workarounds fade out.

---

### 3) Adjectives without numbers (make qualities testable)

**Summary:** Replace “fast/intuitive/secure” with measurable, scenario-bound targets.

**Concrete pass:** A user logs into a healthcare portal to view lab results. Instead of saying “the page must load quickly and be easy to use,” you make it measurable: p95 page load ≤ 2 seconds under 500 concurrent users; 90% of patients locate results within 15 seconds without help; all access uses multi-factor authentication, and unauthorized attempts are locked after three failures. Now usability, performance, and security are concrete, observable, and testable.

**Why it works:** Numbers turn intentions into evidence. When qualities are explicit, teams can design, test, and monitor against them—no arguments, no guessing.

## Conclusion — takeaways

* **Start with the work.** Events and scenarios anchor completeness and traceability.
* **Write to be tested.** Every requirement carries a fit criterion and rationale.
* **Guard the gate.** A single quality gateway prevents expensive ambiguity.
* **Iterate thin, risky first.** Stage requirements; learn from real feedback.
* **Right-size formality.** Standards stay; ceremony scales with risk.

## Recommended Reading

* Suzanne Robertson & James Robertson. *Mastering the Requirements Process* (3rd ed.).
* Donald C. Gause & Gerald M. Weinberg. *Exploring Requirements: Quality Before Design* .
* Tom DeMarco & Tim Lister. *Waltzing with Bears: Managing Risk on Software Projects* .
* Ian Alexander & Neil Maiden (eds.). *Scenarios, Stories, Use Cases Through the Systems Development Life-Cycle* .
* Capers Jones. *Software Requirements and Estimation* .
