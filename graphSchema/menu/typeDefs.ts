export const menuTypeDefs = `#graphql
    type Menu {
        id: ID!
        name: String!
        description: String!
        price: Float!
        category: Category!
        available: Boolean
        orderItems: [OrderItem!]!

        createdAt: String
        updatedAt: String
    }
`