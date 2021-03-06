# Tao.js SDK monorepo

[![Build Status][build]][build-url]
[![Coverage Status][cover]][cover-url]

Uses [Lerna](https://github.com/lerna/lerna). Automatically lints and prettifies
code on commit.

## Getting started

```
nvm use 12
yarn
curl https://dapp.tools/install | sh // Installs dapptools
yarn lerna bootstrap // Installs dependencies & links all local dependencies together
yarn build // builds each plugin for local use
```

### Running the testchain

```
yarn testchain
yarn test:logs // get testchain logs
```

### Running tests

```
yarn test
yarn test:integration
yarn test:build
```

Run `yarn coverage` to generate a test coverage report.

### Creating a UMD build

See [packages/tao/README.md](https://github.com/cleancoindev/dai.js/blob/dev/packages/tao/README.md#commands) for instructions.

[build]: https://circleci.com/gh/cleancoindev/tao.js.svg?style=svg
[build-url]: https://circleci.com/gh/cleancoindev/tao.js
[cover]: https://codecov.io/gh/cleancoindev/tao.js/branch/dev/graph/badge.svg
[cover-url]: https://codecov.io/gh/cleancoindev/tao.js
