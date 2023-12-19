import { Router } from "express";
import { VersionController } from "../controllers/version.controller";
import { VersionService } from "../service/version.service";

export class VersionRoutes {
  public router: Router;

  private readonly controller: VersionController;

  constructor() {
      this.controller = new VersionController(new VersionService());
      this.router = Router();
      this.registerRoutes();
  }

  registerRoutes() {
      this.router.get("/", this.controller.getVersion.bind(this.controller));
  }
}
