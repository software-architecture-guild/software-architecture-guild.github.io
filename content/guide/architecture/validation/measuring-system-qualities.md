---
weight: 303
title: "Measuring System Qualities"
description: "This article explains what system qualities are, how to measure them in running systems and code, and how to use those measurements to guide architecture."
icon: "article"
date: "2025-01-19T15:08:52+01:00"
lastmod: "2025-01-19T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

System qualities like performance, availability, and security are why most architecture decisions exist in the first place. Measuring them turns hand-wavy “it should be fast and reliable” into concrete evidence that you can use to steer design, refactoring, and operational work.

## Why Measuring System Qualities Matters

System qualities determine whether your architecture is actually fit for purpose, not just elegant on paper. Measuring them gives you a feedback loop: you see where the system is today, change something, and see whether things got better or worse. Without that loop, you are guessing.

### Architecture Is Mostly About Qualities

Features define *what* the system does, but architecture mostly shapes *how* it behaves under stress: load, failures, attacks, and constant change. Decisions about deployment topology, data ownership, communication patterns, and technology choices all trade off qualities like performance, resilience, and modifiability.

If you never measure these qualities, you have no idea whether those trade-offs worked out. You may have over-engineered parts nobody cares about and under-invested in the paths that actually carry revenue or reputation risk.

### From Gut Feel to Feedback Loops

Many teams treat qualities as one-off checklist items: “We did a performance test once,” “Security signed off the design two years ago.” That’s not enough. Qualities drift over time as traffic grows, features pile up, and infrastructure changes under you.

Measurement makes qualities part of everyday engineering. You take snapshots regularly, compare them over time, and react before a slow trend turns into an incident. Measure → decide → change → measure again becomes part of the architecture process, not an afterthought.

## What Exactly Are System Qualities?

System qualities are the non-functional behaviors that matter to stakeholders: how fast, how reliable, how safe, how maintainable, and so on. They are often called quality attributes, but labels matter less than being precise about what you mean and how you’ll observe it.

### Defining System Qualities Clearly

Each quality needs a clear, operational definition. “The system should be fast” is useless; “search results for logged-in customers should appear within 500 ms at the 95th percentile under normal peak load” is something you can test and monitor.

Most big, vague words (“reliability”, “security”, “maintainability”) are actually bundles of more concrete traits. For example, “reliability” might combine availability, data integrity, and graceful degradation. Splitting big words into smaller, measurable pieces makes them much easier to work with.

### Artifact and Operational Measurements

There are two broad ways to measure qualities: by looking at *artifacts* and by looking at *operational behavior*.  

* Artifact measurements come from designs, code, schemas, configurations, and dependency graphs. They are good for predicting qualities like maintainability and testability, and you can apply them before everything is deployed.  
* Operational measurements come from running systems: logs, metrics, traces, error reports, and user-observed behavior. They show how the system actually behaves under real workloads and failure modes.  

You need both. Artifact measurements tell you where structural risk is accumulating; operational measurements tell you whether users and the business feel it yet.

### Internal vs External Views

Each measurement also has a “who cares?” dimension:  

* Internal measurements matter mostly to engineers and operators: CPU usage, queue depth, dependency cycles in code, time to rebuild indexes.  
* External measurements matter to users and business stakeholders: response time for key journeys, uptime percentages, error rates, failed orders, security incidents.  

A healthy architecture measurement strategy covers all four quadrants: internal/external × artifact/operational. That way you see both the internal structural health and the external experience.

## How to Measure Key System Qualities

Different qualities behave differently under measurement. You can reuse techniques—tests, logs, synthetic traffic, models—but you need to aim them carefully for each quality.

### Performance

Performance is about *how quickly* the system responds or completes work for a given workload.

Useful measures focus on:  

* Response time distributions (median, p95, p99) for important operations.  
* Throughput for batch or streaming workloads.  
* Performance under representative loads and data sizes, not just toy scenarios.  

You usually start with synthetic tests in controlled environments to find bottlenecks, then confirm and monitor in production. The gap between measured performance and your target tells you whether architecture changes are needed—more caching, better indexing, different communication patterns, or fewer cross-service hops.

### Scalability

Scalability is about *how behavior changes* as you vary load and resources. You’re asking: “If we double traffic, what happens to latency and error rates? If we double compute, how much more work can we handle?”

Measuring scalability involves controlled experiments:  

* Increase load in steps and see when latency, queue length, or error rates start to blow up.  
* Vary resources (more instances, more CPU, more I/O) and see whether capacity increases proportionally.  

Rarely will you get perfect linear scaling. The point is to discover where the architecture’s current bottlenecks are (shared databases, serialized resources, single-threaded workflows) and what kind of scaling curve you actually have.

### Availability and Resilience

Availability is the proportion of time the system is usable. In practice, it combines two behaviors: how often you fail and how quickly you recover.

Key measurements include:  

* Error rates and downtime for key user journeys over defined windows.  
* Mean time between failures (MTBF) and mean time to recover (MTTR).  
* Behavior under planned events: deployments, failovers, backups, chaos experiments.  

In many systems, reducing MTTR is more realistic than eliminating all failures. Measuring how quickly you can detect and recover from failures gives you a handle on whether your redundancy, failover strategies, runbooks, and observability are doing their job.

### Security

Security is the hardest quality to “measure” directly; there is no single number for “how secure” you are. Instead, you rely on proxy metrics and the results of security activities.

Typical inputs are:  

* Counts and severity of known vulnerabilities in code and dependencies.  
* Results from penetration tests and automated security scans.  
* Configuration and infrastructure checks (open ports, weak ciphers, misconfigurations).  
* Frequency and impact of actual security incidents.  

These metrics don’t give absolute assurance, but they show how effective your security practices are and where you are exposed. The important part is treating security measurement as continuous work, not a one-time certification.

### Maintainability

Maintainability is about how easy it is to understand, change, and safely deploy the system. You can’t measure “ease” directly, but you can track structural and historical proxies:  

* Structural metrics: dependency cycles, propagation cost, size of “god” modules, complexity scores.  
* Change metrics: how often files change, where bug fixes concentrate, how long it takes to implement changes in different modules.  
* Behavioral metrics: time to onboard new engineers to a subsystem, number of people needed to safely change a module.  

Trends matter more than exact values. If propagation cost and cyclicity keep creeping up, and changes in certain modules always take longer and break more often, you have evidence that maintainability is eroding and architecture attention is overdue.

## From Metrics to Engineering Decisions

Collecting numbers is easy. Using them to guide architecture is the hard part. The goal is to move from “we have dashboards” to “these measurements regularly influence what we build and how we evolve the system.”

### Fitness Functions and Quality Gates

One way to make metrics actionable is to turn them into *fitness functions*: automated checks that evaluate whether the system still meets quality goals.

Examples:  

* A performance test that fails if p95 latency for checkout exceeds 500 ms.  
* A structural check that fails the build if new dependency cycles appear between modules.  
* A resilience test that simulates instance failures and fails if requests are dropped instead of retried or rerouted.  

These checks become quality gates in your CI/CD pipelines. Instead of passively watching dashboards drift, you get fast feedback when a change threatens a quality you care about.

### Goal–Question–Metric for Fuzzy Qualities

For messy problems—like “reduce risk from our payment provider” or “improve user trust in the system”—it’s hard to pick metrics directly. A simple pattern helps: Goal–Question–Metric (GQM).

* Start with a **goal**: for example, “Detect provider failures early enough to protect users from long delays.”  
* Derive **questions**: “How close are we to hitting rate limits?”, “Are failures coming from us or them?”, “How long do jobs stay in queues?”  
* Define **metrics** that answer those questions: queue depth, provider error rate, time jobs spend in each stage, usage as a percentage of quota.  

This structure keeps you honest. You’re not measuring things just because the tool makes them easy; you measure them because they answer specific questions about a clear goal.

### Choosing Where to Start

You don’t need a huge measurement program to get value. Pick a small number of qualities that matter most right now for your system and context. For example:  

* A scaling startup with availability problems might focus on error rates, MTTR, and queue depth on critical flows.  
* A large enterprise with legacy systems might focus on structural metrics (cycles, propagation cost) and change lead time in the worst modules.  
* A team doing a risky migration might focus on fidelity between old and new behavior and performance under the same load.  

The crucial part is to act on what you see. If a metric never changes any priorities, you can probably stop measuring it.

## Summary

Measuring system qualities turns architecture from a one-time design exercise into an ongoing engineering practice. By defining qualities precisely, choosing meaningful measurements, and wiring them into feedback loops, you see how your architecture actually behaves and where it is drifting.

Different qualities require different techniques: performance and scalability need realistic workloads, availability cares about failure and recovery, security relies on proxies, and maintainability depends on structural and historical patterns. When you turn those measurements into fitness functions and GQM-driven dashboards, they stop being vanity numbers and start steering design.

The result is an architecture that evolves intentionally. Instead of arguing from gut feel, you can show how qualities are trending, where risks are highest, and which changes will give you the biggest payoff.

## Recommended Reading

#### Books
* Ciceri, Christian, Dave Farley, and Neal Ford (2022). *Software Architecture Metrics*. O’Reilly Media.  
  * **Chapter 7: The Role of Measurement in Software Architecture**\
    Explains why measurement is central to modern architecture and how to weave it into continuous feedback loops.  
  * **Chapter 8: Progressing from Metrics to Engineering**\
    Shows how to turn raw metrics into architecture fitness functions that actively guard system qualities.  
  * **Chapter 9: Using Software Metrics to Ensure Maintainability**\
    Details structural and historical metrics that help you keep systems maintainable and avoid “big ball of mud” erosion.  
  * **Chapter 10: Measure the Unknown with the Goal–Question–Metric Approach**\
    Introduces GQM as a structured way to measure fuzzy or unknown aspects of systems by starting from goals and questions.
