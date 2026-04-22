# QA Automation Portfolio

Production-style QA automation portfolio covering API, end-to-end, and performance testing against stable public demo targets.

## Scope

- Cypress E2E tests target SauceDemo: `https://www.saucedemo.com/`
- API tests and k6 performance tests target Swagger Petstore: `https://petstore.swagger.io/v2`

## Repository Structure

```text
qa-automation-portfolio/
|-- api-tests/
|   |-- collection.json
|   |-- environment.json
|   |-- package.json
|   `-- reports/
|-- e2e-tests/
|   |-- cypress/
|   |   |-- e2e/
|   |   |-- fixtures/
|   |   |-- pages/
|   |   `-- support/
|   |-- cypress.config.js
|   `-- package.json
|-- performance-tests/
|   `-- performance-test.js
|-- docs/
|   `-- test-strategy.md
|-- .github/
|   `-- workflows/
|       `-- ci.yml
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

## Tech Stack

- Postman Collection v2.1
- Newman
- Cypress
- k6
- GitHub Actions

## Test Coverage

### API Testing

The Postman collection automates a full CRUD workflow for Swagger Petstore:

- `POST /pet` creates a pet with a dynamic `petId`
- `GET /pet/{id}` validates the created record
- `PUT /pet` updates the pet name and status
- `DELETE /pet/{id}` removes the test data
- Negative validation confirms a non-existing pet returns `404`

Assertions cover:

- HTTP status codes
- Response body fields
- Environment variable reuse across requests
- Cleanup validation after deletion

### E2E Testing

Cypress validates core shopper flows on SauceDemo using Page Object Model:

- Login with `standard_user`
- Add product to cart
- Complete checkout flow
- Edge-user coverage for `problem_user`, `performance_glitch_user`, and `error_user`

Assertions cover:

- URL changes
- Element visibility
- Cart badge behavior
- Known edge-case behavior in special test accounts

### Performance Testing

k6 validates Swagger Petstore under staged load:

- Ramp up virtual users
- Sustain traffic
- Ramp down gracefully
- Execute both `POST /pet` and `GET /pet/{id}`

Thresholds:

- `p95 < 500ms`
- `http_req_failed < 1%`

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+
- k6 installed locally

### Environment

Copy `.env.example` to `.env` if you want to override defaults.

```bash
PETSTORE_BASE_URL=https://petstore.swagger.io/v2
E2E_BASE_URL=https://www.saucedemo.com
PERFORMANCE_BASE_URL=https://petstore.swagger.io/v2/pet
```

### Install Dependencies

```bash
npm run install:all
```

Or install each suite independently:

```bash
npm install --prefix api-tests
npm install --prefix e2e-tests
```

## Running Tests

### API

```bash
npm run test:api
npm run test:api:html
```

### E2E

```bash
npm run test:e2e
npm run test:e2e:open
```

### Performance

```bash
npm run test:perf
```

### Run All Available Suites

```bash
npm run test:all
```

## CI Pipeline

GitHub Actions runs three isolated jobs:

1. API tests with Newman and HTML report generation
2. Cypress E2E tests against SauceDemo
3. k6 performance tests against Swagger Petstore

Artifacts uploaded by the workflow:

- Newman HTML report
- Cypress screenshots
- Cypress videos

## Strategy

The detailed testing rationale lives in [docs/test-strategy.md](docs/test-strategy.md).
