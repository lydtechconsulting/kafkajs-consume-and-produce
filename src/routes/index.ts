import { Application } from "express";
import { VersionRoutes } from "./version.routes";
import { ItemRoutes } from "./item.routes";

export const mountRoutes = (application: Application) => {
  application.use("/version", new VersionRoutes().router);
  application.use("/item", new ItemRoutes().router);
};
