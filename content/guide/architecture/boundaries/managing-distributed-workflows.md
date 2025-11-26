---
weight: 261
title: "Managing Distributed Workflows"
description: "This article explains what managing distributed workflows is, how orchestration and choreography compare, and how to use sagas to handle cross-service transactions safely."
icon: "article"
date: "2025-11-24T15:08:52+01:00"
lastmod: "2025-11-24T15:08:52+01:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Distributed workflows are how multiple services collaborate to complete a single business task: placing an order, resolving a ticket, or provisioning a user. Once you move beyond a monolith, these flows become one of the main sources of complexity and failure, so you need to design them as carefully as any API or data model.

## Understanding Distributed Workflows

Distributed workflows are not just “a bunch of services calling each other.” They are concrete, business-visible sequences in which partial failures, retries, and ordering matter. If you ignore their structure, coupling, and bugs accumulate in the shadows.

### From Local Transactions to Cross-Service Flows

In a monolith, a business action often maps to a single transaction:

* Update a few rows.  
* Fire a domain event or two.  
* Commit or roll back.

In a distributed system, the same action might involve:

* A ticket service updating state.  
* A payment service charging a card.  
* A fulfillment service scheduling work.  
* A notification service informing the user.

There is no single database transaction spanning all of this. Instead, you have a workflow: a set of local transactions, in some order, with rules about what to do when one fails.

### Semantic vs Implementation Coupling

Every workflow has semantic coupling: things that must happen together in the real world.

* You can’t ship before you have a paid order.  
* You can’t close a ticket before someone has worked on it.  

You cannot remove that coupling. What you *can* choose is how services coordinate:

* A central orchestrator that calls each service.  
* A network of services reacting to each other’s events.  

Those choices change implementation coupling, visibility, and failure modes—but not the underlying business dependencies.

## Orchestration: Centralized Coordination

Orchestration assigns one service to the workflow. That service (the orchestrator) does not own all the domain behavior, but it does own the sequence: who gets called, when, and what happens if something goes wrong.

A well-chosen orchestrator can turn a messy web of interactions into something you can understand, test, and reason about.

### How Orchestration Works

In an orchestrated workflow:

* A client calls the orchestrator with a business request.  
* The orchestrator invokes domain services in the correct order.  
* It tracks which steps were completed and which failed.  
* It decides how to recover: retry, compensate, or mark the workflow failed.

For example, an order-orchestration service might:

* Create an order record.  
* Call payment to charge the card.  
* Call fulfillment to reserve stock and schedule shipping.  
* Trigger email notifications.

The orchestrator owns the workflow state: it knows where each order is in the process and why.

### Strengths of Orchestration

Orchestration trades some centralization for clarity:

* **Single source of status** – you can ask one place, “What’s happening with this workflow?”  
* **Centralized error handling** – retries, backoffs, and compensations live in one service.  
* **Explicit logic** – the whole flow is visible in a single codebase and diagram.  
* **Saga-friendly** – many saga variants map naturally to an orchestrator that coordinates local transactions.

This works especially well when:

* Workflows have many branches and error paths.  
* Losing or misrouting a request would be a serious incident.  
* Stakeholders demand strong visibility and auditability.

### Costs and Risks of Orchestration

The same centralization creates risks:

* The orchestrator can become a bottleneck for throughput.  
* It is a single point of failure for the workflow.  
* All participating services become coupled to the orchestrator’s API and state model.  
* Teams may be tempted to stuff unrelated behavior into the orchestrator “because it’s central.”

You can mitigate some of this with partitioning, horizontal scaling, and careful design, but orchestration always adds a central dependency. The question is whether the workflow’s complexity and risk justify it.

## Choreography: Distributed Coordination

Choreography removes the central conductor. Each service knows its role and reacts to events or messages from others. The overall behavior emerges from their interactions.

This style favors autonomy and scale but makes the workflow harder to see and control.

### How Choreography Works

In a choreographed workflow:

* One service handles the initial request and emits an event.  
* Other services subscribe to that event and react, doing their part and emitting further events.  
* The chain continues until the business process is complete.

For example:

* Ticket service creates a ticket and emits `TicketCreated`.  
* Assignment service consumes `TicketCreated`, finds an expert, and emits `TicketAssigned`.  
* Notification service consumes `TicketAssigned`, sends a message to the customer, and emits `NotificationSent`.  

There is no single place that “knows the whole story.” Each service only knows its part.

### Strengths of Choreography

Choreography leans into the strengths of distributed systems:

* **High scalability** – no central coordinator on the hot path; services can scale independently.  
* **Local autonomy** – each service owns its behavior and reacts to events it cares about.  
* **Good fit for event-driven architectures** – when you already model changes as events, chaining them is natural.

It works particularly well when:

* Workflows are relatively simple and mostly happy-path.  
* Error cases are rare or local.  
* You care more about throughput and decoupling than about tight central control.

### Costs and Failure Modes of Choreography

The price you pay is in understanding and failure handling:

* Workflow logic becomes implicit and scattered across many services.  
* Error handling is harder: each service needs to know who to inform and how to react when something goes wrong.  
* Status queries (“Where is this order?”) require calling many services or building extra mechanisms.  
* Adding a new step often means updating multiple services, not just one coordinator.

Choreography is not “simpler” overall; it just moves complexity from a central place to the edges of many services.

## Who Owns Workflow State?

Workflow state answers questions like:

* Which steps have run?  
* What’s the current status?  
* Which compensations are still pending?

Where that state lives, coupling follows.

### Orchestrator as State Owner

In orchestration, the answer is straightforward:

* The orchestrator owns a workflow state store (often its own database).  
* Each step updates that state.  
* Status queries, dashboards, and retries all talk to the orchestrator.

This keeps state and coordination logic together, which is why orchestration works so well for complex flows.

### Front Controller in Choreography

In choreographed systems, one option is to pick a front controller:

* A domain service (often the first in the chain) tracks workflow state.  
* It calls or listens to other services, updating its local state as they respond.  

This gives you:

* A single place to query workflow status.  
* Better control over error handling.

But it also:

* Pollutes a domain service with coordination logic.  
* Increases its communication and responsibility.  

You have effectively embedded a mini-orchestrator inside a domain service.

### Stateless Choreography

Another option is no dedicated workflow state:

* Each service keeps only its local state.  
* To answer “What’s going on with this order?”, you query several services and reconstruct the picture.

This maximizes autonomy:

* Domain services stay focused on their own responsibilities.  
* There is no central state owner to manage or scale.

But:

* Status queries become expensive and complex.  
* It’s harder to debug, audit, or replay workflows.  

You’ve traded easy state queries for maximum decentralization.

### Passing a State Stamp

A middle ground is to pass a state stamp along with workflow messages:

* Each message carries workflow-related state.  
* Services update both local data and the stamp before sending the following message.  

Upsides:

* No extra queries for in-flight state: each message knows where the workflow is.  
* You avoid a separate state owner.

Downsides:

* Messages become heavier, and the stamp must evolve carefully as the workflow changes.  
* Ad hoc status queries are still awkward—you need to find a recent stamp or reconstruct from events.  

State stamps make sense when you mainly need the state during execution, not for arbitrary queries weeks later.

## Sagas: Transactions Across Services

Distributed workflows often involve changes that must remain logically consistent: reserving inventory, charging a card, updating a ticket, and emitting analytics. Sagas are the primary tool for coordinating those changes without pretending you still have a single ACID transaction.

### What is a Saga?

A saga is:

* A sequence of local transactions, each in its own service.  
* Plus compensating actions to undo effects if something fails.  

Instead of a global commit or rollback, sagas accept that:

* Other requests may see intermediate states.  
* Failures are handled by compensations and reconciliation, not magic atomicity.

This lets you keep services independent, at the cost of living with temporary inconsistency and more explicit failure handling.

### Dimensions of Saga Design

Every saga design choice lives on three axes:

* **Communication** – synchronous (blocking calls) vs asynchronous (messages, events).  
* **Consistency** – trying to behave atomically vs embracing eventual consistency.  
* **Coordination** – orchestrated vs choreographed.

Different combinations give you different saga “patterns”:

* Synchronous + atomic + orchestrated → familiar but heavy and slow.  
* Asynchronous + eventual + orchestrated → scalable with good control.  
* Asynchronous + eventual + choreographed → highly decoupled but harder to see.  
* Asynchronous + atomic + choreographed → a horror show of complexity.  

The point is not to memorize names; it’s to recognize which trade-off bundle you’re choosing.

### Useful Patterns vs Anti-Patterns

Patterns that often work well:

* **Orchestrated, eventually consistent sagas** – central state, precise error handling, but no pretense of global ACID.  
* **Asynchronous, orchestrated sagas with parallel steps** – good responsiveness and throughput, with centralized coordination.  
* **Event-driven choreographed sagas** – powerful when you have strong observability and experienced teams.

Patterns to use sparingly:

* **Atomic sagas with heavy compensation** – still not real ACID, but expensive, slow, and user-hostile when things go wrong.  
* **Asynchronous, atomic, choreographed sagas** – maximum dynamic coupling and minimal clarity; treat this as an anti-pattern.  

If you find yourself inventing clever compensations to pretend the system is atomic, it’s often a signal to rethink consistency and coordination, not to add more saga machinery.

## Choosing Coordination Styles and Saga Patterns

There is no universal “best” between orchestration and choreography, or between saga patterns. You choose based on the workflow’s semantics and the business risks.

### Start from Business Concerns, Not Technology

Ask:

* What goes wrong if a step is skipped, repeated, or delayed?  
* Do we care more about never losing a request or about handling huge volume?  
* How often do we need to query workflow status, and how fresh must it be?  

You cannot make a semantically complex workflow simple with clever coordination. You can only pick an implementation that keeps complexity manageable for your teams.

### Signals for Orchestration

Orchestration is usually the better fit when:

* Error handling and compensations are numerous and nuanced.  
* Business demands strong guarantees against lost or misrouted work.  
* Stakeholders expect easy status queries and audit trails.  
* You need a clear place to implement and evolve workflow logic.

In these cases, a central orchestrator, combined with an eventually consistent saga pattern, often provides the best balance between control and responsiveness.

### Signals for Choreography

Choreography shines when:

* You have high-volume, relatively simple workloads.  
* Error scenarios are rare or local to one service.  
* You already have strong event-driven infrastructure and practices.  
* Scale and resilience matter more than central visibility.

Here, choreographed, asynchronous, eventually consistent sagas can give you excellent throughput and fault tolerance—if you invest in good observability.

### Mixing Styles Intentionally

Most real systems use both styles:

* Core, high-risk workflows (like primary ticket flows or payment pipelines) lean on **orchestration**.  
* Peripheral or high-scale workflows (like notifications, analytics, enrichment) lean on **choreography**.  

You can even mix within a single workflow:

* Use orchestration for the backbone steps and error handling.  
* Let specific steps fan out asynchronously via events.  

The key is to choose styles per workflow and per slice, not based on a blanket preference.

## Making Distributed Workflows Governable

Design is not enough; distributed workflows also need to be discoverable, testable, and debuggable over time.

### Naming and Tagging Sagas

Treat sagas and workflows as first-class citizens:

* Give each significant workflow a name (for example, `NEW_TICKET`, `COMPLETE_ORDER`).  
* Tag service entry points in code with these saga names.  
* Build simple tools to list which services participate in which sagas.

This lets you:

* See the blast radius of changes before you touch code.  
* Plan integration tests by saga, not just by service.  
* Keep an inventory of live workflows instead of relying on tribal knowledge.

### Observability and Debugging

Good workflow observability requires more than logs:

* Use correlation IDs to follow a single workflow across services.  
* Emit structured events for key steps and failures.  
* Build dashboards that show saga progress and failure rates by step.

In orchestrated systems, the orchestrator is a natural place to expose this. In choreographed systems, you need cross-service tracing and event analytics to reconstruct what’s happening.

### Documenting Decisions

Finally, capture why you picked a particular style for a workflow:

* Record architectural decision records (ADRs) that list context, options, trade-offs, and the chosen coordination style.  
* Explicitly justify orchestration when scale might suffer, or choreography when error handling will be harder.

When requirements change—higher volume, stricter SLAs, new compliance rules—those ADRs make it much easier to revisit decisions and evolve workflows deliberately rather than reactively.

## Summary

Distributed workflows are where services, data, and people's expectations collide. You cannot remove the semantic coupling in a business process, but you can choose coordination styles and saga patterns that keep it manageable. Orchestration gives you central state, precise error handling, and easy visibility at the cost of centralization; choreography gives you autonomy and scale at the expense of implicit logic and harder failure handling.

By thinking in terms of workflow state ownership, communication style, consistency model, and coordination, you can design workflows that align with business risk: orchestrated and strongly visible when correctness matters most, and choreographed and event-driven when scale and resilience dominate. Treat sagas and workflows as first-class architectural elements—with names, tags, observability, and ADRs—and your distributed system can evolve without losing track of how work really flows through it.

## Recommended Reading

#### Books

* Neal Ford, Mark Richards, Pramod J. Sadalage, & Zhamak Dehghani (2021). *[Software Architecture: The Hard Parts](https://www.oreilly.com/library/view/software-architecture-the/9781492086888/)*. O'Reilly Media.  
  * **Chapter 11: Managing Distributed Workflows**\
    Compares orchestration and choreography in depth, explores workflow state ownership options, and links workflow semantics to coordination choices.  
  * **Chapter 12: Transactional Sagas**\
    Presents saga patterns as combinations of communication, consistency, and coordination, and shows how to pick patterns that balance responsiveness, complexity, and correctness.
