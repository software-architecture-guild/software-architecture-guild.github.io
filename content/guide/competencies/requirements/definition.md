# What is a Requirement?

A requirement is a precise statement of what a product must do or how well it must do it—measurable, justified, and traceable to owner value.

## What is it?

A requirement is **either** a capability the product must perform (**functional** ) **or** a quality it must exhibit (**non-functional/quality attribute** ) to be acceptable or attractive. Requirements already exist in the problem domain; our job is to **discover** them, not invent them.

Requirements are valid when they’re (a) justified by intrinsic domain needs or by the client’s value case, (b) stated precisely enough to be **tested** , and (c) bounded by legitimate **constraints** (law, budget, platforms, deadlines).

## Why it matters (owner value + risks)

Getting requirements right maximizes **owner value** —benefit per cost and disruption—by aligning solution scope with real work. Weak requirements create expensive risks: feature churn, local optimizations that hurt the whole, fragile architectures, and untestable promises. Strong requirements sharpen trade-offs among **quality attributes** (performance, security, usability, modifiability) so architecture can be purposeful, not accidental.

## Connection between Architecture and Requirements

Architecture and requirements shape each other. Treat them as a feedback loop, not a handoff.

* **Requirements drive structure:** Functional flows and **quality scenarios** (latency, availability, security) determine boundaries, protocols, deployment topology. Example: p99 latency ≤ 300 ms → caching, partitioning, async I/O.
* **Architecture refines requirements:** Early choices expose new constraints and work clarifications. Example: event-driven backbone → require idempotency, exactly-once semantics become “must-haves.”
* **Utility tree = prioritization engine:** Rank qualities (e.g., **availability** > **modifiability** > **cost** ) to focus architectural effort where it buys the most owner value.
* **Trade-offs are architectural:** You can’t maximize everything. More **security** often taxes **usability** ; more **availability** can dent **latency** and **cost** . Make the trade visible and measurable.
* **Prototypes as truth serum:** Architecturally significant spikes validate whether requirements are feasible at target measures (fit criteria) before you commit.
* **Decision logs tie it together:** Record “requirement → decision → consequence” so future changes don’t break hidden assumptions.
* **Continuous alignment:** As discovery updates requirements, revisit structure. As structure evolves, revisit measures. No “set and forget.”

## How to do it

* **Start-with-problem:** Frame the **business problem** and desired **change in work** before features. Tie each requirement to an outcome (risk: building a polished mismatch).
* **Separate what vs how-well:** Capture **functional** behaviors and **fit criteria** for qualities separately. Numbers beat adjectives (risk: “fast” becomes untestable debt).
* **Model the work:** Map tasks, events, and vocabulary. Use scenarios to surface missing behaviors (risk: stakeholder statements are partial and solution-biased).
* **Optimize for owner value:** Identify the **owner** , quantify benefit/cost, and negotiate scope by value slices (risk: over-serving low-value niches).
* **Make it measurable:** Add **fit criteria** to every requirement (e.g., “p95 ≤ 2s, 99.9% over 30 days”). If you can’t test it, it’s a **wish** , not a requirement.
* **Elicit beyond “better version of now”:** Facilitate discovery (workshops, prototypes, counter-examples). Record assertions as **inputs** , not gospel (risk: locking in yesterday’s design).
* **Use quality-attribute scenarios:** For each attribute, write **Stimulus → Response → Measure** (e.g., “During peak load, API responds ≤ 300 ms for 95% of requests”). Drive architecture with these levers.
* **Tailor the process, not the rigor:** Work deliverable-first (goals, glossary, context, scenarios, fit criteria). Adjust depth/sequence to risk/complexity (risk: rigid ceremony or chaotic skipping).
* **Document rationale lightly:** Capture the “why” once: decision logs linking requirements ⇄ architectural choices (risk: future changes break invisible assumptions).
* **Continuously align with architecture:** Use **utility trees** to prioritize qualities, run **architectural spikes/prototypes** , and revisit trade-offs as knowledge changes (risk: drifting architecture–requirements gap).

## Examples / Pitfalls

* **E-commerce performance (latency vs cost)**
  * **Requirement:** “Handle 1,000 concurrent users; p95 ≤ 2 s; p99 ≤ 3 s.”
  * **Architecture response:** Load balancer + distributed cache + async I/O.
  * **Trade-offs:** Availability ↑, latency ↓; **cost** and **operational complexity** ↑; **consistency** risks with caching.
  * **Pitfall:** Hitting p95 but missing p99 during sales spikes.
  * **Fix:** Add fit criteria for p99 and warm-up plans; implement cache TTLs + write-through; run peak-load drills.
* **Healthcare security (security vs usability)**
  * **Requirement:** “HIPAA compliant; all PHI encrypted at rest/in transit; audit within 24 h.”
  * **Architecture response:** End-to-end TLS, field-level encryption, centralized IAM, immutable audit log.
  * **Trade-offs:** **Security** ↑; **usability** and **supportability** may suffer (MFA friction, key rotation).
  * **Pitfall:** Clinicians bypassing flows (shared accounts, sticky notes) to save time.
  * **Fix:** Task-fit MFA (biometrics/SSO), least-privilege roles, session timeouts tuned to clinical rhythms; measure task time as a quality attribute.
* **Streaming analytics (freshness vs accuracy)**
  * **Requirement:** “Dashboard freshness ≤ 5 s; accuracy ≥ 99.5%.”
  * **Architecture response:** Event bus + stream processors + approximate windows.
  * **Trade-offs:** **Latency** ↓, but approximate aggregation and **exactly-once** semantics get harder.
  * **Pitfall:** Silent double counts on retries; accuracy drifts under backlog.
  * **Fix:** Idempotent keys + de-dup store; watermarking + backpressure metrics; publish accuracy SLO with confidence intervals.
* **Mobile field app (availability vs consistency)**
  * **Requirement:** “Works offline; sync conflicts resolved < 10 s; data loss = 0.”
  * **Architecture response:** Local-first storage, CRDT/OT conflict resolution, background sync.
  * **Trade-offs:** **Availability** ↑; **consistency** becomes **eventual** ; **data model** complexity ↑.
  * **Pitfall:** Underspecified conflict policy → surprising merges.
  * **Fix:** Write explicit conflict scenarios (Stimulus → Response → Measure); surface user-resolvable conflicts with clear rules and logs.
* **Legacy platform constraint (time-to-market vs modifiability)**
  * **Requirement:** “Ship in 8 weeks; must run on Vendor DB X.”
  * **Architecture response:** Strangler façade + anti-corruption layer + feature toggles.
  * **Trade-offs:** **Time-to-market** ↑; **modifiability** and **performance** may degrade due to translation layers.
  * **Pitfall:** Temporary façade becomes permanent, blocking modernization.
  * **Fix:** Decision log with exit criteria; track “strangler removal” milestones; performance budget per call path with regression tests.

## Conclusion (takeaways)

* **Discover, don’t invent:** Requirements live in the domain; find them by understanding work.
* **Two axes matter:** **What** it does and **how well** —both measurable.
* **Owner value rules:** Scope is a value optimization problem.
* **Architecture ⇄ Requirements:** Use quality scenarios, utility trees, and prototypes to keep them locked together.
* **Write just-enough:** Precision and rationale beat page count.

## Recommended Reading

* Robertson, S., & Robertson, J. *Mastering the Requirements Process: Getting Requirements Right* (3rd ed.). Addison-Wesley, 2012.
* Bass, L., Clements, P., & Kazman, R. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.
* Rozanski, N., & Woods, E. *Software Systems Architecture: Working with Stakeholders Using Viewpoints and Perspectives* (2nd ed.). Addison-Wesley, 2012.
* Wiegers, K., & Beatty, J. *Software Requirements* (3rd ed.). Microsoft Press, 2013.
* ISO/IEC/IEEE 29148: *Systems and Software Engineering — Life Cycle Processes — Requirements Engineering* , 2018.

A requirement is a precise statement of what a product must do or how well it must do it—measurable, justified, and traceable to owner value.

## What is it?

A requirement is **either** a capability the product must perform (**functional** ) **or** a quality it must exhibit (**non-functional/quality attribute** ) to be acceptable or attractive. Requirements already exist in the problem domain; our job is to **discover** them, not invent them.

Requirements are valid when they’re (a) justified by intrinsic domain needs or by the client’s value case, (b) stated precisely enough to be **tested** , and (c) bounded by legitimate **constraints** (law, budget, platforms, deadlines).

## Why it matters (owner value + risks)

Getting requirements right maximizes **owner value** —benefit per cost and disruption—by aligning solution scope with real work. Weak requirements create expensive risks: feature churn, local optimizations that hurt the whole, fragile architectures, and untestable promises. Strong requirements sharpen trade-offs among **quality attributes** (performance, security, usability, modifiability) so architecture can be purposeful, not accidental.

## Connection between Architecture and Requirements

Architecture and requirements shape each other. Treat them as a feedback loop, not a handoff.

* **Requirements drive structure:** Functional flows and **quality scenarios** (latency, availability, security) determine boundaries, protocols, deployment topology. Example: p99 latency ≤ 300 ms → caching, partitioning, async I/O.
* **Architecture refines requirements:** Early choices expose new constraints and work clarifications. Example: event-driven backbone → require idempotency, exactly-once semantics become “must-haves.”
* **Utility tree = prioritization engine:** Rank qualities (e.g., **availability** > **modifiability** > **cost** ) to focus architectural effort where it buys the most owner value.
* **Trade-offs are architectural:** You can’t maximize everything. More **security** often taxes **usability** ; more **availability** can dent **latency** and **cost** . Make the trade visible and measurable.
* **Prototypes as truth serum:** Architecturally significant spikes validate whether requirements are feasible at target measures (fit criteria) before you commit.
* **Decision logs tie it together:** Record “requirement → decision → consequence” so future changes don’t break hidden assumptions.
* **Continuous alignment:** As discovery updates requirements, revisit structure. As structure evolves, revisit measures. No “set and forget.”

## How to do it

* **Start-with-problem:** Frame the **business problem** and desired **change in work** before features. Tie each requirement to an outcome (risk: building a polished mismatch).
* **Separate what vs how-well:** Capture **functional** behaviors and **fit criteria** for qualities separately. Numbers beat adjectives (risk: “fast” becomes untestable debt).
* **Model the work:** Map tasks, events, and vocabulary. Use scenarios to surface missing behaviors (risk: stakeholder statements are partial and solution-biased).
* **Optimize for owner value:** Identify the **owner** , quantify benefit/cost, and negotiate scope by value slices (risk: over-serving low-value niches).
* **Make it measurable:** Add **fit criteria** to every requirement (e.g., “p95 ≤ 2s, 99.9% over 30 days”). If you can’t test it, it’s a **wish** , not a requirement.
* **Elicit beyond “better version of now”:** Facilitate discovery (workshops, prototypes, counter-examples). Record assertions as **inputs** , not gospel (risk: locking in yesterday’s design).
* **Use quality-attribute scenarios:** For each attribute, write **Stimulus → Response → Measure** (e.g., “During peak load, API responds ≤ 300 ms for 95% of requests”). Drive architecture with these levers.
* **Tailor the process, not the rigor:** Work deliverable-first (goals, glossary, context, scenarios, fit criteria). Adjust depth/sequence to risk/complexity (risk: rigid ceremony or chaotic skipping).
* **Document rationale lightly:** Capture the “why” once: decision logs linking requirements ⇄ architectural choices (risk: future changes break invisible assumptions).
* **Continuously align with architecture:** Use **utility trees** to prioritize qualities, run **architectural spikes/prototypes** , and revisit trade-offs as knowledge changes (risk: drifting architecture–requirements gap).

## Examples / Pitfalls

* **Trade-off example:** To meet **availability** (99.95%), we add redundancy and failover. **Cost/complexity ↑** , **latency** may ↑. Owner accepts latency p95 +50 ms to avoid revenue loss from downtime.
* **E-commerce scenario:** “Handle 1,000 concurrent users with p95 ≤ 2 s.” Drives load balancer + distributed cache. Pitfall: forgetting cache consistency and **modifiability** costs.
* **Healthcare constraint:** Regulatory compliance mandates encryption + access controls. Pitfall: security hardening impacts **usability** ; mitigate with task-fit workflows and SSO.
* **Anti-pattern:** 120-page spec with vague adjectives. Nobody reads it, nobody can test it. Replace with concise requirements + fit criteria + examples.

## Conclusion (takeaways)

* **Discover, don’t invent:** Requirements live in the domain; find them by understanding work.
* **Two axes matter:** **What** it does and **how well** —both measurable.
* **Owner value rules:** Scope is a value optimization problem.
* **Architecture ⇄ Requirements:** Use quality scenarios, utility trees, and prototypes to keep them locked together.
* **Write just-enough:** Precision and rationale beat page count.

## Recommended Reading

* Robertson, S., & Robertson, J. *Mastering the Requirements Process: Getting Requirements Right* (3rd ed.). Addison-Wesley, 2012.
* Bass, L., Clements, P., & Kazman, R. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.
* Rozanski, N., & Woods, E. *Software Systems Architecture: Working with Stakeholders Using Viewpoints and Perspectives* (2nd ed.). Addison-Wesley, 2012.
* Wiegers, K., & Beatty, J. *Software Requirements* (3rd ed.). Microsoft Press, 2013.
* ISO/IEC/IEEE 29148: *Systems and Software Engineering — Life Cycle Processes — Requirements Engineering* , 2018.
