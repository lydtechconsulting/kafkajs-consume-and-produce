import { Application } from "express";
import { VersionRoutes } from "./version.routes";

export const mountRoutes = (application: Application) => {
  application.use("/version", new VersionRoutes().router);
};
