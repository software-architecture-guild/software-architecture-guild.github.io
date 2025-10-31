---
weight: 105
title: "Identifying Characteristics"
description: "This article explains how to identify which Architecture Characteristics are important in your context."
icon: "article"
date: "2025-10-14T00:00:00+01:00"
lastmod: "2025-10-14T00:00:00+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Identifying the right architectural characteristics is a crucial step in designing a system that aligns with business goals and technical requirements. These non-functional properties—such as scalability, availability, and security—dictate how the system behaves beyond its core functionality. The identification work is collaborative: architects, stakeholders, and delivery teams converge on which characteristics are critical for success and why.

## Why Characteristics Drive Architecture

Architectural characteristics shape design decisions and the trade-offs made along the way. When they are missed or misprioritized, systems fail to meet business needs or user expectations, struggling to perform or scale as required. Clear identification keeps the design effort focused on what matters most.

## Approaches to Identification

Effective identification blends stakeholder engagement with contextual awareness. Stakeholders surface business drivers and operational expectations, and architects translate these into architectural concerns, making the stakes visible. Context anchors the work: a banking application emphasizes security and reliability, while a social platform stresses scalability and low latency. The same attribute can carry different weight depending on the domain, purpose, and constraints.

## Techniques to Surface Characteristics

- **Quality attribute scenarios**: a structured way to define characteristics in concrete, testable terms:  
  - **Stimulus**: an event or condition that affects the system  
  - **Response**: how the system must react  
  - **Response measure**: the metric that defines success\
  Example: *When the user base increases by 50%, the system scales horizontally within 2 hours to maintain < 500 ms response time.*

- **Interviews and workshops**: facilitated conversations with business and technical stakeholders to elicit, clarify, and converge on priorities.

- **Surveys and questionnaires**: lightweight instruments to gather broader input and spot consensus or contention.

- **Checklists**: curated lists of common characteristics to reduce the risk of omission while still tailoring choices to context.

## Prioritizing What Matters

Not all characteristics are equally important. Prioritization aligns focus with business drivers, budget, and timeline. Techniques such as **MoSCoW analysis** (Must/Should/Could/Won’t) or **weighted scoring** help rank characteristics and make trade-offs explicit, ensuring effort concentrates on the attributes with the highest value impact.

## Balancing Competing Forces

Characteristics often pull in different directions, and architecture makes those tensions tractable.

- **Performance vs security**: stronger controls can introduce latency.
- **Scalability vs consistency**: distributed systems may trade strict consistency for availability and scale.\
Architects balance these based on business needs, emphasizing the attributes that deliver the most value in context.

## Common Pitfalls

Ambiguity turns characteristics into slogans rather than actionable guidance; each characteristic must be well-defined and measurable. Overgeneralization ignores context and leads to misfit solutions. Excluding stakeholders risks misalignment between the architecture and business goals. Avoid these by insisting on clarity, tailoring to the system’s realities, and keeping stakeholder involvement continuous.

## Documenting Decisions

- **Architectural Decision Records (ADRs)**: capture the rationale behind chosen characteristics and the trade-offs made.\
  Example: *Prioritize availability over consistency to ensure uninterrupted service during peak traffic.*

- **Visual models**: diagrams or charts that make characteristics, their relationships, and their priorities visible to all collaborators.

## Examples by Domain

- **E-commerce platforms**: scalability, availability, security, performance
- **Real-time systems**: low latency, high availability, reliability
- **Banking applications**: security, auditability, reliability, data integrity

## Evolving Characteristics Over Time

As systems and businesses evolve, so do the relevant characteristics. Early-stage efforts often favor time-to-market and modifiability; as the product matures, scalability and reliability typically become central. Periodic reassessment—rooted in collaboration—keeps architectural focus synchronized with changing goals.

## Conclusion

Identifying architectural characteristics is a collaborative, context-driven activity that determines where the architecture must be strong and why. Use structured techniques—especially quality attribute scenarios—alongside interviews, surveys, and checklists to surface, clarify, and prioritize the right attributes. Treat prioritization as an explicit decision-making step so trade-offs are intentional rather than accidental. Document choices and rationale, visualize priorities, and revisit them as the system and its business environment change.

## Recommended Reading

#### Books

- Richards, Mark, and Neal Ford. *Fundamentals of Software Architecture* (1st ed.). O’Reilly Media, 2020.  
  - **Chapter 5: Identifying Architectural Characteristics**\
    This chapter focuses on collaborative identification with stakeholders, context-driven emphasis by domain, and structured techniques such as quality attribute scenarios, interviews, surveys, and checklists. It also covers explicit prioritization methods (e.g., MoSCoW, weighted scoring), trade-off analysis, documentation via ADRs, and the need to revisit characteristics as systems evolve.
