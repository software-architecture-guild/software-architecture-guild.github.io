---
weight: 1140
title: "C4 Model"
description: "This article provides an overview of the C4 Model as an Architectural Framework."
icon: "document_scanner"
date: "2024-09-08T10:39:56+02:00"
lastmod: "2024-09-08T10:39:56+02:00"
draft: false
toc: true
authors:
-  "oleg-zubchenko.md"
-  "ilya-hardzeenka.md"
---
The **C4 model** is a hierarchical framework designed for visualizing the architecture of software systems. It emphasizes **clarity and simplicity**, making it accessible for technical and non-technical stakeholders. The framework consists of diagram types representing **different levels of abstraction**, enabling users to effectively convey a system's architecture. It is **tool-agnostic**, allowing various tools to create the diagrams.

One of the significant benefits of the C4 model is its **"zoom-in" approach**, allowing stakeholders to navigate from high-level diagrams to more detailed ones. For example, an element depicted in the context diagram can be further elaborated in a container diagram, and each container can be broken down into its components in subsequent diagrams. This hierarchical representation facilitates a deeper understanding of each element and ensures that each diagram serves a **specific purpose** while contributing to the overall narrative of the system architecture.

## Abstractions

The framework defines elements of an architecture as a set of hierarchical building blocks, namely:

- **Software system**, the highest level of abstraction, bringing value to the end user.
- **Container** - runtime boundary around an executable code or data storage, e.g., web application, database, etc.
- **Component** - a grouping of related functionality that is not separately deployable.
- **Code** - lowest abstraction level, representing classes, functions, and other entities from the programming language.

Each building block is composed of smaller blocks.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.abstractions.png" alt="C4 Abstractions" href="https://c4model.com/abstractions" msg="Source: https://c4model.com/" >}}

---

## Default Diagrams

The framework defines four basic diagram types corresponding to the abstractions defined above. The diagrams are nested, which helps tackle the system's complexity.

---

### Context Diagram

This diagram provides a high-level overview of the system and its interactions with external entities. It sets the stage for understanding how the system fits into its broader environment.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.system_context.png" alt="C4 System Context" href="https://c4model.com/diagrams/system-context" msg="Source: https://c4model.com/" >}}

---

### Container Diagram

It breaks down the system into its containers, illustrating relationships between them. This level of detail allows stakeholders to see how different parts of the system interact.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.containers.png" alt="C4 Containers" href="https://c4model.com/diagrams/container" msg="Source: https://c4model.com/" >}}

---

### Component Diagram

It offers a detailed view of the components within a specific container and their interactions. This helps understand the container's internal structure and how components collaborate to fulfill system requirements.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.components.png" alt="C4 Components" href="https://c4model.com/diagrams/component" msg="Source: https://c4model.com/" >}}

---

### Code Diagram

This diagram focuses on the implementation level, typically showing classes or modules within a component. It is particularly useful for developers to grasp the details of the code structure.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.code.png" alt="C4 Code" href="https://c4model.com/diagrams/code" msg="Source: https://c4model.com/" >}}

---

## Adapting to Real World Use cases

The default diagrams create a foundation for describing the software system's structure. However, some adjustments are needed to address different aspects of the architecture. For the most popular use cases, the C4 Model defines additional diagrams.

---

### System Landscape Diagram

The **System Landscape** diagram extends the C4 Model by representing the **broader ecosystem** of interconnected systems. Unlike the Context diagram, which focuses on a single system and its external interactions, it captures **multiple systems** across a portfolio, their relationships, and the high-level data flows between them, providing a **broader organizational perspective**.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.system_landscape.png" alt="C4 System Landscape" href="https://c4model.com/diagrams/system-landscape" msg="Source: https://c4model.com/" >}}

---

### Dynamic Diagram

The **Dynamic** diagram illustrates the **runtime behavior** of the system by detailing the interactions and **sequence** of events between components. Unlike the static structure of Container and Component diagrams, this diagram emphasizes how elements collaborate during specific **use cases or processes**, making it helpful in understanding workflows and runtime scenarios.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.dynamic_components.png" alt="C4 Dynamic Components" href="https://c4model.com/diagrams/dynamic" msg="Source: https://c4model.com/" >}}

---

### Deployment Diagram

The **Deployment** diagram adds a **physical** perspective to the C4 Model by showing how software elements are deployed across **hardware or infrastructure** nodes. Unlike the Container and Component diagrams, which describe the logical architecture, the Deployment diagram provides details about **environments, servers, containers**, and their connections, highlighting the operational aspect of the system.

{{< image-external src="../../../../../images/competencies/modeling/frameworks/c4.deployment.png" alt="C4 Deployment" href="https://c4model.com/diagrams/deployment" msg="Source: https://c4model.com/" >}}

---

## Recommended Reading

#### Articles

- Brown, S. *["Introduction to C4 Model"](https://c4model.com/introduction)*.
  Detailed description of the C4 architecture framework.
