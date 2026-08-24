# Case: decision record for the platform events architecture

## Intended artifact

A decision record for engineering, product infrastructure, and operations. Readers need to understand what is being decided, why the decision is needed now, what alternatives were considered, what trade-offs are accepted, and what must happen next. Some readers are new to the work and have not read the planning tickets.

## Task

Write a durable decision record. Use a title that lets readers judge relevance before opening it. State the decision near the beginning. Explain the context in this document rather than relying on ticket identifiers or linked documents. Use prose for connected reasoning; use a list or table only if its content is genuinely better consumed in that format.

## Source material

### Problem

The company has eight services that publish operational events: checkout, billing, subscriptions, fulfillment, identity, notifications, catalog, and analytics. Today, each producer writes directly to one or more consumer-owned PostgreSQL tables or invokes consumer HTTP endpoints. This was acceptable when there were two services, but it now creates tightly coupled deployments and makes it difficult to answer whether an event was delivered, retried, or processed twice.

The immediate trigger is the new enterprise audit export. It needs an immutable history of account, subscription, and invoice events for seven years. The export must be reproducible: running it for the same time range later must produce the same result, including events that were later corrected. Product also expects to add two more independently deployed consumers within the next year: a fraud scoring service and a customer-data warehouse pipeline.

The platform team has operated Kafka for the clickstream since 2023. That cluster has 99.95% availability, Terraform-managed topics, on-call dashboards, and an established rotation. It is currently provisioned for 18 MB/s sustained ingress; measured application-event traffic would begin at 2 MB/s and is forecast to reach 7 MB/s within 18 months. Expanding the cluster before traffic reaches 12 MB/s takes roughly two weeks and costs about $1,600 per month.

### Constraints

- Customer-visible writes must remain available if Kafka is temporarily unavailable.
- Existing consumers cannot be rewritten in one release.
- The audit export requires immutable raw events; deleting or rewriting old records is not acceptable.
- Event delivery is allowed to be at least once. Consumers must therefore be idempotent.
- Production data must remain in the existing cloud account and region.
- The team has two platform engineers available for the first six weeks and one application engineer from each producing service available for migration work.

### Options considered

**Option A: keep direct integrations and add more tables/endpoints.** This has little immediate platform work, but every new consumer needs changes in every producer. It retains ambiguous delivery behavior and does not create an immutable audit history. Reject it.

**Option B: use the existing Kafka cluster with a transactional outbox in each producing service.** A service records its business write and event in the same PostgreSQL transaction. A relay publishes outbox records to Kafka and marks them delivered after acknowledgement. Kafka retains raw events for seven years in a dedicated audit topic and 30 days in operational topics. Consumers record processed event IDs to make handling idempotent. This keeps customer writes available during a Kafka outage because the service can accumulate outbox rows and publish after recovery. It adds relay operation, migration work, and storage cost, but builds on infrastructure the company already operates. Recommend it.

**Option C: buy a managed event-integration SaaS.** The vendor supports connectors and replay, but would place production data in the vendor's account, does not offer the required seven-year immutable retention in the selected plan, and would cost an estimated $8,500 per month at forecast volume. Reject it.

### Decision and scope

Adopt option B as the standard way for application services to publish domain events. Start with checkout, billing, and subscriptions because they provide the records required by the first audit export. Direct integrations continue during migration; they are not removed by this decision.

The platform team owns the shared relay library, topic provisioning, schemas, dashboards, runbook, and capacity planning. Each producing-service team owns its outbox migration, event schema review, and consumer compatibility. The data platform team owns the audit-export consumer.

The first production milestone is an end-to-end audit export for one enterprise customer by 2026-07-15. Before that milestone, the teams must complete a failure-mode exercise covering Kafka unavailability, relay restart, duplicate delivery, and a consumer lagging for 24 hours. The operations lead must approve the alert thresholds and on-call runbook before production traffic begins.

Review the decision after the first audit export is running in production, after two additional consumers are live, or by 2026-12-31, whichever comes first.

### Detail that is intentionally optional

The precise database schema for each outbox table, Kafka partition counts, message serialization library, and consumer implementation are implementation decisions. Do not include them unless they are needed to explain the decision or a material consequence.

## Completion criteria

A reader who has not seen the prior tickets can determine the decision, why direct integrations are insufficient, why the recommended option satisfies the availability and audit constraints, the accepted costs and responsibilities, what remains out of scope, the next milestone, and when the decision will be revisited. The record is detailed enough to support those outcomes but does not turn into an implementation plan.
