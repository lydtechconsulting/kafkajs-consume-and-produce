import { Request, Response } from "express";
import { ItemService } from "../service/item.service";

export class ItemController {
    private readonly itemService: ItemService

	constructor(itemService: ItemService) {
		this.itemService = itemService
	}

    async getItem(request: Request, response: Response) {
        const itemService = this.itemService;
        
        const item = await itemService.getItem();

        response.status(200).json(item);
    }
}
