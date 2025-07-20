export const orderTypeDefs = `#graphql
    type Order {
        id: ID!
        customer: User!

        items: [OrderItem!]!
        totalPrice: Float!
        orderStatus: OrderStat!

        createdAt: String
        updatedAt: String
    }

    input OrderItemInput {
        product: ID!
        quantity: Int!
    }

    input OrderInput {
        items: [OrderItemInput!]!
    }

    extend type Query {
        """ Return list of users orders """
        getOrder: [Order!]

        """ Return list of all found orders """
        getAllOrders: [Order!]!
    }

    extend type Mutation {
        """ Allow a user to place an order """
        placeOrder(input: OrderInput): Order!
    }
`