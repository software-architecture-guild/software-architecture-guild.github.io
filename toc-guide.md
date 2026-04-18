# Guide

A guide to becoming a software architect.

## Introduction

Introduces the guide's purpose, structure, and how to use it well.

- **Welcome to the Guide**: Explains why the guide exists and how it supports the guild's mission to share architecture knowledge. `content/guide/introduction/welcome.md`
- **How to use this Guide**: Shows how developers, architects, and managers can navigate the guide based on their needs. `content/guide/introduction/how-to-use.md`
- **Frequently Asked Questions**: Answers common architecture questions across principles, styles, modeling, communication, and careers. `content/guide/introduction/faq.md`

## Architecture

Covers software architecture as a practical hard skill.

### Fundamentals

Introduces the core concepts, processes, and views used to reason about architecture.

- **Understanding Architecture**: Defines software architecture, how it differs from design, and why structural decisions matter. `content/guide/architecture/fundamentals/understanding-architecture.md`
- **Architecture Characteristics**: Explains key quality attributes and how they shape architectural trade-offs. `content/guide/architecture/fundamentals/architecture-characteristics.md`
- **Architecture Styles**: Surveys major monolithic and distributed architecture styles and their trade-offs. `content/guide/architecture/fundamentals/architecture-styles.md`
- **Visualizing Architecture**: Shows how views, viewpoints, and perspectives make complex systems easier to understand. `content/guide/architecture/fundamentals/visualizing-architecture.md`
- **Architecture Process**: Describes the iterative process for defining, evaluating, and evolving architecture. `content/guide/architecture/fundamentals/architecture-process.md`
- **Sample Architecture**: Walks through a concrete architecture example using established modeling frameworks. `content/guide/architecture/fundamentals/sample-architecture.md`

### Characteristics

Explains how to identify, measure, and improve architecture quality attributes.

- **What is an Architecture Characteristic?**: Defines architecture characteristics and why they are central to system success. `content/guide/architecture/characteristics/what-is-an-architecture-characteristic.md`
- **Identifying Characteristics**: Shows how to prioritize quality attributes from stakeholder needs and trade-offs. `content/guide/architecture/characteristics/identifying-characteristics.md`
- **Availability**: Covers tactics for fault tolerance, detection, and recovery in highly available systems. `content/guide/architecture/characteristics/availability.md`
- **Interoperability**: Explains how standards, adapters, and interfaces help systems integrate cleanly. `content/guide/architecture/characteristics/interoperability.md`
- **Modifiability**: Explains how to localize change and improve long-term evolvability. `content/guide/architecture/characteristics/modifiability.md`
- **Performance**: Covers tactics for reducing latency and managing resource demand. `content/guide/architecture/characteristics/performance.md`
- **Security**: Explains core security qualities and architectural tactics for resistance, detection, and recovery. `content/guide/architecture/characteristics/security.md`
- **Testability**: Shows how observability, controllability, and modularity improve testing. `content/guide/architecture/characteristics/testability.md`
- **Usability**: Explains architectural support for better user experience and error handling. `content/guide/architecture/characteristics/usability.md`
- **Scalability**: Explains how systems grow under load through concurrency, resource changes, and data strategies. `content/guide/architecture/characteristics/scalability.md`
- **Modeling and Analysis**: Introduces ways to model and analyze architecture characteristics. `content/guide/architecture/characteristics/modeling-and-analysis.md`
- **Measuring and Governing**: Shows how metrics, fitness functions, and ADRs help govern quality attributes. `content/guide/architecture/characteristics/measuring-and-governing.md`
- **Addressing Characteristics**: Explains how tactics and patterns are combined to realize desired qualities. `content/guide/architecture/characteristics/addressing-characteristics.md`
- **Catalog**: Provides a broad catalog of common architecture characteristics and their trade-offs. `content/guide/architecture/characteristics/catalog.md`

### Styles

Explains major architecture styles and how to choose among them.

- **Foundations**: Introduces the structural constraints and trade-offs behind architecture style families. `content/guide/architecture/styles/foundations.md`
- **Layered Monolith**: Explains the layered monolith and its simplicity, rules, and trade-offs. `content/guide/architecture/styles/layered-monolith.md`
- **Modular Monolith**: Explains how a modular monolith uses strong internal boundaries and data ownership. `content/guide/architecture/styles/modular-monolith.md`
- **Pipeline Monolith**: Describes pipeline-based monoliths built around sequential stages and flows. `content/guide/architecture/styles/pipeline-monolith.md`
- **Microkernel Monolith**: Explains the microkernel pattern with a minimal core and extensible plugins. `content/guide/architecture/styles/microkernel-monolith.md`
- **Service-Based**: Describes coarse-grained services organized around business capabilities and contracts. `content/guide/architecture/styles/service-based.md`
- **Event-Driven**: Explains event-driven systems built around producers, consumers, and loose coupling. `content/guide/architecture/styles/event-driven.md`
- **Space-Based**: Covers space-based architecture for high scale, elasticity, and low-latency workloads. `content/guide/architecture/styles/space-based.md`
- **Orchestration-Driven**: Explains architectures that centralize workflow control with orchestrators. `content/guide/architecture/styles/orchestration-driven.md`
- **Microservices-Based**: Explains independently deployable services, data ownership, and the platform discipline they require. `content/guide/architecture/styles/microservices-based.md`
- **Selecting a Style**: Shows how to choose a style using measurable qualities, constraints, and small experiments. `content/guide/architecture/styles/selecting-a-style.md`

### Domains

Explains how to understand and evolve business domains with DDD.

- **What is Domain Driven Design?**: Introduces DDD and how it aligns architecture, code, and collaboration with business complexity. `content/guide/architecture/domains/what-is-domain-driven-design.md`
- **What is the business domain?**: Explains domains and subdomains as the structure of the problem space. `content/guide/architecture/domains/what-is-the-business-domain.md`
- **Modeling Business Domain**: Shows how to build domain models and a shared language from business knowledge. `content/guide/architecture/domains/modeling-business-domain.md`
- **Domain Model Building Blocks**: Explains entities, value objects, aggregates, and other core modeling patterns. `content/guide/architecture/domains/domain-model-building-blocks.md`
- **Bounded Contexts**: Explains how bounded contexts contain complexity and keep models coherent. `content/guide/architecture/domains/bounded-contexts.md`
- **Integration of Bounded Contexts**: Covers integration patterns between contexts while preserving clean boundaries. `content/guide/architecture/domains/integration-of-bounded-contexts.md`
- **Discovering Domains and Contexts**: Shows how collaborative discovery techniques reveal domains and bounded contexts. `content/guide/architecture/domains/discovering-domains-and-contexts.md`
- **Domains Evolution**: Explains how domains, contexts, and designs change as business needs evolve. `content/guide/architecture/domains/domains-evolution.md`
- **Best Practices**: Summarizes practical guidance for applying DDD without unnecessary complexity. `content/guide/architecture/domains/best-practices.md`
- **Applying DDD in Practice**: Shows how to use DDD in brownfield systems, microservices, event-driven systems, and data mesh. `content/guide/architecture/domains/applying-ddd-in-practice.md`

### Boundaries

Explains how to shape boundaries so systems stay changeable, reliable, and aligned to the business.

- **What is Coupling?**: Defines coupling and shows how dependencies drive complexity and change cost. `content/guide/architecture/boundaries/what-is-coupling.md`
- **What is Modularity?**: Explains modularity as a way to localize change and manage complexity. `content/guide/architecture/boundaries/what-is-modularity.md`
- **Dimensions of Coupling**: Breaks coupling into shared elements, explicitness, strength, distance, and volatility. `content/guide/architecture/boundaries/dimensions-of-coupling.md`
- **Balancing Coupling**: Shows how to reason about stability and change cost by balancing coupling dimensions. `content/guide/architecture/boundaries/balancing-coupling.md`
- **What is Component?**: Defines components as responsibility-bearing building blocks with contracts. `content/guide/architecture/boundaries/what-is-component.md`
- **Defining components**: Shows how to define components and shape clear internal boundaries. `content/guide/architecture/boundaries/defining-components.md`
- **What is a Service?**: Explains what services are and how granularity affects service boundaries. `content/guide/architecture/boundaries/what-is-a-service.md`
- **Sharing**: Explains reuse options in distributed systems and the coupling risks they create. `content/guide/architecture/boundaries/sharing.md`
- **Managing Operational Data**: Covers operational data ownership and safe access patterns in distributed systems. `content/guide/architecture/boundaries/managing-operational-data.md`
- **Managing Analytical Data**: Explains how analytical data can move toward domain-aligned data products. `content/guide/architecture/boundaries/managing-analytical-data.md`
- **Managing Distributed Workflows**: Explains orchestration, choreography, and sagas for cross-service workflows. `content/guide/architecture/boundaries/managing-distributed-workflows.md`
- **Contracts**: Explains how contracts shape coupling and how to evolve them safely. `content/guide/architecture/boundaries/contracts.md`
- **Trade off analysis**: Shows how to turn architecture debates into measurable decisions. `content/guide/architecture/boundaries/trade-off-analysis.md`

### Documentation

Explains how to document architecture so complex systems stay understandable and maintainable.

- **Overview**: Introduces architecture documentation as support for communication, analysis, and change. `content/guide/architecture/documentation/overview-documenting-architecture.md`
- **Diagraming and Presenting**: Shows how to create diagrams and presentations for different stakeholders. `content/guide/architecture/documentation/diagraming-and-presenting.md`
- **Producing Architectural Models**: Explains how to choose and evolve models that support reasoning and communication. `content/guide/architecture/documentation/producing-architectural-models.md`
- **Architectural Description**: Shows how to structure and maintain clear architectural descriptions. `content/guide/architecture/documentation/architectural-description.md`
- **Architectural Decisions Records**: Explains how ADRs capture, govern, and evolve key decisions. `content/guide/architecture/documentation/architectural-decision-records.md`
- **Documentation Management**: Covers how to keep architecture knowledge accurate, findable, and useful. `content/guide/architecture/documentation/documentation-management.md`

### Validation

Explains how to validate architecture with tests, measures, reviews, and governance.

- **Architecture, Implementation, and Testing**: Explains how architecture, code, and tests stay aligned over time. `content/guide/architecture/validation/architecture-implementation-and-testing.md`
- **Architecture Metrics**: Covers metrics for flow, structure, and risk in architecture work. `content/guide/architecture/validation/architecture-metrics.md`
- **Measuring System Qualities**: Shows how to measure important qualities in code and running systems. `content/guide/architecture/validation/measuring-system-qualities.md`
- **Architecture Reconstruction and Conformance**: Explains how to recover architecture from code and check conformance. `content/guide/architecture/validation/architecture-reconstruction-and-conformance.md`
- **Architecture Evaluation**: Shows how structured reviews and scenarios expose architectural risks. `content/guide/architecture/validation/architecture-evaluation.md`
- **Risk Analysis**: Explains how to identify, assess, and mitigate architecture risks. `content/guide/architecture/validation/risk-analysis.md`
- **Economic Analysis**: Explains how to reason about cost, value, and risk in architectural choices. `content/guide/architecture/validation/economic-analysis.md`
- **Architecture Governance**: Covers lightweight governance practices that align systems with business goals. `content/guide/architecture/validation/architecture-governance.md`

## Organization

Explores the organizational context in which architects operate.

- **Team**: Explains what makes teams effective and how collaboration and delivery practices support performance. `content/guide/organization/team.md`
- **Value Streams**: Shows how to identify value streams and organize teams and architecture around flow. `content/guide/organization/value-streams.md`
- **Engineering**: Explains how engineering organizations can align structure, teams, and delivery models. `content/guide/organization/engineering.md`
- **Product**: Explains product development through lean thinking and product-market fit. `content/guide/organization/product.md`
- **Company**: Explains company structure, business functions, and levels of execution. `content/guide/organization/company.md`
- **Alignment**: Explains organizational alignment through Team of Teams-style collaboration and leadership. `content/guide/organization/alignment.md`
- **Goals**: Explains how goals and goal frameworks align work and measure success. `content/guide/organization/goals.md`

## Role

Defines the software architect role, its responsibilities, and how it develops.

- **Role Overview**: Introduces the architect role, its expectations, and its core responsibilities. `content/guide/role/role-overview.md`
- **Classification**: Explains architect types by scope, specialization, and seniority. `content/guide/role/classification.md`
- **Collaboration**: Shows how architects work with teams and stakeholders across the organization. `content/guide/role/collaboration.md`
- **Career**: Explains how architects grow from engineering roles into long-term architecture careers. `content/guide/role/career.md`

## Competencies

Outlines the hard and soft skills architects need to develop.

### Modeling

Explains how architectural models represent ideas, decisions, and systems clearly.

- **Modeling Overview**: Introduces modeling as a tool for shared understanding and system design. `content/guide/competencies/modeling/modeling-overview.md`

#### Frameworks

Explains structured approaches for organizing architectural views and decisions.

- **Overview**: Explains why frameworks help standardize architecture work and communication. `content/guide/competencies/modeling/frameworks/overview.md`
- **C4 Model**: Introduces the C4 model for viewing software at multiple levels of abstraction. `content/guide/competencies/modeling/frameworks/c4-model.md`
- **Viewpoints and Perspectives**: Explains a framework for combining stakeholder views with quality concerns. `content/guide/competencies/modeling/frameworks/viewpoints-and-perspectives.md`
- **4+1**: Introduces the 4+1 view model for describing systems from complementary perspectives. `content/guide/competencies/modeling/frameworks/4-plus-1.md`
- **TOGAF**: Explains TOGAF as a broad framework for enterprise architecture development and governance. `content/guide/competencies/modeling/frameworks/togaf.md`

#### Notations

Explains diagram languages used to express architecture clearly.

- **Overview**: Explains how notations complement frameworks by giving models a visual language. `content/guide/competencies/modeling/notations/overview.md`
- **C4 Notation**: Introduces the simple visual notation used with the C4 model. `content/guide/competencies/modeling/notations/c4-notation.md`
- **Flowchart**: Explains flowcharts for processes, workflows, and algorithmic logic. `content/guide/competencies/modeling/notations/flowchart.md`
- **Event Storming**: Explains Event Storming as a collaborative notation and workshop format for domain discovery. `content/guide/competencies/modeling/notations/event-storming.md`
- **UML**: Introduces UML as a general-purpose modeling language with multiple diagram types. `content/guide/competencies/modeling/notations/uml.md`
- **Archimate**: Explains ArchiMate as an enterprise architecture notation spanning business and IT. `content/guide/competencies/modeling/notations/archimate.md`

### Communication

Explains the communication modes architects use to align people and decisions.

- **Visual**: Shows how diagrams and visuals can simplify complexity and support decisions. `content/guide/competencies/communication/visual.md`
- **Written**: Covers clear, concise written communication in technical settings. `content/guide/competencies/communication/written.md`
- **Spoken**: Explains how spoken and nonverbal communication affect trust and collaboration. `content/guide/competencies/communication/spoken.md`
- **Effective**: Explains effective communication through credibility, emotion, and logic. `content/guide/competencies/communication/effective.md`
- **Documentation**: Covers documentation as a core communication tool for teams and organizations. `content/guide/competencies/communication/documentation.md`
- **Remote**: Explains communication patterns that work well in distributed teams. `content/guide/competencies/communication/remote.md`
- **Multi Culture**: Explains how cultural differences shape communication, trust, and feedback. `content/guide/competencies/communication/multi-culture.md`

### Requirements

Explains how to collect, define, communicate, and test software requirements.

- **What Is a Requirement?**: Defines software requirements and distinguishes functional, non-functional, and constraints. `content/guide/competencies/requirements/what-is-a-requirement.md`
- **How to Collect Requirements?**: Shows how structured discovery turns business events into usable requirements. `content/guide/competencies/requirements/how-to-collect-requirements.md`
- **Business Use Cases**: Explains how business use cases connect product scope to business goals. `content/guide/competencies/requirements/business-use-cases.md`
- **Collecting Scenarios**: Shows how scenarios uncover rules, edge cases, and quality needs. `content/guide/competencies/requirements/collecting-scenarios.md`
- **Selecting Requirements**: Explains how to choose requirements based on problems, outcomes, and scope. `content/guide/competencies/requirements/selecting-requirements.md`
- **Writing Requirements**: Shows how to write clear, atomic, and testable requirements. `content/guide/competencies/requirements/writing-requirements.md`
- **Functional Requirements**: Explains how to derive and manage functional requirements precisely. `content/guide/competencies/requirements/functional-requirements.md`
- **Non-Functional Requirements**: Explains how to define and manage measurable non-functional requirements. `content/guide/competencies/requirements/non-functional-requirements.md`
- **Testing Requirements**: Shows how fit criteria and rationale make requirements testable. `content/guide/competencies/requirements/testing-requirements.md`
- **Communicating Requirements**: Explains how to communicate requirements clearly across audiences. `content/guide/competencies/requirements/communicating-requirements.md`

### Facilitation

Explains how facilitation helps groups collaborate and reach outcomes.

- **Facilitation Overview**: Introduces facilitation techniques for productive meetings, workshops, and discussions. `content/guide/competencies/facilitation/facilitation-overview.md`

### Leadership

Explains how architects lead through goals, strategy, and influence.

- **Leadership Overview**: Introduces leadership skills for setting direction, inspiring teams, and driving outcomes. `content/guide/competencies/leadership/leadership-overview.md`

### Management

Explains management skills for leading projects and people effectively.

- **Management Overview**: Covers the basics of project management and people management for architects. `content/guide/competencies/management/management-overview.md`

## Specializations

Introduces major architectural specialization tracks and their domain knowledge.

### Foundation

Covers the foundational knowledge that supports every specialization.

- **Overview**: Summarizes the core software and architecture concepts that underpin specialized roles. `content/guide/specializations/foundation/overview.md`

### Applications

Covers application architecture for web, backend, transactional, and messaging systems.

- **Overview**: Summarizes the core concerns of scalable and maintainable application architecture. `content/guide/specializations/applications/overview.md`

### Data

Covers data architecture for warehousing, analytics, AI/ML, and business intelligence.

- **Overview**: Summarizes the principles for structuring and using data in advanced analytical systems. `content/guide/specializations/data/overview.md`

### Platform

Covers platform architecture for hosting, security, and DevOps.

- **Overview**: Summarizes the principles for building reliable and scalable application platforms. `content/guide/specializations/platform/overview.md`
