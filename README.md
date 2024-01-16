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
curl localhost:3000/version
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

docker-compose build --no-cache

Start containers:
docker-compose up -d

Run app: (NOTE now using the docker-compose)
```
docker build -t demoapp .
docker run -p 3000:3000 demoapp
```

Jump onto container without running app:
```
docker run -it demoapp /bin/sh
```

docker exec -it postgres bash
psql -U user -d db

list tables:
/dt


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

### Docker clean up

If Docker containers do not clear down they can be manually cleaned up with the following command:
```
docker rm -f $(docker ps -aq)
```

If Docker issues occur it can be useful to clean down the Docker env:
```
docker system prune
docker volume prune
```