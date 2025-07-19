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

    input BookTableInput {
        date: String,
        time: String,
        numberOfPeople: Int
    }

    extend type Mutation {
        """ Allow users to book a table """
        bookTable(input: BookTableInput): Booking!

    }

    extend type Query {
        """ Return list of a user bookings """
        getMyBookings: [Booking!]!

        """ Return list of all bookings"""
        getAllBookings: [Booking!]!
    }
`