export const commonTypeDefs = `#graphql
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
`