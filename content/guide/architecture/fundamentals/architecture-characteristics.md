---
weight: 35
title: "Architecture Characteristics"
description: "This article explains key architecture characteristics (non-functional requirements), detailing their definitions, implementation tactics, and trade-offs. Learn how these attributes, such as scalability, performance, and security, shape the design of robust and effective software systems."
icon: "article"
date: "2024-12-15T09:25:26+01:00"
lastmod: "2024-12-15T09:25:26+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---
## Introduction

In software architecture, **architecture characteristics** (often referred to as "non-functional requirements" or "-ilities") define the qualities or attributes a system must exhibit to meet business goals and operational needs. While functional requirements dictate *what* a system does, architecture characteristics determine *how well* it performs those functions under real-world conditions.

This article explores architectural characteristics, why they matter, how to define them, and how they shape the architecture of software systems.

---

## What Are Architecture Characteristics?

Architecture characteristics represent the critical non-functional attributes of a software system. These characteristics are often tied to business drivers and operational priorities and serve as the metrics for assessing a system's success.

#### Examples of Architecture Characteristics

1. **Scalability**: The ability of a system to handle increased load by adding resources.
2. **Performance**: The responsiveness and speed of the system under specified conditions.
3. **Availability**: The system’s uptime and ability to remain operational.
4. **Security**: Protection against unauthorized access, data breaches, and other threats.
5. **Modifiability**: Ease of making changes to the system’s functionality or structure.
6. **Testability**: The extent to which the system can be effectively tested.
7. **Deployability**: How quickly and reliably the system can be deployed to production.

### Explicit Architecture Characteristics

Explicit architecture characteristics are those that are clearly defined, documented, and specified during the initial phases of software development. These characteristics are often stated in the requirements document or design specifications and serve as direct inputs to architectural decisions.

* **Examples of Explicit Characteristics:**
  * **Performance**: Requirements related to system responsiveness and processing speed.
  * **Scalability**: The ability of the system to handle increased load or demand.
  * **Security**: Measures to ensure data protection and prevent unauthorized access.
  * **Availability**: Ensuring the system remains operational and accessible with minimal downtime.
* **Characteristics of Explicit Attributes:**
  * **Defined Early**: Explicit characteristics are identified during the planning and design stages.
  * **Measurable**: These characteristics are typically associated with clear, quantifiable metrics.
  * **Stakeholder-Driven**: They are often derived from stakeholder needs and business goals.

### Implicit Architecture Characteristics

Unlike explicit architecture characteristics, implicit architecture characteristics are not directly specified or documented during the early stages of development. They emerge as a result of design and implementation decisions and often become evident during system operation or maintenance.

* **Examples of Implicit Characteristics:**
  * **Maintainability**: The ease with which the system can be updated or modified.
  * **Modifiability**: The ability to add new features or components without significant changes to the existing system.
  * **Portability**: The effort required to deploy the system in different environments.
  * **Usability**: How easy it is for users to interact with the system.
* **Characteristics of Implicit Attributes:**
  * **Emergent**: Implicit characteristics become apparent over time, often during later stages of development or deployment.
  * **Harder to Measure**: Since implicit characteristics are not explicitly defined, they may lack clear metrics.
  * **Influenced by Context**: These characteristics depend on how the system is used and maintained.

#### Key Differences

| Aspect                      | Explicit Characteristics                 | Implicit Characteristics                 |
| --------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Definition**              | Clearly defined and documented           | Emerge during design and operation       |
| **Timing**                  | Identified during early stages           | Become apparent over time                |
| **Measurement**             | Associated with clear metrics            | Harder to quantify                       |
| **Stakeholder Involvement** | Directly influenced by stakeholder needs | Often influenced by operational feedback |
| **Design Impact**           | Directly shapes initial design decisions | Affects long-term system adaptability    |

### Why Are Architecture Characteristics Important?

**Alignment with Business Goals**:

Architecture characteristics bridge the gap between technical decisions and business outcomes. For example, an e-commerce platform that prioritizes **availability** ensures customers can shop without interruptions, directly affecting revenue.

**Guidance for Architectural Decisions**:

They serve as benchmarks for making design choices, such as selecting architectural styles (e.g., microservices vs. monoliths) or technologies (e.g., relational vs. NoSQL databases).

**System Quality and User Experience**:

Characteristics like **performance**, **scalability**, and **security** directly impact how users perceive and interact with the system.

**Risk Mitigation**:

Prioritizing attributes like **resilience** and **fault tolerance** reduces the risk of failures and downtime.

---

### Defining and Prioritizing Characteristics

**Step 1. Collaborate with Stakeholders**:

Engage stakeholders (e.g., business leaders, product managers, and technical teams) to identify the system’s critical success factors. For instance, a finance application might emphasize **security** and **compliance**, while a social media platform prioritizes **scalability** and **performance**.

**Step 2. Use Quality Attribute Scenarios**:

Create measurable scenarios to define characteristics. A quality attribute scenario has three parts:

* **Stimulus**: A specific event or condition (e.g., "Traffic increases by 50% during a flash sale").
* **Response**: How the system should behave (e.g., "Handle the increased load without downtime").
* **Response Measure**: A quantifiable metric (e.g., "Maintain response time under 500ms for 95% of requests").

**Step 3. Prioritize Characteristics**:

Use prioritization techniques like **MOSCOW analysis** (Must-have, Should-have, Could-have, Won’t-have) or weighted scoring to focus on the most critical characteristics.

---

### Measuring Architecture Characteristics

To ensure that the system meets its desired attributes, measurement is essential. This can be achieved through:

* **Performance Testing**
  Tools like Apache JMeter or Gatling measure response times and throughput under load.
* **Availability Metrics**
  Track uptime using Service Level Agreements (SLAs) or Mean Time Between Failures (MTBF).
* **Scalability Tests**
  Simulate increased traffic to assess system behavior during scale-up/down scenarios.
* **Security Audits**
  Use tools like OWASP ZAP to identify vulnerabilities.
* **Fitness Functions**
  Automated tests that validate whether a system adheres to architectural characteristics over time.

---

### Practical Examples

###### **E-Commerce Platform**

* **Key Characteristics**: Scalability, Availability, Performance.
* **Scenario**: During Black Friday, the system must handle a 5x increase in traffic while maintaining sub-1-second response times.

###### **Healthcare System**

* **Key Characteristics**: Security, Reliability, Modifiability.
* **Scenario**: Ensure patient records are encrypted and accessible only to authorized personnel, with 99.99% uptime.

###### **Real-Time Analytics**

* **Key Characteristics**: Low Latency, Scalability, Resilience.
* **Scenario**: Process and analyze streaming data from IoT devices within 100ms.

---

### Best Practices

* **Define Clear Metrics**: Ensure all characteristics are measurable and tied to specific business outcomes.
* **Incorporate Into CI/CD Pipelines**: Automate tests and fitness functions to validate characteristics during every deployment.
* **Continuously Monitor**: Use observability tools (e.g., Prometheus and Grafana) to track characteristics like availability and performance in real-time.
* **Evolve with the System**: Revisit and refine characteristics as the system and business needs grow.

---

### Challenges

* **Trade-offs**: Characteristics often conflict with one another. For example, achieving **performance** may require sacrificing **modifiability**.
* **Ambiguity**: Poorly defined characteristics can lead to misaligned priorities and inconsistent implementation.
* **Measurement Complexity**: Quantifying some attributes, such as **maintainability**, is more subjective and harder to automate.

---

## Conclusion

Architecture characteristics define how a system operates, grows, and interacts with its environment, forming the foundation of robust, scalable, and resilient systems. While each characteristic offers distinct benefits, their interdependencies often lead to trade-offs. By carefully defining, prioritizing, and measuring these characteristics—such as availability, scalability, performance, security, and usability—architects can design systems that achieve optimal functionality while aligning with business goals and real-world demands. Strategic planning, disciplined management, and effective prioritization are essential to navigating these trade-offs and delivering high-quality software that meets user and stakeholder expectations.

## Recommended Reading

#### Books

* Richards, M., & Ford, N. (2020). *[Fundamentals of Software Architecture: An Engineering Approach](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)* . O'Reilly Media.

  * **Part 1: Foundations**\
    It establishes the foundational concepts of software architecture, focusing on high-level, strategic decisions that shape a system's structure. It emphasizes the importance of **modularity** and **component-based thinking**, where systems are broken down into cohesive, loosely coupled components to enhance flexibility, scalability, and maintainability. The section also highlights **architecture characteristics** (non-functional requirements) such as performance, scalability, and security, which are crucial to the system’s long-term success. The distinction between architecture and design is clarified, with architecture guiding the overall structure, while design focuses on implementation details. Ultimately, Part 1 stresses the importance of **trade-offs** in architectural decision-making, balancing technical requirements with business goals to create adaptable, future-proof systems.
* Bass, L., Clements, P., & Kazman, R. (2012). *[Software Architecture in Practice](https://www.amazon.pl/Software-Architecture-Practice-Len-Bass/dp/0321815734)*. Addison-Wesley Professional.

  * **Part 2: Quality Attributes**\
    Part Two of *Software Architecture in Practice* explores **architecture characteristics**, which define a system’s behavior, structure, and alignment with stakeholder needs. It examines key attributes such as availability, performance, security, scalability, and modifiability, discussing their definitions, tactics, and inherent trade-offs. The section emphasizes the importance of balancing these characteristics to design systems that meet both functional requirements and business objectives effectively.
