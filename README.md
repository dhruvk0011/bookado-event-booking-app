# Bookado

An event booking app.

## Tech Stack

**Client:** ReactJS, CSS3

**Server:** Node, Express, GraphQL

## Environment Variables

To run this project, you will need to add the following environment variables to your _env_ object in _nodemon.json_ file

`MONGO_USER`

`MONGO_PASSWORD`

`MONGO_DB`

## Running

To start this backend run

```bash
  npm start
```

To start the frontend run

```bash
  cd frontend
  npm start
```

## Features

- Create users
- Book events made by other users
- See events after logging out

## Feedback

If you have any feedback, please reach out to me at : dhruvkhanna0806@gmail.com

## Optimizations

#### Used GraphQL instead of REST for API Design

_GraphQL_ allows flexible and dynamic queries:

- Client-side applications can request only the required fields
- Aliases can be used to request fields with custom keys
- The client can use the query to manage results order
- The client can be better decoupled from any changes in the API, as there's no single version of the response object's structure to follow.

## Acknowledgements

- [GraphQL Docs](https://graphql.org/learn/)
- [GraphQL with Node](https://www.freecodecamp.org/news/get-started-with-graphql-and-nodejs/)

## Screenshots

![*Authentication Page*](https://raw.githubusercontent.com/dhruvk0011/bookado-event-booking-app/main/assets/images/frontend.PNG)

![*User Logged In*](https://raw.githubusercontent.com/dhruvk0011/bookado-event-booking-app/main/images/userLoggedIn.PNG)
