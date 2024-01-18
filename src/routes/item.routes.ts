import { Router } from "express";
import { ItemController } from "../controllers/item.controller";
import { ItemService } from "../service/item.service";
import KafkaService from "../service/kafka.service";
import { getConfig } from "../config/app.config";
import { KafkaConfig } from "kafkajs";

export class ItemRoutes {
  public router: Router;

  private readonly controller: ItemController;

  constructor() {
    const config = getConfig();
    const kafkaConfig = {
        brokers: config.kafka.brokerAddress
    } as KafkaConfig
      this.controller = new ItemController(new ItemService(new KafkaService(kafkaConfig)));
      this.router = Router();
      this.registerRoutes();
  }

  registerRoutes() {
      this.router.post("/", this.controller.createItem.bind(this.controller));
      this.router.get("/:itemId", this.controller.getItem.bind(this.controller));
  }
}
