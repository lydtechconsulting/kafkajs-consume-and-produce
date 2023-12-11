import { Application } from "express";
import { MessageRoutes } from "./message.routes";

export const mountRoutes = (application: Application) => {
  application.use("/message", new MessageRoutes().router);
};
