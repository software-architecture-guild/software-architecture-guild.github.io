---
weight: 620
title: "C4 Model"
description: ""
icon: "document_scanner"
date: "2024-09-08T10:39:56+02:00"
lastmod: "2024-09-08T10:39:56+02:00"
draft: false
toc: true
---

## TODO

The **C4 model** is a hierarchical framework designed for visualizing the
architecture of software systems. It emphasizes **clarity and simplicity**, making
it accessible for both technical and non-technical stakeholders. The framework
consists of a set of diagram types that represent **different levels of
abstraction**, enabling users to convey the architecture of a system effectively.
It is **tool-agnostic**, allowing various tools to be employed for creating the
diagrams.

One of the significant benefits of the C4 model is its **"zoom-in" approach**,
allowing stakeholders to navigate from high-level diagrams to more detailed
ones. For example, an element depicted in the context diagram can be further
elaborated in a container diagram, and each container can be broken down into
its components in subsequent diagrams. This hierarchical representation not only
facilitates a deeper understanding of each element but also ensures that each
diagram serves a **specific purpose** while contributing to the overall narrative of
the system architecture.

## Abstractions

The framework defines elements of an architecture as a set of hierarchical
building blocks, namely:
- **Software system**, highest level of abstraction, brinding value to the end
  user
- **Container** - runtime boundary around an executable code or data stoaage,
  e.g. web application, database, etc.
- **Component** - grouping of related functionality, not separately deployable
- **Code** - lowest abstraction level, representing classes, functions and other
  entities from the programming language.

Each bulding block is composed from smaller blocks.
<img
  align="center"
  src="../../../../../images/competencies/modeling/architecture_frameworks/c4_model/abstractions.png"
  alt="Architecture Process"
  width="75%"
  height="75%"/>
<br>
Source: https://c4model.com/

## Diagram Types

Framework defines multiple diagram types, linked tightly to the abstractions
defined above:
<img
  align="center"
  src="../../../../../images/competencies/modeling/architecture_frameworks/c4_model/SystemContext.png"
  alt="Architecture Process"
  width="75%"
  height="75%"/>
<br>
Source: https://c4model.com/

**Context Diagram:** Provides a high-level overview of the system and its
interactions with external entities. This diagram sets the stage for
understanding how the system fits into its broader environment.

<img
  align="center"
  src="../../../../../images/competencies/modeling/architecture_frameworks/c4_model/Containers.png"
  alt="Architecture Process"
  width="75%"
  height="75%"/>
<br>
Source: https://c4model.com/

**Container Diagram:** Breaks down the system into its major containers,
illustrating relationships between them. This level of detail allows
stakeholders to see how different parts of the system interact.

<img
  align="center"
  src="../../../../../images/competencies/modeling/architecture_frameworks/c4_model/Containers.png"
  alt="Architecture Process"
  width="75%"
  height="75%"/>
<br>
Source: https://c4model.com/

**Component Diagram:** Offers a detailed view of the components within a specific
container and their interactions. This helps in understanding the internal
structure of the container and how components collaborate to fulfill system
requirements.

<img
  align="center"
  src="../../../../../images/competencies/modeling/architecture_frameworks/c4_model/Code.png"
  alt="Architecture Process"
  width="75%"
  height="75%"/>
<br>
Source: https://c4model.com/

**Code Diagram:** Focuses on the implementation level, typically showing classes
or modules within a component. This diagram is particularly useful for
developers to grasp the details of the code structure.

## Static vs. Dynamic Diagrams

In addition to the various diagram types, it’s essential to understand the
**distinction between static and dynamic diagrams**. **Static diagrams** illustrate the
**structure of a system** at a specific point in time, detailing its components and
their relationships. **Dynamic diagrams**, on the other hand, depict **how the system
behaves over time**, showcasing interactions and processes as they occur. This
differentiation helps stakeholders appreciate both the **architectural layout and
the functional behavior** of the system. C4 Model also defines the dynamic
diagram type along with other custom types.

## Recommended Reading

##### Articles

* Brown, S. *["Introduction to C4 Model"](https://c4model.com/introduction)*.
  Detailed description of the C4 architecture framework.
