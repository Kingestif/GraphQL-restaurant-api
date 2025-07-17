export const bookingTypeDefs = `#graphql
    type Booking {
        id: ID!
        customer: User!
        date: String!
        time: String!
        numberOfPeople: Int!

        createdAt: String!
        updatedAt: String!
    }
`