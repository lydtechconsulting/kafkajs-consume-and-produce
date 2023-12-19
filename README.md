# Testing a Typescript application with Testcontainers

Under development...

## Build, Test and Execute
```
npm install testcontainers @testcontainers/kafka
```

```
npm install
npx prisma generate
npm run test
```

When the service is running, get the version via the REST API:

```
curl localhost:1234/version
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