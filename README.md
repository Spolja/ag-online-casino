# AG Online Casino

Online casino providing a GraphQL API for basic casino betting games.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

-   [Description](#description)
-   [Quick Start](#quick-start)
-   [Architectural Decisions](#architectural-decisions)
-   [Database Setup](#database-setup)
-   [Linter](#linter)
-   [Tests](#tests)
-   [Usage](#usage)
-   [Future Improvements](#future-improvements)

## Description

AG Online Casino is a project that offers a GraphQL API for basic casino betting games. It utilizes technologies like Apollo
Server, GraphQL, Sequelize and more to provide a comprehensive platform for betting games.

## Quick Start

If you would like to start exploring the API as fast as possible follow the next steps

```bash

   // Clone the project
   git clone https://github.com/Spolja/ag-online-casino.git

   // Install dependencies
   yarn install

   // Generate graphql types
   yarn types:generate

   // Start server
   yarn dev
```

Your GraphQL Playground should be running on http://localhost:4000/

## Architectural Decisions

### GraphQL schema first approach

I've decided to go with schema first design rather than code first, all .graphql files can be found under their respective
resolvers in /graphql/resolver/contracts folder. This steps also includes implementing a custom generator which transpiles
.graphql contracts to .ts code which is located under src/resolvers/**generated** after running 'yarn types:generate' which is
achieved by using library graphql-codegen-cli (https://www.npmjs.com/package/@graphql-codegen/cli)

## Database Setup

Database has 2 tables:

-   Users,
-   Bets

ORM of choice used was Sequelize which defines all of its models in src/database/models/models.ts file alongside with its client
class.

NOTE: Current database is pushed to the repository and is available at: ag-online-casino.sqlite, there are currently 3 users in
the system ('Spoljo', 'Elena', 'Bruce Wayne')

## Linter

For linting our codebase we've used a combination of multiple tools that provide us with options to lint various types of files.

-   Grammar linter - CSpell - https://www.npmjs.com/package/cspell
-   Code (TS/JS) linter - ESlint - https://www.npmjs.com/package/eslint
-   Package.json linter - NpmPkgJsonLint - https://www.npmjs.com/package/npm-package-json-lint
-   Configuration files linter - Prettier - https://www.npmjs.com/package/prettier

Scripts to run above code can be found in package.json defined as:

```bash
   // Run all linters at once
   yarn lint

   // Runs spelling linter
   yarn lint:spelling

   // Runs code linter
   yarn lint:code

   // Runs package json linter
   yarn lint:package-json

   // Runs package json linter
   yarn lint:prettier
```

## Tests

For tests, I've decided to go with JEST and implemented a basic set of integration tests that cover basic functionalities. These
tests leverage Apollo Servers 'executeOperation' method which enables us to send real graphql queries to the system, without
actually booting up the server.

NOTES:

-   Tests are currently using the same database as when the system is running (located under ag-online-casino.sqlite), this should
    be changed so tests use its own test-db or in memory one.
-   Test implementation logic is really basic and not all cases are covered
-   createBet method is not being tested at all and this should be implemented after test-db separation has been done.

## Usage

Usage of the API can be achieved over GraphQL playground which becomes active after yarn dev is executed on url:
http://localhost:4000/

Examples of the queries are as follows:

```
query GetUser {
  getUser(id: 1) {
    ...userFragment
  }
}

query GetUsers {
  getUserList {
    ...userFragment
    bets {
      ...betFragment
    }
  }
}

query GetBet {
  getBet(id: 1) {
    ...betFragment
    user {
      ...userFragment
    }
  }
}

query GetBetList {
  getBetList {
    ...betFragment
    user {
      ...userFragment
    }
  }
}

query GetBestBets {
  getBestBetsPerUser(limit: 100) {
    ...betFragment
    user {
      ...userFragment
    }
  }
}

mutation CreateBet {
  createBet(userId: 1, amount: 100, chance: 15) {
    ...betFragment
    user {
      ...userFragment
    }
  }
}

fragment betFragment on Bet {
  amount
  chance
  id
  payout
  win
  userId
}

fragment userFragment on User {
    id
    balance
    name
}

```

## Future Improvements

Here is a list of future tasks and improvements that could/should be implemented for this project to be production ready

1. Fix DATEONLY Definition used in createdAt and updatedAt sequelize fields, this should be full DATE or epoch milliseconds
2. Fully implement integration tests for all endpoints:
    - createBet - NOT IMPLEMENTED
    - implement more edge cases with different user
3. Implement UNIT tests
4. Setup Zod Validations on whole project to validate graphql inputs
5. Revisit create bet logic and simplify it (separate into private methods or similar approach)
6. Refactor src/database/models/models.ts file to support 1 model per file structure, e.g. user.model.ts, bet.model.ts, etc...
