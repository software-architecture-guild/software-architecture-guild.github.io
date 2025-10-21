---
weight: 415
title: "Value Streams"
description: "This article explains what value streams are and how to identify them."
icon: "article"
date: "2024-10-01T16:42:31+02:00"
lastmod: "2024-10-01T16:42:31+02:00"
draft: false
toc: true
authors:
-  "ilya-hardzeenka.md"
---

Value streams shift the focus from managing tasks and activities to managing how value moves from concept to delivery. They make software work legible to the business by tracing end-to-end flow and aligning development with outcomes. In this lens, all work is categorized as features, defects, risks, or debt. The goal is to monitor and optimize how these items progress through the system so that delivery reflects real business priorities.

## Definition

A value stream can be defined via two-dimensional map:

- **Horizontal (Time):** the end-to-end stages from trigger to value realized. Here we map the content of a stream.
- **Vertical (Customer):** the segments/personas/jobs-to-be-done you serve (e.g., SMB vs Enterprise; within Enterprise: IT Admin vs Business User). Here, we define how many and what kinds of value streams we will have.

A value stream exists where a contiguous path across time for a specific customer slice produces a customer-recognizable outcome measured by a single north-star metric. Beyond being a process, a value stream is a **structured unit of business**: the end-to-end sequence of activities required to deliver a product, service, or solution from concept through delivery and ongoing support: engaging cross-functional teams, tools, and systems so value continuously flows to the customer.

### Key Components of a Value Stream

- **Flow of Work:** features (new functionality), defects (issues), risks (compliance/security), and technical debt (long-term improvements).  
- **Continuous Delivery:** streams are dynamic and emphasize iterative delivery over project completion.  
- **Continuous Improvement:** visibility via flow metrics (velocity, time, efficiency, load, distribution) to surface bottlenecks and opportunities.  
- **Customer-Centric Focus:** design every activity around customer outcomes.  
- **Alignment with Business Goals:** ensure work supports measurable, strategic objectives.

{{< image src="../../../images/organization/engineering.value_stream.drawio.png" alt="Value Stream" >}}

### The Four Flow Items

- **Features**: new functionality delivered to customers.  
- **Defects**: problems that must be fixed.  
- **Risks**: compliance, security, and related risk work.  
- **Debt**: technical shortcuts that accumulate and must be addressed.

These four categories are the unit of analysis for value streams: they reveal what is being delivered, what is being stabilized, what is being protected, and what is being paid down.

### Measuring Flow in Value Streams

Flow metrics provide transparency into how work moves and where it stalls.

- **Flow Velocity**: how many flow items are completed per period.\
  Indicates the delivery rate across features, defects, risks, and debts.
- **Flow Time**: elapsed time from start to completion for a work item.\
  Longer times highlight bottlenecks or inefficiencies in the stream.
- **Flow Load**: number of active items in progress.\
  Excess load overwhelms teams and slows delivery.
- **Flow Efficiency**: ratio of active time to waiting time (approvals, handoffs, etc.).\
  Low efficiency signals delays unrelated to actual work.
- **Flow Distribution**: mix of work across the four item types.\
  Prevents overemphasis on new features at the expense of defects, risks, or debt.

These measures let organizations manage software with the same rigor they apply to other critical business functions.

### Value Streams vs. Revenue Streams

A **revenue stream** captures value for the business; a **value stream** delivers value to customers. Many value streams generate revenue, but some (e.g., compliance or internal enablement) do not and are still essential to sustained delivery. You can reverse-engineer value streams by following revenue: track what customers pay for and how it is delivered to surface under-recognized or under-resourced streams.

### Top-Level and Supporting Streams

Top-level streams align to distinct customer value (e.g., **Electric Vehicles**, **Trucks and SUVs**, **Fleet Sales**), each with its own customers, products, pipelines, metrics, and risks: even when underlying parts overlap. Supporting streams (e.g., **Engine Production**, **Battery Cell Assembly**, **Software Updates for In-Vehicle Systems**) provide shared capabilities critical to delivering those customer-facing streams.

## Managing Value Streams Over Time

Value streams evolve as products, teams, and technologies change. Continuous monitoring and improvement keep them aligned with business goals. A connected **value stream network**, which includes the tools and processes through which work flows, supports this visibility. Organizing around a **product model** aligns teams, technology, and goals to a shared product vision, ensuring the stream’s structure reflects the outcomes it owns.

### Evolving Streams

As markets and technology shift, streams change. In the car domain, subscription-based software services (real-time navigation, premium audio, remote diagnostics, over-the-air updates) can crystallize into a distinct stream: **Digital Experience and Connected Services**: with its own tech stacks, teams, and customer interactions. A practical operating cadence is to **review your value-stream map every six months** or after major market shifts.

## Identifying Value Streams

### Value Stream Mapping

**Value Stream Mapping (VSM)** visualizes, analyzes, and improves the flow of materials, information, or work. By mapping the current process, including value-added and non-value-added activities, organizations pinpoint inefficiencies, bottlenecks, and waste that hinder delivery. When used to identify value streams, VSM exposes how value is delivered from conception to delivery and helps surface distinct streams that produce customer-recognizable outcomes.

Follow this numbered process to identify your value streams:

1. **Choose outcomes and customer scope**  
   List 1–3 business outcomes (revenue, retention, cost, risk).\
   Decide the primary segmentation (e.g., SMB vs Enterprise) and any secondary persona/job layer (e.g., Enterprise: IT Admin, Business User).\
   *Write: “We win when **{OUTCOME}** happens for **{SEGMENT}** (segment/persona).”*

2. **Draft the timeline**  
   Name the minimal stages from trigger → value realized (business-level only).\
   *Example stages: Trigger → Discover → Decide → Transact/Contract → Deliver/Activate → Prove Value.*

3. **List customer segments and personas**  
   Enumerate the segments/personas/jobs you serve (e.g., SMB; Enterprise: IT; Enterprise: Business).

4. **Capture business facts per stage and segment**  
   For each segment at each stage, capture only:\
   *Intent, Proof point (qualified, signed, activated, paid, resolved), Policy/SLA, Primary metric influenced.*

5. **Mark material divergences**  
   Highlight where a segment differs in trigger, proof point, policy/SLA, or metric. Note any forks (extra steps, approvals, security checks) that appear only for certain segments/personas.

6. **Trace paths to value by segment**  
   For each segment/persona, confirm a contiguous path from trigger to value realized. If a segment splits into forks with different finish lines or metrics, treat them as separate candidate streams.

7. **Define candidate value streams**  
   For each candidate path, specify:\
   *Name, Customer slice, Start trigger → finish line, North-star metric, Key proof points*

8. **Pressure-test each candidate**  
   *New offer:* Can this path deliver end-to-end for this segment without relying on other paths for the core outcome?\
   *Disruption:* If it stalls, does value stall only here (good) or everywhere (bad)?\
   *Policy change:* Can obligations change here without rewriting other paths?

9. **Lock the minimal set**  
   *Split* when triggers/finish lines/metrics/policies differ materially for a segment/persona.\
   *Merge* when they share the same trigger, finish line, and north-star metric.\
   *Stop* at the smallest set that makes value creation legible.

### Decision Criteria & Checks

- **Time integrity:** All stages from trigger → value realized with clear proof points.  
- **Customer clarity:** Targets a specific segment/persona/job** with a single north-star metric.  
- **Fork intensity:** Unique steps/approvals → justify a separate stream.  
- **Policy/SLA deltas:** Materially different obligations (audits, response targets, data handling) → separate streams.  
- **Trigger & finish alignment:** Distinct triggers or distinct “value realized” → separate.  
- **Cadence & learning loop:** One segment experiments rapidly vs another regimented → separate.  
- **Blast radius containment:** Failures mostly impact the target segment/persona’s outcome.  
- **Simplicity:** A new exec can explain the 2D map in 60 seconds.

### Operating Principles and Cautions

Identifying a value stream is the beginning; effective delivery requires dedicated teams, transparent governance, and focused metrics. Avoid creating separate streams without a clear need for distinct governance or delivery; prefer the fewest streams that keep value creation legible. Architects and engineers typically don’t make or manage streams directly, but understanding them sets boundaries for technical architecture decisions and keeps investments aligned to business outcomes.

## Architectural Impact of Value Stream Boundaries

Value streams shape architecture indirectly—through funding, management, and team boundaries—and directly via choices about centralized vs. distributed capabilities. Defining Internal/Supporting Value Streams is an explicit decision to manage specific capabilities centrally and offer them as a service to Customer Value Streams (for example, platform, identity, observability, data, billing, CRM, onboarding). Architectural seams then follow: standardized contracts, shared controls, and multi-tenant isolation around those shared services. Suppose you don’t establish shared/supporting streams. In that case, the centralization impulse doesn’t vanish—it’s often recreated inside each Customer Value Stream as a small “mini-platform” with its own paved road and internal contracts.

### Shared vs. Owned: the core lever (generic)

- **Shared capabilities** — Centralized, funded, and staffed once; offered self-service to all streams. This concentrates expertise, increases consistency, and encourages uniform integration and control patterns.  
- **Owned capabilities** — Embedded within a stream and tailored to its outcomes and obligations. This maximizes autonomy and pace, but risks duplication and divergence across streams.

{{< alert icon=" " text="Explicit call-out: Infrastructure as the canonical driver:<br>The shared-vs-owned split is most forceful in infrastructure. A shared platform pushes standardized runtimes, security, and telemetry with strong guardrails; stream-owned stacks push isolation by default, bespoke topologies, independent release trains, and strong boundaries to avoid tight coupling." />}}

### Where the boundary shows up in the system

Each item can be shared across streams or owned within a stream. Your choice sets seams, contracts, and quality-attribute tactics.

- **User experience (shell, design system, UIs)**  
  Treat the UX layer as your front door. Shared provides a single shell and design system where streams plug in features, ensuring consistency and accessibility come for free. Owned lets each stream shape its UI to fit its journey, emphasizing speed and specialization, but allowing for more divergence. Implication: define navigation contracts, theming tokens, and who controls shell version bumps.

- **Identity and access (authN/Z, roles, entitlements)**  
  Identities span the whole product. Shared centralizes sign-in, tokens, and entitlements for a single audit plane. Owned refines roles and entitlements to match a stream’s outcomes. Implication: declare the entitlements source of truth, document cache and validation rules, and prevent policy drift.

- **Data ownership and persistence (system of record, schemas)**  
  Data follows who owns “done.” Shared central records publish clean, versioned read models to everyone. Owned puts writes with the stream that delivers the customer-recognizable outcome; others subscribe to events and build read views. Implication: keep writes where value is realized, version events and schemas, and plan explicit evolution paths.

- **Integration and events (APIs, messages, workflows)**  
  Boundaries need clarity. Shared gateways and buses standardize auth, retries, idempotency, and schemas. Owned choreography favors decoupling and responsiveness. Implication: prefer asynchronous edges at stream seams; when synchronous is required, keep contracts explicit and versioned.

- **Infrastructure and runtime (compute, network, storage, CI/CD)**  
  This is the canonical driver. Shared provides a paved road for clusters, pipelines, secrets, policy-as-code, and guardrails. Owned tailors stacks to segment needs with independent release trains and scaling. Implication: this choice defines isolation, blast radius, and the smallest unit you can scale.

- **Security, compliance, and policy (audit, residency, keys)**  
  Controls must be provable. Shared centralizes evidence such as key management, audit trails, and residency policies. Owned tightens controls where obligations differ. Implication: map obligations to deployment topologies and document which controls are platform versus stream.

- **Observability and SLOs (logs, traces, metrics, flow checkpoints)**  
  You can’t improve what you can’t see. Shared telemetry unifies dashboards and SLO templates. Owned sharpens signals for local needs. Implication: regardless of ownership, emit events at business proof points so the flow from trigger to value is visible end-to-end.

- **Release and delivery tooling (build, deploy, approvals)**  
  Delivery is culture in code. Shared pipelines enforce provenance, SBOMs, and policy checks. Owned pipelines tune for pace and context. Implication: establish minimum standards for security and compliance, even when streams customize their path.

- **Failure domains and scaling (isolation, capacity, hot paths)**  
  Boundaries decide blast radius. Shared multi-tenant setups need strong partitioning to avoid wide outages. Owned isolates by default and scales only the hot path. Implication: design day-to-day isolation first; do disaster recovery and backups per boundary, not as a substitute for good compartmentalization.

- **Analytics and reporting (metrics, models, BI)**  
  Decisions need consistent numbers. Shared warehouses and metric layers define canonical KPIs. Owned models answer stream-specific questions. Implication: declare which KPIs are global versus local and publish metric-logic contracts.

- **Billing (pricing, invoices, payments, refunds)**  
  Money flows demand rigor. Shared ledgers and payment integrations provide controls and reconciliation. Owned variations, such as plans and promotions, sit closer to the stream’s journey with settlement back to the ledger. Implication: model money events (for example, Charge Captured, Refund Issued) so streams integrate without tight coupling.

- **CRM and customer records (accounts, contacts, entitlements)**  
  Think of CRM as the golden source of customer truth. Shared publishes clean, versioned read models to all streams. Owned keeps an augmented view tailored to journeys while deferring canonical fields to the shared source. Implication: declare golden fields, emit change-data events, and keep stream enrichments additive, not authoritative.

- **Customer onboarding and provisioning (KYC, setup, policy checks)**  
  First impressions set the tone. Shared reusable workflows apply segment-aware policies centrally. Owned handles niche steps for specific personas. Implication: expose onboarding states and events so downstream streams progress without synchronous blocking.

### What architects optimize

- **Map ownership to design** — Make platform/shared versus stream-owned responsibilities unambiguous; don’t let ambiguity leak into code.  
- **Seal the seams** — Define narrow, versioned contracts (events and APIs); prefer asynchronous edges at stream boundaries.  
- **Protect the record** — Place writes where the outcome lives; publish read models elsewhere.  
- **Tune by obligations** — Let policy and SLA deltas (latency, audit, residency) drive topology and controls per stream.  
- **Contain blast radius** — Isolate runtime, state, and deployment units so incidents remain local.  
- **Instrument the flow** — Track Flow Time, Velocity, Load, Efficiency, and Distribution per stream, with checkpoints tied to business proof points.  
- **Keep platforms thin** — If shared, provide a paved road and guardrails, not business logic. If stream-owned, avoid accidentally rebuilding a heavy platform; standardize just enough.

## Conclusion

Value streams make software delivery measurable in terms that the business recognizes: outcomes, evidence, and flow. Framing all work as features, defects, risks, or debt, and tracking velocity, time, load, efficiency, and distribution, exposes bottlenecks and rebalances investment. The two-dimensional, segment-aware view clarifies triggers, proofs, policies, and “done,” producing cleaner seams and the smallest proper set of streams. Because streams evolve, review them regularly and sustain them with dedicated teams, governance, and metrics to ensure the architecture remains aligned with the value realized for each segment.

## Recommended Reading

#### Books

- Kersten, M. (2018). [Project to Product: How to Survive and Thrive in the Age of Digital Disruption with the Flow Framework](https://flowframework.org/ffc-project-to-product-book/). IT Revolution Press.  
  - **Chapter 3: Introducing the Flow Framework**\
    Provides the core framing of value streams and the four flow items, shifting attention from activity management to value flow and alignment with business outcomes.
  - **Chapter 4: Capturing Flow Metrics**\
    Defines the flow metrics—velocity, time, load, efficiency, and distribution — and explains how they create transparency and reveal bottlenecks.
  - **Chapter 9: Value Stream Management**\
    Emphasizes continuous improvement, the value stream network, and the product model to keep streams aligned with evolving business goals.
