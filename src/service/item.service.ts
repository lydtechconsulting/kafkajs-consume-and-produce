import { Item } from '@prisma/client'
import { Message } from "kafkajs";
import prisma from '../db/prisma.client'
import KafkaService from "./kafka.service"

export class ItemService {

    constructor(readonly kafkaService: KafkaService) {}

    /**
     * Persists the new item to the database and emits an item-created event.
     */
    async createItem(name: string): Promise<Item> {
        const item = await prisma.item.create({
            data: {
                name: name
            }
        })
        
        const eventMessage: Message = {
			value: JSON.stringify(item)
		};
		this.kafkaService.sendEvent('item-created', eventMessage);
        
        return item
    }

    async getItem(id: number): Promise<Item|null> {
        const item = await prisma.item.findUnique({
            where: {
                id: id
            }
        })
        return item
    }
}