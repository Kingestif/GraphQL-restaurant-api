export const userTypeDefs = `#graphql
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

    extend type Query {
        """ List of all users on our app """
        viewAllUsers: [User]!

        """ Single user profile """
        viewUserProfile(id: String): User!
    }

    extend type Mutation {
        """ Update users role """
        updateUserRole(id: String, role: String!): User!

        """ Delete a user """
        deleteUser(id: String): User
    }
`