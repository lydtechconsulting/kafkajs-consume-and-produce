import { Item } from '@prisma/client'
import prisma from '../db/prisma.client'

export class ItemService {

    async createItem(name: string): Promise<Item> {
        const item = await prisma.item.create({
            data: {
                name: name
            }
        })
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