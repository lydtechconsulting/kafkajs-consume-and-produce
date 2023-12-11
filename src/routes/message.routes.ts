import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

export class MessageRoutes {
  public router: Router;

  private readonly controller: MessageController;

  constructor() {
    this.controller = new MessageController();
    this.router = Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.controller.getAll);
    this.router.get("/:id", this.controller.getById);
    this.router.post("/", this.controller.create);
    this.router.delete("/:id", this.controller.delete);
  }
}
