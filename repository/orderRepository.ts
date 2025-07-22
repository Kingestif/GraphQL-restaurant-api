import { toFullPopulatedOrder, toOrder, toPopulatedOrder } from "../mapper/toOrderType";
import { FullPopulatedOrder, ItemType, OrderType, PopulatedOrder } from "../types/order";
import { MenuType } from "../types/menu";
import { toMenu } from "../mapper/toMenuType";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export interface IOrderRepository {
    findById(id: string): Promise<MenuType | null>;
    create(order: OrderType): Promise<OrderType>;
    find(id: string): Promise<PopulatedOrder[]>;
    findAll(): Promise<FullPopulatedOrder[]>;
}

export class OrderRepositoryPrisma implements IOrderRepository {
    async findById(id: string): Promise<MenuType | null> {
        const product = await prisma.menu.findFirst({
            where: {
                id: Number(id)
            }
        });
        if(!product) return null;

        return toMenu(product);
    }

    async create(order: OrderType): Promise<OrderType> {
        const newOrder = await prisma.order.create({
            data: {
                customerId: Number(order.customer),
                items: {
                    create: order.items.map(item => ({
                        productId: Number(item.product),
                        quantity: item.quantity
                    }))
                },
                totalPrice: new Prisma.Decimal(order.totalPrice)
            },

            include: {
                items: true
            }
        });

        return toOrder(newOrder);
    }

    async find(id: string): Promise<PopulatedOrder[]> {
        const orders = await prisma.order.findMany({
            where: {
                customerId: Number(id)
            },

            include: {
                items: {
                    include: {
                        product: true,
                    }
                }
            },

            orderBy: [
                {createdAt: 'desc'}
            ]
        });

        return orders.map((order: any) => toPopulatedOrder(order));
    }

    async findAll(): Promise<FullPopulatedOrder[]> {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                },

                customer: true
            },

            orderBy: [
                {createdAt: 'desc'}
            ]
        });

        return orders.map((order: any) => toFullPopulatedOrder(order));
    }
}