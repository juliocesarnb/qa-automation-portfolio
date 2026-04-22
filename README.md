# QA Automation Portfolio

Portfólio de automação de testes em nível profissional, cobrindo testes de API, end-to-end e performance em alvos públicos e estáveis para demonstração.

## Escopo

- Os testes E2E com Cypress validam o SauceDemo: `https://www.saucedemo.com/`
- Os testes de API e performance com k6 validam o Swagger Petstore: `https://petstore.swagger.io/v2`

## Estrutura do Repositório

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

## Tecnologias Utilizadas

- Postman Collection v2.1
- Newman
- Cypress
- k6
- GitHub Actions

## Cobertura de Testes

### Testes de API

A collection do Postman automatiza um fluxo CRUD completo para o Swagger Petstore:

- `POST /pet` cria um pet com `petId` dinâmico
- `GET /pet/{id}` valida o registro criado
- `PUT /pet` atualiza nome e status do pet
- `DELETE /pet/{id}` remove a massa de teste
- O cenário negativo valida que um pet inexistente retorna `404`

Asserções cobrem:

- Status codes HTTP
- Campos do corpo da resposta
- Reutilização de variáveis de ambiente entre requisições
- Validação de limpeza após exclusão

### Testes E2E

O Cypress valida os principais fluxos do usuário no SauceDemo usando Page Object Model:

- Login com `standard_user`
- Adição de produto ao carrinho
- Fluxo completo de checkout
- Cobertura de usuários especiais como `problem_user`, `performance_glitch_user` e `error_user`

Asserções cobrem:

- Mudanças de URL
- Visibilidade de elementos
- Comportamento do badge do carrinho
- Comportamentos conhecidos de borda nas contas especiais

### Testes de Performance

O k6 valida o Swagger Petstore sob carga progressiva:

- Ramp up de usuários virtuais
- Sustentação de carga
- Ramp down controlado
- Execução de `POST /pet` e `GET /pet/{id}`

Thresholds:

- `p95 < 500ms`
- `http_req_failed < 1%`

## Execução Local

### Pré-requisitos

- Node.js 18+
- npm 9+
- k6 instalado localmente

### Ambiente

Copie `.env.example` para `.env` se quiser sobrescrever os valores padrão.

```bash
PETSTORE_BASE_URL=https://petstore.swagger.io/v2
E2E_BASE_URL=https://www.saucedemo.com
PERFORMANCE_BASE_URL=https://petstore.swagger.io/v2/pet
```

### Instalação de Dependências

```bash
npm run install:all
```

Ou instale cada suíte separadamente:

```bash
npm install --prefix api-tests
npm install --prefix e2e-tests
```

## Como Executar os Testes

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

### Executar Todas as Suítes

```bash
npm run test:all
```

## Pipeline de CI

O GitHub Actions executa três jobs isolados:

1. Testes de API com Newman e geração de relatório HTML
2. Testes E2E com Cypress contra o SauceDemo
3. Testes de performance com k6 contra o Swagger Petstore

Artefatos publicados pelo workflow:

- Relatório HTML do Newman
- Screenshots do Cypress
- Vídeos do Cypress

## Estratégia

O racional detalhado da estratégia de testes está em [docs/test-strategy.md](docs/test-strategy.md).
