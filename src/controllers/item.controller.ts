import { Request, Response } from "express";
import { ItemService } from "../service/item.service";

export class ItemController {
    private readonly itemService: ItemService

	constructor(itemService: ItemService) {
		this.itemService = itemService
	}

    async createItem(request: Request, response: Response) {
        const itemService = this.itemService;
        if(request.body.name == undefined) {
            console.error("Item name not set");
            return response.status(400);
        }
        const item = await itemService.createItem(request.body.name);
        console.log(`Item created with Id: ${item.id} and name ${item.name}`);
        return response.status(201).location(item.id.toString()).end();
    }

    async getItem(request: Request, response: Response) {
        const itemService = this.itemService;
        if(request.params.itemId == undefined) {
            console.error("itemId not set");
            return response.status(400);
        }
        const item = await itemService.getItem(parseInt(request.params.itemId));

        if(item == null) {
            console.error(`Item not found with id: ${request.params.itemId}`);
            return response.status(404);
        } else {
            console.log(`Item found with name: ${item}`);
            return response.status(200).json(item);
        }
    }
}
