import gql from "graphql-tag";

export const typeDefs = gql`
  type Doctor {
    id: ID!
    name: String
    speciality: SPECIALITY
    addresses: [Address]
  }

  type Address {
    zipCode: String
  }
 
  type Query {
    doctors: [Doctor]
    doctor(id: ID!): Doctor
    doctorsBySpecility(specialities: [SPECIALITY!]): [Doctor]
    add(number1: Float!, number2: Float!): Float
    substract(number1: Float!, number2: Float!): Float
    multiply(number1: Float!, number2: Float!): Float
    divide(number1: Float!, number2: Float!): Float
    closestColor(hexColor: String!): String
  }
 
  enum SPECIALITY {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
`;