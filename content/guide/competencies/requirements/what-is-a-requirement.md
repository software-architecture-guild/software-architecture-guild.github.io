---
weight: 1310
title: "What Is a Requirement?"
description: "This article explains what a software requirement is, distinguishing between functional, non-functional, and constraints. It covers why clear requirements are crucial for successful architecture, how to discover them, and how they continuously shape and are shaped by architectural decisions."
icon: "article"
date: "2025-10-10T17:16:03+01:00"
lastmod: "2025-10-10T17:16:03+01:00"
draft: false
toc: true
authors:

- "ilya-hardzeenka.md"
---

Requirement is Understanding what a product must do—and how well it must do it—to truly solve the right problem.

A requirement isn’t a document. It’s a truth waiting to be discovered.

Requirements exist whether or not we write them down. They describe what the product must **do** or **be like** to make it acceptable or valuable to its owner. In practice, this spans three axes:

- **Functional requirements** — what the product does.
- **Quality attributes** — how well it performs those functions.
- **Constraints** — limits within which the solution must fit.

Every successful system—software, hardware, or process—rests on knowing these three clearly enough to make design decisions and measure success.

## Why it matters?

If we skip discovering real requirements, we risk optimizing the wrong thing. Shipping software isn’t the same as solving the problem.

Reasonable requirements work discovers *why* we’re building, *what value* the owner expects, and *how success will be measured.* Bad requirements work - documents guesses or opinions.

There’s a trade-off between **speed and understanding**. Iteration accelerates learning, but iteration without insight creates rework. The right balance comes from blending exploration with disciplined validation.

## How to do it

- **Start with the problem, not the spec.**\
Treat requirements as discoveries, not inventions. Clarify the business problem before suggesting solutions.\
*Quality tie: correctness.*

- **Identify the owner and their value goals.**\
The “user” isn’t always the one funding or disrupted by change. Focus on the owner’s notion of value and optimize for benefit–cost fit.\
*Risk tie: misaligned scope.*

- **Understand the current and future work.**\
Observe how people work today and how they want to work tomorrow. Separate *what* the system must do from *how well* it must do it.\
*Quality tie: completeness.*

- **Validate problem–solution fit across the business.**\
Don’t confuse local satisfaction with organizational value. Check ripple effects before implementation.\
*Risk tie: partial optimization.*

- **Write only what adds clarity and traceability.**\
Documentation is useful when it sharpens thought, preserves rationale, or supports testing and maintenance—not when it fills pages.\
*Quality tie: maintainability.*

- **Treat stakeholder statements as partial truths.**\
People describe symptoms or solutions, not needs. Challenge, derive, and reformulate until the real requirement emerges.\
*Risk tie: ambiguity.*

- **Follow an orderly, not rigid, process.**\
A process defines deliverables and decisions; tailor its order and depth to context and risk.\
*Quality tie: repeatability.*

- **Blend discovery with iteration.**\
Iterative delivery is effective only if discovery continues throughout. Write just enough, just in time—but never skip understanding.\
*Risk tie: premature convergence.*

- **Prioritize judgment over tools.**\
No tool replaces critical thinking. Use frameworks and checklists to support—not substitute—analysis.\
*Quality tie: decision integrity.*

- **Make requirements measurable and testable.**\
Attach **fit criteria** to every statement: numbers, thresholds, or observable outcomes. If you can’t test it, it’s not a requirement—it’s a wish.\
*Quality tie: verifiability.*

- **Expect your work to reshape thinking.**\
Visual models and shared language often change how stakeholders see their problem. Encourage that evolution—it’s evidence of learning.\
*Quality tie: stakeholder alignment.*

## Functional, Non-Functional, and Constraints

**Functional requirements** describe *observable behaviors*—what the system does to support the work. They are best linked to real business events.\
Example: “Record a customer order,” not “Provide an order database.”

**Non-functional requirements** describe *qualities*—performance, security, usability, legal compliance, look and feel. They are often harder to capture but crucial to success.\
Example: “Process 1,000 orders per minute with <2% error.”

**Constraints** define the *boundaries*—mandated technologies, legal deadlines, or existing platforms. Validate them as business truths, not arbitrary choices.

## Architecture and Requirements

Requirements shape architecture, and architecture refines requirements. The relationship is continuous and bidirectional.

- **Requirements → Architecture:**\
  Functional and quality attributes dictate the system’s structure and behavior.\
  *Example:* A 2-second response-time requirement drives caching and load-balancing design.

- **Architecture → Requirements:**\
  Early architectural choices reveal gaps, conflicts, and new needs.\
  *Example:* Adopting microservices forces explicit service boundaries and API definitions.

## Managing the relationship

- **Use quality attribute scenarios** to specify how the system should respond under certain conditions.\
  *Stimulus → Response → Measurable outcome.*\
  This ties architecture to observable behavior.

- **Use utility trees** to prioritize competing quality attributes.\
  Not every quality matters equally; prioritize what supports the owner’s value.

- **Continuously align.**\
  Architecture and requirements coevolve. Review them together as the system and understanding mature.

- **Document architectural decisions** and the rationale behind them.\
  Trace each back to its driving requirement for future validation and change control.

- **Handle trade-offs explicitly.**\
  Balancing qualities (e.g., security vs. usability) is part of the architect’s job. Make the priorities transparent.

## Examples / Pitfalls

#### 1. Building features, not solving problems

**Summary:** Teams deliver code fast but miss the real business need.
**Concrete pass:** A telecom company added a self-service portal because “customers wanted more control.” After release, call volumes didn’t drop—customers still phoned support to fix billing errors the portal couldn’t handle.
**Why it works:** Demonstrates that functional completeness without problem understanding yields low business value.

#### 2. The illusion of clarity

**Summary:** Requirements sound precise but hide untestable adjectives.
**Concrete pass:** A healthcare app spec demanded a “user-friendly interface.” When tested, every stakeholder had a different interpretation—nurses wanted speed, doctors wanted simplicity, and admins wanted data visibility.
**Why it works:** Shows why measurable fit criteria are essential for testability and shared understanding.

#### 3. Architecture unmoored from requirements

**Summary:** Architectural enthusiasm replaces alignment.
**Concrete pass:** A startup adopted microservices for “scalability,” yet user load was minimal. Deployment overhead and debugging complexity slowed releases, and costs skyrocketed.
**Why it works:** Highlights how explicit, measurable requirements must justify architectural choices.

## Conclusion

- Requirements are **discoveries**, not documents.
- Always start with **problem understanding** and **owner value.**
- Separate **what** (functionality) from **how well** (quality).
- Keep requirements **measurable** and **traceable** to architecture.
- Expect both **requirements and architecture** to evolve as understanding deepens.

## Recommended Reading

#### Books

- Robertson, Suzanne, and James Robertson. *[Mastering the Requirements Process: Getting Requirements Right](https://www.amazon.com/Mastering-Requirements-Process-Suzanne-Robertson/dp/0137969503)* (3rd ed.). Addison-Wesley, 2012.\
  - **Chapter 1: Some Fundamental Truths**\
    Establishes that requirements are discovered—not invented—and must start from the real business problem. Optimizes for the owner’s value, separates *what* from *how well*, and warns that shipping software isn’t the same as solving the problem. Advocates write only when it adds clarity and traceability, treating stakeholder input as partial truths, following an orderly but adaptable process, blending discovery with iteration, and rejecting “silver bullets.” The text emphasizes measurability through fit criteria and notes that modeling and shared vocabulary reshape stakeholder thinking. Includes a clear definition of requirements across three axes—functional behavior, quality attributes, and constraints—with guidance to justify each by intrinsic need or owner value.\
  - **Volere Requirements Process (preview)**\
    Presents a deliverable-driven, tailorable process for discovering, verifying, and documenting requirements. The emphasis is on outcomes over procedures: use the outline as a map, adjust sequence and depth to risk and context, and let deliverables steer effort and fidelity.

- Bass, Len, Paul Clements, and Rick Kazman. *Software Architecture in Practice* (3rd ed.). Addison-Wesley, 2012.\
  - **Chapter 16: Architecture and Requirements**\
    Explores the two-way relationship between requirements and architecture. Requirements (functional and quality attributes) shape structure and behavior; architectural decisions, in turn, clarify and constrain requirements. This text introduces quality-attribute scenarios (stimulus, environment, response, and measurable criteria) and utility trees to prioritize competing qualities. Stresses continuous alignment, explicit trade-offs (e.g., security vs. usability), and maintaining an architectural decision log that traces choices back to their driving requirements. Includes concrete alignment examples (e-commerce performance; healthcare compliance) with acknowledged trade-offs.
