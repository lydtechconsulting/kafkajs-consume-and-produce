# Testing a Typescript application with Testcontainers

Under development...

## Build, Test and Execute
```
npm install testcontainers @testcontainers/kafka
```

```
npm install
npm run test
npm run dev

curl localhost:1234/message
```

npm run test:unit
npm run test:integration

Add the following to `.vscode/settings.json` under the project root to enable run/debug using the Jest Runner extension in VSCode:

```
{
    "jestrunner.jestCommand": "npm run test:integration --",
    "jestrunner.debugOptions": { "args": ["--config", "jest.config.integration.ts"] }
}
```