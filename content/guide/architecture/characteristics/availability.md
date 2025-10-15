---
weight: 110
title: "Availability"
description: "This article explains what availability is and how to achieve it."
icon: "article"
date: "2025-10-14T00:00:00+01:00"
lastmod: "2025-10-14T00:00:00+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Availability is the readiness of a system to perform its functions at any given time. In domains that demand high reliability, such as financial services, healthcare, and online platforms, availability becomes a central concern because the system must continue delivering its services even in the face of failures. It is commonly expressed as a percentage of operational time over total time; for example, “five nines” (99.999%) translates to only a few minutes of downtime per year.

## Specifying Availability with Scenarios

Availability benefits from explicit scenarios that make requirements measurable and testable. A scenario names the failure stimulus and its source, states the environment and affected artifact, and defines the expected response and response measure. Typical stimuli include hardware crashes, software bugs, or malicious attacks. Environments range from regular operation to peak traffic. Artifacts include databases or network links. Responses encompass detection, failover, restart, or rollback. Response measures include recovery time and data loss thresholds.

## Factors That Influence Availability

Failures progress from root causes (faults) to their manifestation (errors) to visible disruption (failures). Detecting and mitigating faults quickly—through health checks, retries, backups, and failover—helps contain impact. Redundancy reduces exposure to single points of failure, while planned maintenance can temporarily lower availability yet prevents larger incidents in the long run.

## Tactics to Achieve Availability

Availability tactics address the lifecycle of faults: prevention, detection, recovery, and repair.

- **Fault prevention**
  - Remove faults: static analysis, rigorous testing, formal verification
  - Minimize faults: modular design, coding standards

- **Fault detection**
  - Ping/echo health checks
  - Heartbeats between components
  - Exceptions and proper handling
  - Self-tests that run in production

- **Fault recovery**
  - Retry failed operations
  - Failover to redundant components
  - Rollback to a known-good state
  - Restart components or services

- **Fault repair**
  - Replace faulty components dynamically
  - Reconfigure to route around failure

## Design Trade-offs

Availability raises classic tensions that must be balanced against business goals. Redundancy and failover improve resilience but add resource overhead and may introduce latency during recovery. High availability architectures are more expensive to build and operate, and sophisticated fault tolerance demands additional development effort. Security controls such as authentication and firewalls can occasionally disrupt service paths, affecting perceived availability.

## Designing for Availability

Translating goals into design means stating explicit requirements (maximum downtime, target recovery times) and identifying where redundancy matters most. Fault detection mechanisms need to be thorough and observable; failover and recovery paths should be engineered to minimize downtime and data loss. Data integrity is part of availability: recovery should not corrupt or lose data. Testing is essential—simulate failures and rehearse recovery to validate that tactics work under realistic conditions.

## Examples in Context

Banking systems press for near-perfect availability to safeguard transactions and trust. Large online platforms must withstand server crashes and traffic spikes without noticeable downtime to preserve user satisfaction and engagement.

## Conclusion

Availability ensures a system continues to provide its services despite faults or failures. Achieving it requires a structured approach that spans prevention, rapid detection, efficient recovery, and long-term repair. Architects weigh performance, cost, and security trade-offs while applying tactics such as redundancy, failover, and exception handling. Clear scenarios, targeted design choices, and rigorous testing combine to minimize downtime and maintain trust in critical systems.

## Recommended Reading

#### Books

- Bass, Len, Paul Clements, and Rick Kazman. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.  
  - **Chapter 5: Availability**\
    Defines availability as a system’s readiness to deliver service and uses scenario-based specifications (stimulus, source, environment, response) to express and evaluate how a system continues operating in the presence of faults.
