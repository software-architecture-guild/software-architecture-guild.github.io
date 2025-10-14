---
weight: 141
title: "Measuring and Governing"
description: "This article explains how to measure and govern Architecture Characteristics."
icon: "article"
date: "2025-10-14T00:00:00+01:00"
lastmod: "2025-10-14T00:00:00+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Measurement turns architectural intent into observable reality. By attaching concrete metrics to characteristics such as scalability, performance, availability, security, testability, and modifiability, teams get continuous feedback about whether the system behaves as designed. This feedback validates architectural trade-offs, exposes drift early, and supports decisions with evidence rather than intuition. Over the system’s lifecycle, measurement sustains quality goals as requirements evolve and environments change.

## What to Measure and How

Effective measurement starts with a short, critical set of attribute-specific metrics that reflect stakeholder goals and can be gathered repeatedly with low friction.

- **Scalability:** throughput under growth, latency at target percentiles, and resource-efficiency as load increases.\
  *Example:* sustained requests/second during peak load while holding latency targets.
- **Performance:** average and worst-case response time, and throughput for key transactions.\
  *Example:* <200 ms for 95% of requests.
- **Availability:** uptime percentage, MTBF, and MTTR to capture both resilience and recovery.\
  *Example:* 99.99% availability objective with explicit repair targets.
- **Security:** count and severity of discovered vulnerabilities, and frequency of successful attacks.\
  *Example:* zero critical vulnerabilities in production.
- **Testability:** automated coverage proportions and time from defect introduction to detection and fix.\
  *Example:* stable coverage targets with mean time-to-detect trending down.
- **Modifiability:** median time to implement a change and number of modules touched.\
  *Example:* reducing change surface for frequent scenarios.

### Fitness Functions

Fitness functions are executable checks that evaluate a specific characteristic against thresholds. They operationalize architecture by encoding expectations directly in pipelines or runtime checks (for example, page load time under simulated peak, or scaling behavior as users increase). Static fitness functions assess properties at rest (like code structure), while dynamic ones observe runtime or under load (like latency SLO conformance).

## Automating the Feedback Loop

Automation ensures measurement is continuous and trustworthy.

- **Performance testing:** tools that drive load (for example, JMeter, Gatling) to collect response time and throughput across scenarios.  
- **Monitoring and observability:** metrics and dashboards (for example, Prometheus, Grafana, Datadog) for ongoing visibility into SLOs.  
- **Security scanning:** automated probes (for example, OWASP ZAP, Snyk) to surface vulnerabilities early and often.  
- **Code quality and structure:** analyzers (for example, SonarQube, ArchUnit for Java) to watch complexity and structural rules.  
- **CI integration:** run fitness functions and checks on every change to catch regressions immediately and keep evidence fresh.

## Governing Architecture Characteristics

Governance aligns delivery with architectural intent through lightweight standards, automated policy, and transparent exceptions. The aim is to make desired characteristics—such as scalability, performance, availability, security, testability, and modifiability—**observable, enforceable, and adaptable** throughout the lifecycle. Effective governance uses the same ingredients as measurement (clear metrics, thresholds, and continuous feedback) but adds **explicit decision records** and a **managed exception process** so changes remain intentional rather than accidental.

##### Fitness Functions as Policy

Fitness functions operationalize architecture as code. They encode thresholds and checks that run continuously—on every change in CI/CD and, when relevant, during runtime. Treat them as enforceable rules: a passing check signals compliance; a failing check signals non-compliance and triggers action.

- **What they enforce:** target latencies and throughput, scaling behavior under load, uptime and recovery objectives, absence of critical vulnerabilities, test execution expectations, and structural rules that affect modifiability.\
- **Where they run:** pre-merge checks, nightly suites, performance/stress environments, and monitored runtime paths for critical flows.\
- **Outcomes:** immediate feedback to developers, early detection of drift, and consistent application of architectural standards without manual gate keeping.

When a fitness function fails (for example, 95th percentile latency exceeds the threshold), governance requires **either** remediation (tune, refactor, or reconfigure) **or** a documented exception via the variance process. This keeps policy strict on outcomes while flexible on how teams reach them.

##### Architecture Decision Records (ADRs)

ADRs capture **what** was decided, **why** it was chosen, and **which trade-offs** were accepted for a characteristic. They connect metrics and thresholds to the business goals they serve and provide continuity as teams and systems evolve.

- **Content to capture:** problem context, alternatives considered, chosen option, rationale, expected impact on characteristics, and any follow-up measurements or thresholds.\
- **Lifecycle:** propose → review → accept → monitor. As measurements come in, ADRs can be amended or superseded to reflect new evidence.\
- **Value for governance:** traceability from a fitness function’s threshold back to stakeholder needs; clarity when reviewing variances; a shared reference that reduces policy debates and re-litigation.

By pairing ADRs with fitness functions, teams don’t just enforce rules—they **explain them**, making governance teachable and resilient to turnover.

##### Variance Models

Not all deviations are defects. Variance models formalize **when and how** to depart from a rule while preserving architectural integrity and visibility.

- **Variance requests:** a concise statement of the rule being waived, the justification (for example, a temporary performance trade-off to meet a date), risk and mitigation, and a clear sunset or review date.\
- **Approval process:** lightweight review focused on impact to characteristics and alignment with stakeholder goals; decisions recorded and linked to the relevant ADRs and fitness functions.\
- **Time-bounded conditions:** variances expire or are re-evaluated against fresh measurements, preventing “temporary” exceptions from becoming permanent drift.

This approach balances **enforcement with flexibility**. Teams can move forward under constraint, while governance retains control through transparency, justification, and time limits.

##### Making Governance Work Day-to-Day

- **Integrate with automation:** run fitness functions as part of CI/CD so governance signals are continuous and objective.\
- **Start small:** select the few characteristics that matter most and add more as the system and practices mature.\
- **Engage stakeholders:** co-define thresholds to ensure relevance and increase buy-in, reducing cultural resistance.\
- **Review and evolve:** use measurements to recalibrate thresholds, retire obsolete ADRs, and close or extend variances based on evidence.

In combination, fitness functions, ADRs, and variance models create a closed loop: **intent → executable policy → evidence → informed adjustment**. That loop is the core of governing architecture characteristics over time.

## Establishing a Measurement Framework

- **Identify critical characteristics:** select the few that most affect stakeholder outcomes.  
- **Define metrics and thresholds:** make them specific, measurable, and aligned to goals.  
- **Automate measurement:** implement fitness functions and toolchain checks in CI/CD for continuous feedback.  
- **Track and improve:** review results regularly, refine thresholds, and adapt metrics as requirements shift.

## Fitness Functions in Depth

- **Definition:** a measurable, executable test of a targeted characteristic.  
- **Examples:**  
  - Performance—validate page load under peak traffic.  
  - Scalability—simulate user growth and track CPU/memory behavior.  
- **Types:**  
  - **Static:** evaluate at a fixed point (for example, code complexity or dependency rules).  
  - **Dynamic:** observe during execution or stress (for example, latency, error rates, or recovery time).

## Applying Measurement and Governance

##### Microservices Architecture

Distributed services introduce many places where latency, errors, and inconsistencies can hide. Make the desired cross-service behavior explicit, measure it continuously, and encode policy so drift is caught early.

- **What to measure:** end-to-end latency percentiles for critical journeys, per-service throughput and error rates, and data consistency between services after asynchronous operations.\
  *Example:* 95th percentile end-to-end latency ≤ 200 ms for “Place Order”; per-service error rate < 0.5%.
- **How to measure:** instrument services with metrics and tracing to attribute time to specific hops; collect service-level indicators (SLIs) for requests, queues, and retries; retain correlation IDs across boundaries to tie logs and traces together.
- **Fitness functions:** executable checks that fail the build or deployment if API response SLOs, error budgets, or contract tests regress. Include schema/contract verification so consumer–provider expectations don’t drift.\
  *Example:* contract test must pass for every provider build; deployment blocked if p95 latency for “Checkout” exceeds threshold under synthetic load.
- **Governance artifacts:** ADRs record protocol choices, partitioning decisions, and data ownership rules that affect latency and consistency; variances document temporary relaxations (for example, allowing higher p95 during a migration) with a clear sunset and follow-up measurement plan.

##### E-Commerce System

Traffic is busy and revenue-critical paths are short but sensitive. Measurement focuses on protecting customer experience and transaction integrity during peaks; governance keeps optimizations from undermining availability.

- **What to measure:** uptime, page load time for core pages, and transaction throughput across peak windows; inventory and pricing data freshness where asynchronous updates are used.\
  *Example:* 99.99% monthly availability; home/search/product/detail pages p95 < 200 ms; successful checkouts per minute during promotion ≥ baseline.
- **How to measure:** run synthetic journeys at steady and peak loads using performance tests; monitor live SLIs with dashboards for fast regression detection; capture MTTR for incidents affecting cart/checkout.
- **Fitness functions:** guard rails that validate that scale-up actions maintain response targets (for example, autoscaling preserves p95 latency) and that key flows remain within error budgets; block releases if checkout flow SLA fails under test.\
  *Example:* build fails if “Add to Cart → Pay” flow exceeds target error rate in CI load suite; deployment blocked if throughput at peak test drops below threshold.
- **Governance artifacts:** ADRs for caching, database partitioning, and session management decisions that shape performance and availability; variances for time-bound exceptions during events (for example, a temporary cache TTL change), reviewed post-event against collected measurements.

##### Financial Application

Security, availability, and auditability dominate. Measurement provides objective evidence for controls and recovery behavior; governance ensures decisions remain traceable and compliant.

- **What to measure:** vulnerability counts by severity, authentication/authorization success and failure patterns, response times for regulated workflows, and recovery metrics (MTTR) for critical services.\
  *Example:* zero critical vulnerabilities in production; regulated transaction p95 < 200 ms; defined MTTR targets for core services.
- **How to measure:** schedule automated security scans and targeted penetration tests; monitor access patterns and error rates for authentication flows; track recovery steps and times during planned failover exercises.
- **Fitness functions:** policy checks that fail builds when new critical vulnerabilities are detected, or when response times exceed thresholds for regulated operations; structural rules (for example, dependency boundaries) to support modifiability and isolation.\
  *Example:* merge blocked if scanner reports a critical finding; deployment blocked if “Submit Transfer” exceeds latency SLO under stress test.
- **Governance artifacts:** ADRs to document control choices, cryptographic decisions, and required thresholds with their rationale; variances for constrained, temporary deviations (for example, accepting a medium-severity finding with compensating controls), including explicit expiry and re-test requirements.

Across these contexts, the loop is the same: define observable targets for the characteristics that matter, measure continuously, encode expectations as fitness functions, and use ADRs and variances to keep decisions and exceptions deliberate and time-bounded. This ensures scale, speed, and security improvements do not erode availability, usability, or modifiability over time.

## Challenges You’ll Encounter

- **Ambiguity in metrics:** vague or misaligned measures produce misleading signals.  
- **Tool integration:** wiring checks into CI/CD and environments can be non-trivial.  
- **Cultural resistance:** governance perceived as rigid can be ignored; transparency and automation reduce friction.

## Practices That Work

- **Start small:** measure what matters most, then expand.  
- **Automate first:** prefer checks that run themselves on every change.  
- **Engage stakeholders:** co-define metrics and thresholds to ensure relevance and buy-in.  
- **Review and evolve:** revisit measures, thresholds, and variances as the system and goals change.

## Key Takeaways

1. **Measurement is essential** for validating that architectural goals are met and maintained.  
2. **Fitness functions operationalize architecture** by embedding checks into delivery and runtime.  
3. **Governance with flexibility** uses ADRs and variance models to balance consistency with pragmatism.  
4. **Automation drives compliance** by providing frequent, reliable signals with minimal manual effort.  
5. **Iterative refinement** keeps measures and policies aligned with evolving requirements.

## Conclusion

Measuring and governing architecture characteristics keeps quality goals actionable over time. Clear metrics translate intent into objective signals; fitness functions make those signals enforceable in everyday delivery. With automated tooling, documented decisions, and a transparent variance process, teams can adapt to change without losing architectural integrity. Start with the most critical characteristics, encode expectations as executable checks, and evolve both measures and policies as the system grows.

## Recommended Reading

#### Books

- Richards, Mark, and Neal Ford. *Fundamentals of Software Architecture* (2nd ed.). O’Reilly Media, 2024.  
  - **Chapter 6: Measuring and Governing Architecture Characteristics**\
    Informs this article’s focus on defining attribute-specific metrics, implementing automated fitness functions, integrating measurements into CI/CD, and using lightweight governance (ADRs and variances) to balance enforcement with flexibility—applied exactly as outlined in the provided notes.
