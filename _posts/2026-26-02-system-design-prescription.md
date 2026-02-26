---
layout: post
title:  "System Design - Prescription App"
date:   2026-02-17 00:00:00 +0100
categories: [training, system design]
---
# System Design Exercise #1

## Designing a Scalable Prescription Management System

Today’s problem: design a cloud-based prescription platform used by tens of thousands of prescribers, delegates (OBO), pharmacies, and patients. The system must support controlled substances, delegation workflows, state-based licensing, multi-DEA handling per organization, strong auditability, and high availability.

Target constraints include:

* P99 < 300ms on core validation/write path
* Strong consistency for prescription writes
* Horizontal scalability
* Zero data loss
* Multi-region deployment (US)
* Regulatory-grade auditability (HIPAA-level)

This article does not focus on frameworks or tools. It focuses on properties and invariants.

---

# Step 1 — Clarify What Actually Matters

The first mistake in system design is jumping to technologies.

The correct first step is identifying **invariants** — properties that must never be violated, even under concurrency, retries, crashes, or network partitions.

In this domain, five non-negotiable invariants emerge:

### 1. Authorization Invariant

A prescription can only be created or signed by an actor authorized at that exact moment (prescriber or approved delegate within defined scope).

### 2. Eligibility Invariant

At signing time, eligibility constraints must hold:

* Valid license in patient’s state
* Controlled substance ⇒ valid DEA (if required by organization feature flag)

These checks must not be stale at signing time.

### 3. Immutability Invariant

After signing, clinical payload is immutable.
No edits. No patching of drug, dosage, or patient info.
Only lifecycle metadata (status transitions) may evolve.

### 4. Audit Completeness Invariant

Every state transition and every access to PHI must be durably recorded with:

* Actor
* Timestamp
* Correlation identifier

No silent mutation.

### 5. Idempotency Invariant

Retrying a submission must not create duplicate signed prescriptions or duplicate transmissions without explicit new intent.

These invariants define the architecture more than any choice of queue or database.

---

# Step 2 — Strong vs Eventual Consistency

Consistency is about **what readers are allowed to observe, and when**.

Strong consistency means:
Once a write is acknowledged, all subsequent reads must observe that write.

Eventual consistency means:
Readers may temporarily see stale data, but the system converges.

### Must Be Strongly Consistent

The **signing operation**:

Atomic transaction must include:

* Final validated prescription payload
* Signature
* Initial status
* Audit append

No async gap between validation and persistence.

If signing succeeds, a subsequent read must never show “draft.”

Authorization and eligibility used for signing must be evaluated against a consistent snapshot.

### Can Be Eventually Consistent

* Transmission to pharmacy networks
* Notification delivery
* Search indexing
* Analytics and reporting views
* Caches for license/DEA verification (with re-check at signing)

Rule:

If stale data can violate legality or safety → strong consistency.
If it only affects UX or derived views → eventual consistency is acceptable.

---

# Step 3 — High-Level Architecture

Separate the synchronous legal path from asynchronous integration.

## Core Logical Services

* Identity & Access Control
* Prescription Service (source of truth)
* Delegation Service (OBO approvals and scope)
* Eligibility/Validation Service
* Drug Classification Service
* Pharmacy Integration Service
* Notification Service

These can be modular within a monolith or separated services. The boundary is conceptual first.

---

## Critical Path (Signing Flow)

1. Authenticate actor
2. Authorize action (prescriber or delegate scope validation)
3. Validate eligibility (license + DEA if required)
4. Persist signed prescription + audit record in single atomic transaction
5. Emit domain event (via transactional outbox)
6. Return success (<300ms target)

This path must be bounded and free from external network calls where possible.

---

## Asynchronous Path

After commit:

* Outbox publishes `PrescriptionSigned`
* Integration service transmits to pharmacy network
* Status updates are appended with optimistic locking
* Retries with exponential backoff
* Dead-letter queue for manual remediation

External failures must not block signing.

---

# Step 4 — Data Strategy

Primary relational store (ACID) for:

* Prescription records
* Delegations
* Organization feature flags
* Audit trail (append-only)

Read replicas for retrieval workloads.

Cache layer for:

* License/DEA validation snapshots
* Organization feature flags

Event bus for:

* Prescription lifecycle events
* Integration processing

Critical detail:
Use a **transactional outbox pattern** to guarantee that:

Database commit and event emission cannot diverge.

Zero data loss is achieved through:

* Durable primary storage
* Replication
* Backup + restore strategy
* Idempotent consumers

Not through secondary “failure databases.”

---

# Step 5 — Horizontal Scalability

Principles:

* Stateless application nodes
* Multi-AZ deployment
* Auto-scaling based on CPU + request latency
* Backpressure via queue depth monitoring

Sharding is premature unless:

* Single primary cannot sustain write throughput
* Organization-level partitioning becomes necessary

If sharding is required, shard by stable tenant key (e.g., OrganizationId), not geography.

---

# Step 6 — Observability & Traceability

Three pillars:

### Metrics

* P50/P95/P99 latency
* Error rates
* Queue depth
* Retry counts
* External API latency

### Structured Logging

* Correlation ID
* Prescription ID
* Organization ID
* No PHI in logs

### Distributed Tracing

Trace spans across:
API → DB → Outbox → Consumer → External API

Audit logging is separate from observability.
Audit logs must be tamper-evident and complete.

---

# Step 7 — Failure Domains

Design for:

* External pharmacy downtime
* Message broker failure
* Database failover
* Duplicate submissions
* Network partition

Each failure should degrade safely:

* Signing still works even if pharmacy network is down
* Retries are safe due to idempotency
* Audit trail is never skipped

---

# Key Architectural Insight

The mistake in early system design attempts is optimizing tooling before defining invariants.

The correct order is:

1. Define invariants
2. Define consistency boundaries
3. Separate synchronous legal path from async integration
4. Define failure behavior
5. Choose technology to enforce those properties

Tools serve properties.
Properties define architecture.

---

Tomorrow: extend this design to support real-time DEA verification with strict SLA and circuit breaker strategy.
