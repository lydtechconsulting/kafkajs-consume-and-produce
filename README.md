# Testing a Typescript application with Testcontainers

Under development...

## Build & Test

To build and test:

```
npm install
npx prisma generate
npm run test
```

Run unit and integration tests separately:
```
npm run test:unit
npm run test:integration
```

The integration tests use Testcontainers to spin up Kafka, Zookeeper and Postgres in Docker containers.  The application then integrates with these for the end to end tests.

## Run Application

The docker-compose file starts Kafka, Zookeeper, Postgres and the application itself.  To build the application container and start the containers:
```
docker-compose build --no-cache
docker-compose up -d
```

Alternatively, run application in Docker (if not using docker-compose):
```
docker build -t demoapp .
docker run -p 3000:3000 demoapp
```

Jump onto application container without starting the actual app (to view files etc):
```
docker run -it demoapp /bin/sh
```

Jump onto postgres container (to inspect schema etc):
```
docker exec -it postgres bash
psql -U user -d db
```

## Application REST API

The database is seeded with a version.  Get the version via the REST API:
```
curl localhost:3000/version
```

Items can be created and retrieved. To create an item:
```
curl -i -X POST localhost:3000/items -H "Content-Type: application/json" -d '{"name": "test-item"}'
```

The response location header contains the new Id.  Retrieve the item with:
```
curl localhost:3000/version/items/{itemId}
```

### Test Debug

Add the following to `.vscode/settings.json` under the project root to enable run/debug using the Jest Runner extension in VSCode:
```
{
    "jestrunner.jestCommand": "npm run test:integration --",
    "jestrunner.debugOptions": { "args": ["--config", "jest.config.integration.ts"] }
}
```

Change `integation` to `unit` for unit test debugging.

### Test Errors:

The app runs on port 3000.  If the app does not cleanly stop at the end of a test run you may get an error on the next test run:

```
listen EADDRINUSE: address already in use :::3000
```

Find the port and kill the process:
```
lsof -i -P | grep 3000
kill -9 <processId>
```

### Docker Clean Up

If Docker containers do not clear down they can be manually cleaned up with the following command:
```
docker rm -f $(docker ps -aq)
```

If Docker issues occur it can be useful to clean down the Docker env:
```
docker system prune
docker volume prune
```