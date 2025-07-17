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
`