export const itemTypeDefs = `#graphql
    type OrderItem {
        id: ID!
        # orderId: ID!
        productId: ID
        quantity: Int
    }
`