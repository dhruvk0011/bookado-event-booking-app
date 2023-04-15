const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Booking {
        _id : ID!
        event : Event!
        user : User!
        createdAt : String!
        updatedAt : String! 
    }

    type Event {
        _id : ID!
        title : String!
        description : String!
        price : Float!
        date : String!
        creator : User!
    }

    type User {
    _id : ID!
    email : String!
    password : String
    createdEvents : [Event!]
    }
    type AuthData {
        userId : ID!
        token: String!
        tokenExpiration : Int!
    }

    input UserInput {
    email : String!
    password : String!
    }
    input EventInput {
        title : String!
        description : String!
        price : Float!
        date : String! 
    }
    type rootQuery {
        events : [Event!]!
        bookingEvents : [Booking!]!
        login(email:String!,password:String!) : AuthData!
    }

    type rootMutation {
        createEvent(evtInpt : EventInput): Event
        createUser(userInpt : UserInput): User
        bookEvent(eventId : ID!) : Booking!
        cancelBooking(bookingId :ID!) : Event!
    }

    schema { 
        query : rootQuery
        mutation : rootMutation
    },
`);
// here 'schema' is a keyword and we use types for queries (for diff. type of data).
// Eg - events -> having list of events and some data in rootQuery.
// ** token not stored in web server, but on browser.