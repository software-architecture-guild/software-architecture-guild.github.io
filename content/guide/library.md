---
weight: 3000
title: "Library"
description: "A consolidated list of all books recommended across the Software Architecture Guild guide, organized by topic."
icon: "archive"
date: "2024-06-28T00:00:00Z"
lastmod: "2024-06-28T00:00:00Z"
draft: false
toc: true
---

This library consolidates all the books recommended across the Software Architecture Guild. These titles serve as foundational references for the concepts discussed throughout our guide, organized to match the guide's structure.

## Architecture

### Fundamentals

* *[Fundamentals of Software Architecture: An Engineering Approach](https://softwarearchitectureguild.substack.com/p/book-review-a-field-guide-to-fundamentals?utm_source=website)* by Mark Richards and Neal Ford

  Richards and Ford define software architecture through four elements: structure, architecture characteristics, architecture decisions, and design principles. The book starts with architectural thinking: how architects work across technical breadth and depth, analyze trade-offs, translate business goals into qualities such as scalability and deployability, and keep architecture connected to implementation.

  The middle of the book explains modularity, coupling, cohesion, connascence, and component boundaries, then compares major architecture styles: layered, pipeline, microkernel, service-based, event-driven, space-based, and microservices. The final section covers the day-to-day practices of architecture work: documenting decisions with ADRs, analyzing risk, creating diagrams, presenting architecture to stakeholders, leading teams, and growing into the architect role.

* *[Software Systems Architecture: Working with Stakeholders Using Viewpoints and Perspectives](https://softwarearchitectureguild.substack.com/p/book-review-design-what-matters-with?utm_source=website)* by Nick Rozanski and Eoin Woods

  Rozanski and Woods explain architecture description through stakeholder concerns, viewpoints, views, and perspectives. The book covers context, functional, information, concurrency, development, deployment, and operational views, plus quality perspectives such as security, performance, availability, usability, and scalability.

### Characteristics

* *[Software Architecture in Practice](https://softwarearchitectureguild.substack.com/p/book-review-from-theoretical-to-software?utm_source=website)* by Len Bass, Paul Clements, and Rick Kazman

  Bass, Clements, and Kazman explain architecture through structures, views, quality attributes, and decisions. The book teaches quality-attribute scenarios, tactics, utility trees, architecture trade-off analysis, cost-benefit analysis, documentation practices, conformance checks, and the lifecycle work needed to keep architecture aligned with business goals.

### Styles

* *[Software Architecture Patterns](https://www.oreilly.com/library/view/software-architecture-patterns/9781098134280/)* by Mark Richards

  Richards compares architecture styles by their structural rules and quality trade-offs. The book covers layered, modular monolith, microkernel, service-based, event-driven, space-based, and microservices architectures, with attention to partitioning, deployment shape, coupling, scalability, elasticity, and operational complexity.

* *[Head First Software Architecture](https://softwarearchitectureguild.substack.com/p/book-review-design-around-change?utm_source=website)* by David Bain, M. O’Dea, and Neal Ford

  Bain, O'Dea, and Ford teach architecture through practical design exercises and visual explanations. The book covers architectural characteristics, measurable scenarios, logical components, ADRs, component ownership, architecture governance, and common styles such as layered, modular, microkernel, microservices, and event-driven architecture.

* *[Building Event-Driven Microservices](https://www.oreilly.com/library/view/building-event-driven-microservices/9781492057888/)* by Adam Bellemare

  Bellemare explains event-driven microservices as services built around durable event streams and domain-owned data. The book covers event contracts, schema evolution, outbox and CDC patterns, replay, stream processing, choreography, orchestration, testing, tooling, and the operational work required to run event-driven systems.

* *[Designing Event-Driven Systems](https://www.confluent.io/designing-event-driven-systems/)* by Ben Stopford

  Stopford focuses on Kafka-centered event-driven architecture. The book explains replayable logs, event collaboration, local state, CQRS, event sourcing, derived views, transactions, schema evolution, Kafka Streams, stream SQL, and Kafka Connect.

* *[Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)* by Gregor Hohpe and Bobby Woolf

  Hohpe and Woolf define a pattern language for connecting independent applications through messaging. The book covers message channels, message construction, routers, translators, endpoints, request-reply, correlation identifiers, aggregators, idempotent receivers, dead-letter channels, wire taps, and control buses.

* *[Building Microservices](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/)* by Sam Newman

  Newman covers microservices as independently deployable services aligned to business capabilities. The book explains service boundaries, monolith extraction, communication styles, sagas, contracts, CI/CD, testing, observability, security, resilience, scaling, platform support, and governance.

* *[Microservice Architecture](https://www.oreilly.com/library/view/microservice-architecture/9781491956328/)* by Irakli Nadareishvili, Ronnie Mitra, Matt McLarty, and Mike Amundsen

  Nadareishvili, Mitra, McLarty, and Amundsen treat microservice adoption as a change across architecture, delivery process, tools, organization, and culture. The book covers bounded contexts, message-oriented APIs, event sourcing, CQRS, sagas, service discovery, API gateways, monitoring, replaceability, and product-team ownership.

### Domains

* *[Learning Domain-Driven Design](https://www.oreilly.com/library/view/learning-domain-driven-design/9781098100124/)* by Vlad Khononov

  Khononov gives a practical path into DDD from business-domain analysis to implementation. The book covers core, supporting, and generic subdomains; ubiquitous language; bounded contexts; context maps; aggregates; domain events; event sourcing; CQRS; EventStorming; microservices; data mesh; and brownfield modernization.

* *[Patterns, Principles, and Practices of Domain-Driven Design](https://softwarearchitectureguild.substack.com/p/patterns-principles-of-ddd?utm_source=website)* by Scott Millett and Nick Tune

  Millett and Tune provide a broad guide to DDD principles and modeling practice. The book covers knowledge crunching, core-domain focus, model-driven design, bounded contexts, context maps, integration patterns, messaging and HTTP integration, entities, value objects, aggregates, repositories, domain services, domain events, and event sourcing.

* *[Introducing EventStorming](https://www.eventstorming.com/book/)* by Alberto Brandolini

  Brandolini explains EventStorming as a collaborative modeling workshop built around domain events on a timeline. The book covers Big Picture, Design-Level, and Value Stream EventStorming; facilitation; room setup; hotspots; commands; policies; read models; external systems; aggregates; bounded contexts; remote sessions; and workshop anti-patterns.

### Boundaries

* *[Software Architecture: The Hard Parts](https://softwarearchitectureguild.substack.com/p/book-review-addressing-the-hard-parts?utm_source=website)* by Neal Ford, Mark Richards, Pramod Sadalage, and Zhamak Dehghani

  Ford, Richards, Sadalage, and Dehghani focus on architecture decisions where every option has serious consequences. The book covers architecture quanta, coupling, modularity, decomposition, service granularity, operational data ownership, reuse, distributed workflows, contracts, sagas, data products, ADRs, and fitness functions.

* *[Balancing Coupling in Software Design](https://coupling.dev/)* by Vlad Khononov

  Khononov explains coupling as a property that can be analyzed and shaped across code, modules, services, and teams. The book covers coupling strength, distance, volatility, connascence, modularity, deep modules, dependency direction, and practical ways to decide when coupling is acceptable.

* *[Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)* by Martin Kleppmann

  Kleppmann explains the design of reliable, scalable, and maintainable data systems. The book covers data models, query languages, storage engines, encoding, replication, partitioning, transactions, distributed-system faults, consistency, consensus, batch processing, stream processing, CDC, and data integration.

* *[Data Mesh](https://www.oreilly.com/library/view/data-mesh/9781492092386/)* by Zhamak Dehghani

  Dehghani describes a decentralized approach to analytical data at scale. The book covers domain ownership, data as a product, self-serve data platforms, federated computational governance, data product quanta, contracts, SLOs, interoperability, and multi-plane platform architecture.

### Validation

* *[Software Architecture Metrics](https://softwarearchitectureguild.substack.com/p/book-review-software-architecture-metrics?utm_source=website)* by Christian Ciceri, Dave Farley, and Neal Ford

  Ciceri, Farley, and Ford explain how to measure architecture and delivery health. The book covers deployment frequency, lead time, change failure rate, time to restore, fitness functions, modularity maturity, private builds, structural health, maintainability metrics, and Goal-Question-Metric.

## Organization

### Team Structure

* *[Team Topologies](https://teamtopologies.com/book)* by Matthew Skelton and Manuel Pais

  Skelton and Pais treat teams as the main design unit for software delivery. The book covers Conway's Law, cognitive load, stream-aligned teams, platform teams, enabling teams, complicated-subsystem teams, team APIs, and interaction modes such as collaboration, X-as-a-Service, and facilitation.

* *[Team of Teams](https://www.amazon.com/Team-Teams-Rules-Engagement-Complex/dp/1591847486)* by General Stanley McChrystal

  McChrystal explains how organizations respond to complex environments by building shared context and decentralized decision-making. The book covers trust, transparency, empowered execution, liaison roles, cross-team coordination, and operating rhythms that help many teams act with the speed of a smaller unit.

* *[The Culture Code](https://danielcoyle.com/the-culture-code/)* by Daniel Coyle

  Coyle describes group culture through repeatable behaviors that create belonging and cooperation. The book focuses on three skill areas: building safety, sharing vulnerability, and establishing purpose through clear signals, stories, rituals, and leader behavior.

* *[The Wisdom of Teams](https://hbsp.harvard.edu/product/15042-PDF-ENG)* by Jon R. Katzenbach and Douglas K. Smith

  Katzenbach and Smith define what makes a real team: complementary skills, common purpose, specific performance goals, a shared working approach, and mutual accountability. The book explains working groups, pseudo-teams, potential teams, real teams, and high-performance teams, with attention to performance challenges and team discipline.

### Delivery Management

* *[Essential Kanban Condensed](https://kanbanbooks.com/essential-kanban-condensed/)* by David J. Anderson and Andy Carmichael

  Anderson and Carmichael summarize Kanban as an evolutionary improvement method for knowledge work and service delivery. The book covers visualizing work, limiting WIP, managing flow, explicit policies, feedback loops, service delivery reviews, flow metrics, implementation steps, roles, forecasting, and scaling.

### Product and Business

* *[The Lean Product Playbook](https://leanproductplaybook.com/)* by Dan Olsen

  Olsen presents a step-by-step process for finding product-market fit. The book covers target customers, unmet needs, value propositions, MVP definition, UX design, customer testing, product metrics, iteration, and the Lean Product Process.

* *[Measure What Matters](https://www.whatmatters.com/the-book)* by John Doerr

  Doerr explains OKRs as a goal-setting system built around objectives and measurable key results. The book covers focus, alignment, commitment, tracking, stretching, weekly check-ins, scoring, and examples from Intel, Google, and other organizations.

* *[The Personal MBA](https://softwarearchitectureguild.substack.com/p/book-review-do-you-really-need-an?utm_source=website)* by Josh Kaufman

  Kaufman organizes business literacy into practical mental models. The book covers value creation, marketing, sales, value delivery, finance, human psychology, working with yourself, working with others, systems thinking, analysis, and operations.

## Role

* *[The Software Architect Elevator](https://architectelevator.com/book/)* by Gregor Hohpe

  Hohpe describes the architect as someone who connects executive strategy with engineering reality. The book covers architecture communication, decision framing, IT strategy, transformation, cloud adoption, platform thinking, governance, organizational influence, and the skill of moving between boardroom concerns and implementation details.

## Competencies

### Modeling

* *[The C4 Model for Visualising Software Architecture](https://c4model.com/)* by Simon Brown

  Brown's C4 model explains software architecture through four levels of diagrams: system context, containers, components, and code. The model helps teams choose the right abstraction level, separate audiences, show responsibilities and relationships, and keep diagrams useful during design and communication.

### Communication

* *[Communication Patterns: A Guide for Developers and Architects](https://softwarearchitectureguild.substack.com/p/book-review-communication-patterns?utm_source=website)* by Jacqui Read

  Read organizes technical communication into reusable patterns and anti-patterns. The book covers audience analysis, abstraction level, cognitive load, diagrams, documentation, presentations, remote communication, knowledge sharing, channel choice, and ways to make technical decisions understandable.

* *[The Culture Map](https://erinmeyer.com/books/the-culture-map/)* by Erin Meyer

  Meyer explains cross-cultural collaboration through eight scales: communicating, evaluating, persuading, leading, deciding, trusting, disagreeing, and scheduling. The book helps teams interpret differences in feedback, hierarchy, decision speed, disagreement, trust-building, and time expectations.

### Requirements

* *[Mastering the Requirements Process: Getting Requirements Right](https://softwarearchitectureguild.substack.com/p/book-review-mastering-the-requirements?utm_source=website)* by Suzanne Robertson and James Robertson

  Suzanne Robertson and James Robertson explain requirements work from problem discovery through testable specifications. The book covers project scope, stakeholders, business events, use cases, requirements rationale, functional requirements, non-functional requirements, fit criteria, and requirements quality checks.
