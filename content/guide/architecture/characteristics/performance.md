---
weight: 113
title: "Performance"
description: "This article explains what is Performance and how to achieve it."
icon: "article"
date: "2025-10-14T00:00:00+01:00"
lastmod: "2025-10-14T00:00:00+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Performance is a key quality attribute that evaluates how well a system meets its timing and resource-utilization goals under expected workloads. It directly influences user satisfaction, system reliability, and the ability to meet business objectives.

## What Performance Means

Performance is the system’s ability to meet timing constraints and process workloads efficiently. Core aspects include response time (time to react to a stimulus), throughput (work processed per unit time), and resource utilization (CPU, memory, bandwidth, and related capacity).

## Performance General Scenario

A performance scenario specifies constraints and expected behaviors to guide design and evaluation.

- **Stimulus:** A request or workload arrives (user action, batch job).  
- **Source of stimulus:** Internal processes or external actors (users, other systems).  
- **Environment:** Operational context such as peak user load or high network traffic.  
- **Artifact:** The subsystem being evaluated (database, API, etc.).  
- **Response:** The system processes the stimulus.  
- **Response measure:** Response time, throughput, or resource usage metrics.

## Factors That Shape Performance

- **Workload characteristics**: Type, frequency, and size of tasks the system processes.\
  Examples: transactional banking workloads vs. computational simulations.
- **System resources**: Availability and capacity of processors, memory, storage, and network.\
  Example: insufficient memory causing disk swapping and degradation.
- **System behavior**: Interactions among components, including communication and synchronization.\
  Example: excessive inter-process communication creating bottlenecks.
- **Concurrency**: Ability to handle multiple tasks simultaneously without harmful contention.\
  Example: threads competing for shared resources.
- **Failure recovery**: Fault handling and retries that can temporarily degrade performance.

## Architectural Tactics for Performance

- **Reduce resource demand**: Increase efficiency via algorithm/data structure optimization; cache results to avoid recomputation or repetitive queries; manage priorities so critical work proceeds first; shed load by dropping low-priority tasks during spikes.  
- **Manage resources**: Schedule resources for fair and efficient allocation; balance workload across processors, servers, or networks; replicate resources (servers, databases) to distribute load; introduce concurrency to execute tasks in parallel.  
- **Reduce latency**: Cut communication overhead by minimizing message size/count; optimize data access with indexing or partitioning; pipeline dependent tasks to overlap execution and reduce idle time.

## Navigating Trade-offs

Improving performance often shifts other qualities and constraints.

- **Modifiability:** Hard-coded paths and tight coupling can speed execution but reduce ease of change.  
- **Security:** Caching and similar tactics may expose sensitive data and require safeguards.  
- **Availability:** Load shedding can lower service levels for low-priority requests.  
- **Cost:** Gains may require added infrastructure or specialized software.

## A Practical Design Checklist

- **Requirements:** Define concrete targets for response time, throughput, and utilization.  
- **Scalability:** Ensure capacity to handle growth without degradation.  
- **Bottleneck analysis:** Identify slow queries, saturated processors, and other hot spots.  
- **Concurrency management:** Design to minimize contention for shared resources.  
- **Monitoring and testing:** Validate performance under realistic workloads and observe it in operation.

## Performance in Practice

- **E-commerce systems:** Sales events demand load balancing, caching, and efficient queries to maintain low latency.  
- **Streaming platforms:** High throughput and minimal buffering are achieved with content delivery networks and optimized protocols.  
- **Financial systems:** Transaction processing must meet strict response time requirements while handling peak loads efficiently.

## Conclusion

Performance ensures a system can meet timing and capacity goals under expected conditions. It is achieved by lowering resource demand, managing resources deliberately, and reducing latency—guided by clear scenarios and measured with meaningful metrics. Because performance tactics interact with modifiability, security, availability, and cost, architects must balance improvements against these trade-offs and validate them through targeted testing and monitoring.

## Recommended Reading

#### Books

- Bass, Len, Paul Clements, and Rick Kazman. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.  
  - **Chapter 8: Performance**\
    Informed this article’s definition, performance scenario elements (stimulus, source, environment, artifact, response, response measures), factors affecting performance, architectural tactics (resource demand reduction, resource management, latency reduction), trade-offs, checklist, and practice examples.
