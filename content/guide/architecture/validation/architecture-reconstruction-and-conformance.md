---
weight: 304
title: "Architecture Reconstruction and Conformance"
description: "This article explains what architecture reconstruction and conformance are, and how to recover structure from code and keep implementations aligned with the intended architecture."
icon: "article"
date: "2025-01-19T15:08:52+01:00"
lastmod: "2025-01-19T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Most systems outlive their original diagrams. Code evolves, shortcuts pile up, and the “real” architecture drifts away from anything written down. Architecture reconstruction and conformance give you a way to rediscover what you actually have and decide whether you want to keep it that way.

## Why Reconstruction and Conformance Matter

Architecture decisions don’t stay pristine. Teams change, features arrive under pressure, and tools or platforms are replaced. Over time, the implemented system quietly diverges from the intended architecture.  

Reconstruction and conformance let you address this reality rather than pretending the original design is still true. Reconstruction recovers architecture from implementation and behavior. Conformance compares that recovered view with the intended one, identifies gaps, and helps you decide whether to fix code, update the architecture, or both.  

Without these activities, you are effectively designing on top of myths: you make decisions assuming certain boundaries, dependencies, and qualities exist, when in fact the system behaves differently in production.

### Typical Signals You Need Reconstruction

You usually don’t start a reconstruction project by choice; the system forces your hand. Common signals include:  

* No one trusts the existing architecture diagrams or documentation.  
* Teams repeatedly “discover” unexpected dependencies during refactors or incidents.  
* A major modernization, migration, or regulatory change is coming, and you don’t actually know what you are about to move.  
* Different teams give conflicting descriptions of what the system looks like.  

At that point, you can either keep guessing or do the work to reconstruct architecture from the artifacts that never lie: code, configuration, and runtime behavior.

## What Is Architecture Reconstruction?

Architecture reconstruction is the process of recovering architectural views from an existing system by analyzing its implementation and runtime behavior. It turns sprawling codebases and opaque runtime interactions into structured models you can reason about.

### Goals of Reconstruction

Reconstruction has four main goals:  

* **Understanding:** Build a trustworthy picture of how the system is currently structured and how responsibilities are distributed.  
* **Evolution:** Provide a basis for planning changes, refactors, or migrations grounded in reality.  
* **Documentation:** Produce up-to-date architectural artifacts that new people can rely on.  
* **Preparation for Conformance:** Create models that can be compared with the architecture you believe you have or want.  

The output is not just a graph of classes or services. The point is to reach a level of abstraction where you can talk about modules, subsystems, and flows in a way that matches how people think about the system.

### The Reconstruction Workflow

While details differ by tech stack and tooling, most reconstruction efforts follow a similar pattern.

##### Information Extraction

You start by pulling information from implementation artifacts and runtime behavior:  

* Source code and build scripts.  
* Configuration files, deployment descriptors, infrastructure-as-code.  
* Database schemas, message schemas, and API definitions.  
* Runtime logs, traces, and call graphs.  

Static analysis tools extract dependency graphs, module relationships, and layering information. Dynamic analysis tools capture which components actually talk to each other at runtime and how often.

##### Model Construction

Next, you turn raw data into architectural views. Common examples are:  

* **Module view:** Static structure—packages, modules, services, and their dependencies.  
* **Component-and-connector view:** Runtime interactions—calls, messages, queues, events.  
* **Allocation view:** How software elements map onto hardware, containers, regions, or even teams.  

The key is to group low-level elements into architectural components and subsystems. You don’t want a diagram with 5,000 boxes; you want one with a manageable number of meaningful building blocks.

##### Abstraction and Refinement

Reconstruction is iterative. Early models will be too noisy or too detailed. You refine them by:  

* Clustering related elements into subsystems that match business capabilities or technical responsibilities.  
* Removing incidental detail that doesn’t help you reason about structure.  
* Aligning names and boundaries with how teams talk about the system today.  

Often, you’ll discover that some “logical” component is actually scattered across multiple services or that a supposedly isolated subsystem leaks dependencies everywhere. Those insights are exactly why you reconstruct.

##### Analysis

Once you have usable models, you can analyze them for:  

* Cycles and tight couplings between subsystems.  
* Violations of expected patterns (for example, UI directly calling databases).  
* Structural bottlenecks and single points of failure.  
* Opportunities to extract or merge components.  

This analysis feeds into modernization plans, risk assessments, and, eventually, conformance work.

## What Is Architecture Conformance?

Architecture conformance is about verifying that the implemented system behaves as intended by the architecture. It compares the reconstructed models with the intended architecture—your reference—and highlights where they differ.

### Intended vs Actual Architecture

To do conformance, you need two things:  

* A description of the **intended architecture**: views, principles, and concrete rules (for example, layering constraints, allowed dependencies, ownership of data, approved communication patterns).  
* The **reconstructed architecture**: what actually exists in code and runtime behavior.  

Conformance analysis compares these and surfaces deviations—places where the implementation violates the rules or where the intended architecture no longer matches reality.

### Types of Architectural Deviation

You will typically see two patterns:  

* **Drift:** Gradual, often unintentional deviations where the architecture mostly matches the intent but with minor violations (extra dependencies, new exceptional cases).  
* **Erosion:** Larger, more serious departures where core principles are broken (shared databases between services, bypassed layers, duplicated responsibilities).  

Not all deviations are bad. Sometimes the system has evolved in a sensible direction that the original architecture never anticipated. Conformance is a diagnostic, not a moral judgment: it tells you what changed so you can decide whether to bless it or fix it.

### Conformance Analysis Workflow

A typical conformance process looks like this.

##### Define and Clarify the Intended Architecture

You begin by capturing the intended architecture in a form that’s precise enough to compare:  

* Structural rules: which modules belong to which layer or subsystem, and which dependency directions are allowed.  
* Ownership rules: which components own which data or external contracts.  
* Interaction rules: which components are allowed to communicate directly and how.  

For legacy systems, this step may require interviews, archival research, and making explicit decisions about what you *now* consider “intended.”

##### Compare Models

You then compare the reconstructed models with the intended rules:  

* Does any UI component call directly into data access layers, bypassing the domain?  
* Do services hold references or connections to databases they shouldn’t touch?  
* Are there cross-boundary calls or dependencies that violate the chosen architecture style?  

This can be partly automated (rule-based checks on dependency graphs and static analysis) and partly manual (reviewing critical flows against intended patterns).

##### Assess Impact and Decide Actions

Not every violation deserves the same treatment. For each deviation, you ask:  

* Does this threaten key qualities (modifiability, performance, security, compliance)?  
* Is it on a critical path for revenue or risk?  
* Is it a one-off hack or a systemic pattern?  

Based on this, you decide whether to:  

* Refactor code to restore conformance.  
* Update the intended architecture to match reality (if the deviation is actually a sensible evolution).  
* Accept the deviation temporarily but track it as technical debt.

## Techniques and Tools

You can run reconstruction and conformance with pen-and-paper thinking, but tools make it scale to real systems.

### Static and Dynamic Analysis

Static analysis tools read source code and configuration to build dependency graphs and structural models. They help you:  

* See module and layer dependencies.  
* Detect cycles and forbidden imports.  
* Identify “god” modules with excessive responsibilities.  

Dynamic analysis tools observe runtime behavior:  

* Traces and call graphs reveal which services actually talk to which.  
* Profilers show where time and memory are really spent.  
* Monitoring and logs expose how components behave under real traffic.  

Combining both gives you a fuller picture: static structure plus runtime reality.

### Rule-Based Conformance Checking

Once you have models, you can encode architectural rules as machine-checkable constraints. For example:  

* “Classes in the UI package must not depend on repository classes.”  
* “Service A must not access database B.”  
* “All outbound HTTP calls from this component must go through a specific gateway library.”  

Static conformance tools can run these checks on every build, turning architecture rules into living tests rather than static documents. Over time, this prevents new violations and reveals where legacy ones still exist.

### Visualization and Communication

Visualizations—graphs, layered diagrams, and dependency heatmaps—are crucial for explaining findings to others. They help you:  

* Show where the architecture matches intent and where it doesn’t.  
* Illustrate hotspots of coupling and complexity.  
* Communicate modernization plans with clear before/after views.  

The goal isn’t a perfect diagram but a shared understanding of where structure supports or blocks your goals.

## Challenges and Trade-offs

Reconstruction and conformance are powerful but not free. You have to decide how deep to go and how much effort is justified.

### Working With Incomplete or Conflicting Information

Legacy systems often come with missing or contradictory documentation. Even the people who built them may disagree on what the architecture “really” is.  

In practice, you accept that:  

* The intended architecture will include assumptions and decisions made now, not just historical truth.  
* Reconstruction models will be approximations—useful, but not perfect.  

The trick is to validate models with multiple sources: code, runtime behavior, and human knowledge. Where they disagree, you dig deeper or treat the area as high-risk.

### Complexity and Scale

Modern systems—microservices fleets, hybrid cloud setups, polyglot stacks—can be enormous. Fully reconstructing every detail is rarely worth it.  

You can manage this by:  

* Focusing first on critical slices: core business flows, high-risk interfaces, and systems in scope for upcoming change.  
* Choosing appropriate levels of abstraction: you may group some services or modules when their internal differences don’t affect the decisions you need to make.  

The goal is to gain an actionable understanding, not to capture every last detail.

### Keeping Reconstruction and Conformance Ongoing

A one-off reconstruction is a snapshot. Systems keep changing, so the moment you stop, your models start to age.  

To keep things useful:  

* Integrate conformance checks into CI/CD pipelines so new violations are caught early.  
* Schedule periodic light-weight reconstruction passes, especially before major initiatives.  
* Treat architecture documentation as a living artifact that gets updated alongside code and tests.  

Otherwise, you’ll be back to “we don’t trust the diagrams” in a year.

## Summary

Architecture reconstruction and conformance close the gap between how you think your system is built and how it actually behaves. Reconstruction recovers structure and behavior from code and runtime data, giving you honest architectural views. Conformance compares those views with your intended architecture, surfaces drift and erosion, and forces you to deliberate about what to fix and what to embrace.  

Together, they turn legacy and evolving systems into understandable, governable assets. Instead of stacking new designs on top of outdated assumptions, you can base your architectural work on reality—and keep it that way as the system continues to change.

## Recommended Reading

##### Books

* Bass, L., Clements, P., & Kazman, R. (2012). *[Software Architecture in Practice](https://www.amazon.pl/Software-Architecture-Practice-Len-Bass/dp/0321815734)*. Addison-Wesley Professional.  
  * **Chapter 20: Architecture Reconstruction and Conformance**\
    Describes a complete approach to recovering architecture from existing systems and analyzing how well implementations conform to intended designs, with practical guidance and examples.
