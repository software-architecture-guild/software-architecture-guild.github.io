---
weight: 142
title: "Addressing Characteristics"
description: "This article explains how to implement software architecture characteristics using architectural tactics and patterns. Learn to address quality attributes like performance, availability, and security by combining tactics into effective architectural patterns."
icon: "article"
date: "2025-10-14T00:00:00+01:00"
lastmod: "2025-10-14T00:00:00+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Architectural characteristics (such as performance, availability, security, modifiability, usability, deployability, and scalability) become real through concrete design choices. This article connects those quality needs to the tactics and patterns that implement them. Tactics are small, focused design strategies that influence a specific attribute; patterns are broader, recurring solutions that combine multiple tactics to solve common problems under known quality pressures.

## Architectural Tactics

##### What Tactics Are

Tactics are targeted design strategies used to influence a single quality attribute. They are smaller and more focused than patterns, acting as building blocks that can be composed into larger structures. Their purpose is to systematically address quality attribute requirements by giving architects precise levers to pull.

##### Categories of Tactics

- **Availability tactics**
  - *Fault detection:* ping/echo, heartbeats, exceptions
  - *Fault recovery:* failover, retries, rollback, reboot
  - *Fault prevention:* remove faults through testing, use redundancy
- **Performance tactics**
  - *Resource management:* resource scheduling, workload balancing
  - *Latency reduction:* caching, algorithm optimization
  - *Throughput optimization:* concurrency, parallel processing
- **Security tactics**
  - *Resistance:* authentication, encryption
  - *Detection:* auditing, intrusion detection
  - *Recovery:* reconfiguration, failover mechanisms
- **Modifiability tactics**
  - *Localize changes:* encapsulation, modularity
  - *Reduce coupling:* dependency inversion, interfaces
  - *Postpone binding:* runtime configuration, late binding
- **Usability tactics**
  - *User initiative:* sensible defaults, undo/redo
  - *Feedback:* immediate and meaningful responses
  - *Error prevention and recovery:* input validation, clear error messaging

##### How Tactics Are Used

- Tactics make attribute goals actionable by providing specific, repeatable moves.
- They compose into patterns, where multiple tactics are arranged to achieve a broader solution.
- They clarify trade-offs by making the influence on one attribute explicit when optimizing for another.

## Architectural Patterns

##### What Patterns Are

Architectural patterns are high-level, proven solutions to recurring design problems. A pattern defines a system’s structural organization and interaction style, usually combining multiple tactics to meet attribute goals in a specific context.

##### Why Patterns Matter

- They encode practices that have worked repeatedly, reducing design risk.
- They align structure and interactions with prioritized attributes, so the resulting system is more likely to meet its quality goals.
- They accelerate design by offering a ready-made shape that can be adapted.

## Common Architectural Patterns

- **Layered architecture**
  - *Description:* system responsibilities organized into layers with clear boundaries
  - *Use cases:* enterprise and web applications
  - *Quality attributes:* modifiability, portability, scalability
  - *Examples:* OSI model, MVC
- **Client–server architecture**
  - *Description:* clients request services; servers provide them
  - *Use cases:* online services, file sharing
  - *Quality attributes:* scalability, availability, modifiability
  - *Examples:* web apps, database-backed systems
- **Event-driven architecture**
  - *Description:* components communicate via events to enable loose coupling
  - *Use cases:* real-time and notification systems
  - *Quality attributes:* scalability, modifiability
  - *Examples:* publish–subscribe, reactive approaches
- **Microservices architecture**
  - *Description:* system decomposed into small, independently deployable services
  - *Use cases:* cloud-native, large-scale systems
  - *Quality attributes:* modifiability, scalability, deployability
  - *Examples:* e-commerce platforms, streaming services
- **Pipe-and-filter architecture**
  - *Description:* processing split into independent filters connected by pipes
  - *Use cases:* data processing, compilers
  - *Quality attributes:* modifiability, reusability
  - *Examples:* Unix pipelines, ETL pipelines
- **Repository architecture**
  - *Description:* centralized data in a shared repository accessed by components
  - *Use cases:* data-intensive systems
  - *Quality attributes:* integrability, scalability
  - *Examples:* database management systems

## Combining Tactics and Patterns

##### How Tactics Power Patterns

Patterns rely on tactics to meet attribute goals along their critical paths. Each pattern’s structure provides places to apply tactics that tune behavior without breaking overall form.

- *Example:* in client–server, performance tactics like load balancing and availability tactics like failover complement the partitioned responsibilities to meet demanding service levels.

##### Selecting a Pattern by Attribute Pressure

- For scalability, favor event-driven or microservices styles that support parallelism and independent evolution.
- For modifiability, layered or pipe-and-filter designs help localize change and reduce coupling.

## Trade-offs to Surface and Manage

- **Performance vs. Modifiability:** Layers add indirection and potential overhead but improve modularity and clarity; optimizations (for example, inlining, caching) can reduce modularity.
- **Security vs. Usability:** Stronger controls (for example, multi-factor authentication) can complicate user workflows, reduce ease of use, and slow interactions.
- **Cost vs. Scalability:** Microservices increase operational investment in orchestration and deployment tooling.
- **Availability vs. Cost:** Redundancy improves availability while increasing hardware and maintenance expense.
- **Scalability vs. Performance:** Distributed mechanisms can introduce latency.
- **Deployability vs. Security:** Simplifying deployment may open vulnerabilities.
- **Reusability vs. Modifiability:** Generalized components can become complex and harder to tailor.

## Design Checklist for Patterns and Tactics

- **Quality attributes:** identify and prioritize the few that matter most.
- **Pattern selection:** choose a structure whose strengths match those priorities and use cases.
- **Tactic integration:** apply attribute-specific tactics within the chosen structure.
- **Trade-off analysis:** evaluate side effects on other attributes before committing.
- **Validation:** prototype or test to confirm that the chosen tactics and patterns achieve the intended results.

## Examples in Practice

- **E-commerce applications**
  - *Context and drivers:* explosive traffic, revenue-critical flows, frequent product and pricing updates. Primary characteristics are scalability, availability, performance, and security.
  - *Pattern:* microservices for scalability and independent deployment. This structure lets teams evolve checkout, catalog, and search independently while scaling hot paths without scaling everything.
  - *Tactics:* caching for performance, encryption for security, retries for availability.
  - *How it comes together:* caching reduces latency on catalog and search reads; encryption protects customer and payment data in transit and at rest; retries with backoff improve resilience for transient failures in payment or inventory services.
  - *Quality scenarios to validate:* p95 response time for “Add to Cart → Pay” within target under peak load; zero critical security findings for payment flows; successful checkout despite transient downstream failures.
  - *Trade-offs to manage:* performance vs. modifiability when adding cross-service caches; cost vs. scalability as the number of services and deployments grows.
  - *Evidence and governance:* fitness functions that fail build when latency budgets regress; ADRs capturing caching and service-boundary decisions; time-bounded variances during promotions.

- **Data processing pipelines**
  - *Context and drivers:* large or variable data volumes, evolving transformations, need for predictable throughput. Primary characteristics are modifiability, performance, and availability.
  - *Pattern:* pipe-and-filter for modular transformations. Each filter focuses on a single step; pipes define the flow, making the sequence easy to reason about and change.
  - *Tactics:* parallel processing for performance, fault isolation for availability.
  - *How it comes together:* filters scale horizontally to handle spikes; fault isolation confines failures to a specific stage, allowing retries or reruns without restarting the entire pipeline.
  - *Quality scenarios to validate:* sustained throughput at target data volume; bounded recovery time when a single filter fails; ability to insert a new transformation without affecting unrelated stages.
  - *Trade-offs to manage:* scalability vs. performance if added distribution introduces coordination overhead; reusability vs. modifiability when general-purpose filters become overly complex.
  - *Evidence and governance:* performance tests on representative datasets; ADRs documenting stage boundaries; fitness functions asserting end-to-end completion times and per-stage error rates.

- **Real-time notification systems**
  - *Context and drivers:* high fan-out message delivery, variable event rates, need for responsive user feedback. Primary characteristics are scalability, responsiveness, and operational visibility.
  - *Pattern:* event-driven for responsiveness and scale. Producers emit events; consumers react asynchronously, keeping components loosely coupled.
  - *Tactics:* queuing for performance, monitoring to support security.
  - *How it comes together:* queues smooth bursts and decouples producers from consumers to maintain throughput; monitoring provides visibility into delivery success, anomalies, and misuse patterns that could signal security concerns.
  - *Quality scenarios to validate:* p95 end-to-end delivery time within target under high load; backlog drains to steady state after a spike; alerts trigger when delivery failures or suspicious usage exceed thresholds.
  - *Trade-offs to manage:* scalability vs. performance when multi-hop routing adds latency; deployability vs. security if simplifying operational paths weakens protections.
  - *Evidence and governance:* load and soak tests with burst patterns; ADRs for topic design and consumer responsibilities; fitness functions guarding delivery latency and failure rates.

## Conclusion

Tactics and patterns translate architectural characteristics into concrete structures and behaviors. Tactics are precise levers—caching, retries, encapsulation, and authentication—that directly influence a target attribute. Patterns assemble those levers into proven shapes such as layered, client–server, event-driven, microservices, pipe-and-filter, and repository. Because every choice carries trade-offs, architects align pattern strengths with prioritized attributes, integrate the right tactics along critical paths, and validate results through prototyping or testing. The result is an architecture that addresses stakeholder expectations while balancing competing qualities.

## Recommended Reading

#### Books

- Bass, Len, Paul Clements, and Rick Kazman. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.  
  - **Chapter 13: Architectural Tactics and Patterns**  
    This chapter defines and describes the roles of tactics and patterns, catalogs tactics by quality attribute, outlines common architectural patterns with their attribute implications, and emphasizes the selection and combination of these tactics while managing trade-offs.
