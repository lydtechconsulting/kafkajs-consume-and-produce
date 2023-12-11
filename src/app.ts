import { Server } from "node:http";
import express, { Application } from "express";
import { getConfig, setConfig } from "./config/appConfig";
import { mountRoutes } from "./routes";

export class App {
  private readonly app: Application;

  private server?: Server;

  constructor() {
    setConfig();
    this.app = express();
    mountRoutes(this.app);
  }

  start() {
    const config = getConfig();

    const port = config.server.port;

    this.server = this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  stop() {}
}
