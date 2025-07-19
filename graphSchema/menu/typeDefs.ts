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

    input MenuInput {
        id: ID      # needed only during update
        name: String
        description: String
        price: Float
        category: Category
        available: Boolean
    }

    extend type Query {
        """ returns list of all menus """
        getMenu: [Menu!]!
    }

    extend type Mutation {
        """ create a menu """
        postMenu(input:MenuInput): Menu!

        """ edit available menu """
        editMenu(input: MenuInput): Menu!

        """ delete existing menu """
        deleteMenu(id: ID): User
    }

`