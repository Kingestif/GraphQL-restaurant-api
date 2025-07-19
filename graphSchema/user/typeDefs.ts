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

    input SignUpInput {
        email: String,
        password: String,
        role: String
    }

    input LoginInput {
        email: String,
        password: String
    }

    extend type Query {
        """ Signup a user """
        signUp(input: SignUpInput): User!

        """ Login a user """
        login(input: LoginInput): String!

        """ List of all users on our app """
        viewAllUsers: [User]!

        """ Single user profile """
        viewUserProfile(id: ID): User!
    }

    extend type Mutation {
        """ Update users role """
        updateUserRole(id: ID, role: String!): User!

        """ Delete a user """
        deleteUser(id: ID): User
    }
`