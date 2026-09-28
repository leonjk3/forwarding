# Architecture decisions

## Scope
Local-first forwarding portfolio. Fictional companies and shipments only.
Spring Boot modular monolith, React/TypeScript, PostgreSQL and Flyway.
No provisioned cloud resources and no recurring infrastructure costs introduced by this repository.

## Domain boundaries
- Organization: legal entities, users, roles and participation permissions.
- Customer: customer groups, customer legal entities and contracts.
- Order: customer requests, cargo and planned legs.
- Execution: bookings, containers, consolidation and vehicle tracking.
- Settlement: revenue, costs and intercompany transactions.

Cargo kind (vehicle/general) and loading mode (FCL/LCL/Ro-Ro) are separate dimensions.
Orders and execution units must support splitting and consolidation.

## Authorization milestone
Before exposing business endpoints, implement authenticated membership checks and
resource participation rules. A client-supplied company ID never grants access.
Financial visibility is separate from operational participation. Add negative tests
for cross-company reads, writes, exports and file downloads.
The initial scaffold exposes health only; authentication and business APIs are not implemented.

## Delivery
Pull requests run backend verification, frontend lint/build, and a PostgreSQL-backed
migration/startup test. Cloud deployment is deferred until a provider is selected.
Future demo deployment should be manual-triggered, reproducible and removable.
