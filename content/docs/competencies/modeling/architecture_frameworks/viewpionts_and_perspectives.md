---
weight: 620
title: "Viewpoints and Perspectives"
description: ""
icon: "document_scanner"
date: "2024-09-08T10:39:56+02:00"
lastmod: "2024-09-08T10:39:56+02:00"
draft: false
toc: true
---

The **Viewpoints and Perspectives** is another architectural framework. It is
lightweight, versatile adaptable, as it is unbound by any specific tool
depencencies. At the same time various diagramming tools can be used to support
the work in this framework style, promoting efficient collaboration and
customization.

## The Need for Multiple Views

When designing complex software systems, it's crucial to avoid the trap of
representing the entire architecture in a single, **monolithic model**. Such an
approach often leads to **confusion**, inconsistencies, and **difficulty** in
understanding and communicating the design to stakeholders. Instead, a more
effective strategy is to adopt a multi-view approach, where the architecture is
descried by into multiple, **interconnected views**, each focusing on a specific
aspect of the system. This allows for a **better understanding**, management of
complexity, and **effective communication** with various stakeholders.

## General Overview

The framework of viewpoints and perspectives provides a structured and
comprehensive approach to capturing and representing software architecture.
**Viewpoints** serve as guides for creating specific types of views, while
**perspectives** are applied to these views to ensure that the architecture meets
desired **quality requirements**. This collaborative approach promotes better
communication, understanding, and decision-making throughout the development
process.

## Definitions

The framework gives a few definitions, crucial to it's understanding and
application:
* **Architectural View**: A view is a representation of one or more structural
  aspects of an architecture, illustrating how the architecture addresses
  specific concerns of stakeholders. For example, a functional view might depict
  the system's main components and their interactions, while a deployment view
  might illustrate the physical infrastructure where the system is deployed.
* **Architectural Viewpoint**: A viewpoint is a collection of patterns,
  templates, and conventions for constructing a specific type of view. It
  defines the stakeholders whose concerns are reflected in the view and provides
  guidelines for creating and describing that aspect of the architecture.
* **Architectural Perspective**: A perspective is a collection of architectural
  activities, tactics, and guidelines used to ensure that the system exhibits a
  particular set of related quality properties.
Note: while both viewpoints and perspectives guide architectural design, their
focus differs. Viewpoints primarily define the structure and content of views,
while perspectives focus on ensuring the architecture meets specific quality
requirements.

## Viewpoints

The framework offers the following list of viewpoints:

### The Context Viewpoint
* Purpose: Describes the relationships, dependencies, and interactions between the system and its environment.
* Key Stakeholders: System architects, analysts, and project managers who need to understand the system's boundaries and interactions with external entities.

### The Functional Viewpoint
* Purpose: Defines the system's main components and their interactions.
* Key Stakeholders: System architects, analysts, and developers who need to understand the system's behavior and functionality.

### The Information Viewpoint
* Purpose: Describes the system's data, its structure, and how it is managed.
* Key Stakeholders: Data architects, analysts, and developers who need to understand the system's data requirements and how it is stored, processed, and protected.

### The Concurrency Viewpoint
* Purpose: Addresses the system's concurrency aspects, such as parallelism and synchronization.
* Key Stakeholders: System architects, developers, and performance engineers who need to understand how the system will handle concurrent access and avoid performance bottlenecks.

### The Development Viewpoint
* Purpose: Supports the system's construction, including development processes, tools, and standards.
* Key Stakeholders: Development teams, project managers, and quality assurance engineers who need to understand the system's development lifecycle and ensure quality.

### The Deployment Viewpoint
* Purpose: Defines the system's runtime environment and how it is deployed.
* Key Stakeholders: System architects, infrastructure engineers, and operations teams who need to understand the system's hardware and software requirements and how it will be deployed and managed.

### The Operational Viewpoint
* Purpose: Addresses the system's operational aspects, such as support, maintenance, and security.
* Key Stakeholders: Operations teams, support staff, and security personnel who need to understand the system's operational requirements and how it will be maintained and secured.

## Perspectives

### Security
* Purpose: Ensures controlled access to sensitive system resources.
* Key Stakeholders: Security architects, analysts, and developers who need to understand the system's security requirements and how to protect it from unauthorized access and attacks.

### Performance and Scalability
* Purpose: Addresses the system's performance requirements and ability to handle increasing workloads.
* Key Stakeholders: Performance engineers, architects, and operations teams who need to ensure that the system meets its performance targets and can scale to handle future growth.

### Availability and Resilience
* Purpose: Ensures system availability and ability to cope with failures.
* Key Stakeholders: Operations teams, architects, and reliability engineers who need to understand the system's availability requirements and how to ensure its resilience to failures.

### Evolution
* Purpose: Ensures the system can adapt to changes.
* Key Stakeholders: System architects, analysts, and project managers who need to understand the system's future needs and how it can be adapted to accommodate changes.

### Regulation
* Purpose: Ensures compliance with laws, regulations, and standards.
* Key Stakeholders: Legal counsel, compliance officers, and system architects who need to understand the system's regulatory requirements and how to ensure compliance.

## Conclusion

The framework provides a comprehencive overview of the architecture from
different aspects using various predefined viewponts and perspectives. By
utilising them architects can promote better communication, understanding, and
decision-making throughout the development process.

## Recommended Reading

##### Books

* Rozanski, N., & Woods, E. (2011). *[Software systems architecture: Working with stakeholders using viewpoints and perspectives](https://www.viewpoints-and-perspectives.info/home/book/)* . Addison-Wesley.
  * **Chapter 3: Viewpoints and Views, Chapter 4: Architectural Perspectives**\
    Provides an overview of Architectural Viewpoints and Perspectives available
    in the Framework.
