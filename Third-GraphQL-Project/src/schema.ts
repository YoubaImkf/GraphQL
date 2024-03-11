import gql from "graphql-tag";

export const typeDefs = gql`
type Track {
  id: ID!
  title: String!
  author: Author!
  thumbnail: String
  numberOfViews: Int
}

type Author {
  id: ID!
  name: String!
  photo: String
}

type People {
    id: ID!
    name: String!
    eye_color: String
    films: [Film]!
}

type Film {
    id: ID!
    title: String!
    peoples: [People]!
}

type Query {
  divide(number1: Int!, number2: Int!): Float
  multiply(number1: Int!, number2: Int!): Float
  closestColor(hexa: String!): String
  getTracks: [Track!]!
  getFilms: [Film]!
  getPeoples: [People]!
}

type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
}
 
type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
}

`