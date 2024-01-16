import { Router } from "express";
import { ItemController } from "../controllers/item.controller";
import { ItemService } from "../service/item.service";

export class ItemRoutes {
  public router: Router;

  private readonly controller: ItemController;

  constructor() {
      this.controller = new ItemController(new ItemService());
      this.router = Router();
      this.registerRoutes();
  }

  registerRoutes() {
      this.router.get("/", this.controller.getItem.bind(this.controller));
  }
}
