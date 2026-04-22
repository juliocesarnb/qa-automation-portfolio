# Test Strategy

## Objective

Build a balanced QA automation strategy that detects defects early, protects critical business flows, and gives fast feedback in CI.

## Test Pyramid

This portfolio follows the test pyramid:

- API tests provide the broadest automated coverage
- E2E tests validate a smaller set of critical user journeys
- Performance testing validates non-functional behavior under load

This shape keeps execution time practical while still covering real user risk.

## Why API Tests Are Prioritized

API automation sits in the middle of the stack with a strong value-to-cost ratio.

- They execute faster than browser tests
- They are less brittle than UI checks
- They validate core business behavior directly
- They support broad CRUD and negative-path coverage

For this repository, Swagger Petstore API tests are prioritized because they confirm create, read, update, delete, and error handling with dynamic test data.

## Role of E2E Tests

E2E tests are reserved for the highest-value web flows that matter to the user experience.

- Authentication
- Product selection
- Cart behavior
- Checkout completion

SauceDemo is also useful for edge-user validation because it intentionally exposes UI and behavior anomalies. Those scenarios show how an automation suite can both validate happy paths and document known defects.

## Role of Performance Testing

Performance tests protect service responsiveness and stability under concurrent traffic.

In this portfolio, k6 targets Swagger Petstore to validate:

- Request success rate
- Response time under staged load
- Behavior of both read and write operations

Thresholds are intentionally strict enough to catch regressions early:

- `p95 < 500ms`
- `http_req_failed < 1%`

## CI Strategy

The GitHub Actions workflow separates suites into individual jobs so failures are isolated and easier to triage.

- API results produce an HTML report artifact
- E2E runs preserve screenshots and videos for debugging
- Performance tests run independently so load validation does not block browser execution setup

## Risks and Mitigations

- Public demo environments may be unstable or rate-limited
- Shared test data can occasionally create noisy failures
- UI edge-user behavior may change if SauceDemo updates the demo application

Mitigations:

- Use dynamic IDs in API and performance tests
- Keep assertions focused on stable, high-signal behaviors
- Separate jobs in CI to simplify reruns and failure analysis
