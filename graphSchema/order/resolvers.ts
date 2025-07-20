import { OrderRepositoryPrisma } from "../../repository/orderRepository";
import { UserRepositoryPrisma } from "../../repository/userRepository";
import { OrderService } from "../../services/order/orderService";
import { UserService } from "../../services/user/userService";
import { requireAuth } from "../../utils/checkRole";
import { orderValidation } from "../../validation/orderValidation";

const orderRepository = new OrderRepositoryPrisma();
const orderService = new OrderService(orderRepository);
const userRepository = new UserRepositoryPrisma();
const userService = new UserService(userRepository);

export const OrderResolvers = {
    Query: {
        getOrder: async(parent: any, args:any, context:any) => {
            requireAuth(context, ['customer']);
            const customerID = context.user.id;
            return await orderService.getOrder(customerID);
        },

        getAllOrders: async(parent: any, args:any, context: any) => {
            requireAuth(context, ['admin']);
            return await orderService.getAllOrders();
        }
    },

    Mutation: {
        placeOrder: async(parent: any, args:any, context:any) => {
            requireAuth(context, ['customer']);
            const items = orderValidation.parse(args.input);
            const customerID = context.user.id;
            return await orderService.placeOrder(items.items, customerID);
        }
    },

    Order: {
        customer: async(parent: any, args: any, context: any) => {
            return await userService.viewUserProfile(parent.customerId);
        }
    }
}