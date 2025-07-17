export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        password: String!
        role: Role!
        orders: [Order!]!
        books: [Booking!]!

        createdAt: String!
        updatedAt: String!
    }

    type Order {
        id: ID!
        customer: User!

        items: [OrderItem!]!
        totalPrice: Float!
        orderStatus: OrderStat!

        createdAt: String
        updatedAt: String
    }

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

    type OrderItem {
        id: ID!
        # orderId: ID!
        productId: Int
        quantity: Int

    }

    type Booking {
        id: ID!
        customer: User!
        date: String!
        time: String!
        numberOfPeople: Int!

        createdAt: String!
        updatedAt: String!
    }

    
    enum Role {
        customer
        admin
        manager
    }

    enum OrderStat {
        pending
        preparing
        delivered
        cancelled
    }

    enum Category {
        Appetizer
        MainCourse
        Dessert
        Drink
    }

    type Query {
        viewAllUsers: [User]!
        viewUserProfile(id: String): User!
    }
`