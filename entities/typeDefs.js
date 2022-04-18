const { gql } = require("apollo-server");
const typeDefs = gql`

type User {
    id: ID
    name: String
    lastName: String
    birthday: String
    email: String
    password: String
    photo: String
    telephone: String
    gender: String
    privacy: Boolean
    status: Boolean
    address: String
    latitude: Int
    longitude: Int
  }
input MailValidationInput {
    otp: Int!
    email: String!
}
  input UserInput {
    name: String
    lastName: String
    birthday: String
    email: String!
    password: String!
    photo: String
    telephone: String
    gender: String
    privacy: Boolean
    status: Boolean
    address: String
    latitude: Int
    longitude: Int
  }
  input AuthUserInput {
    email: String!
    password: String!
  }
  input UserUpdateInput {
    name: String
    lastName: String
    birthday: String
    password: String
    photo: String
    telephone: String
    gender: String
    privacy: Boolean
    status: Boolean
    address: String
    latitude: Int
    longitude: Int
  }
  type Token {
    token: String
    id: ID
    name: String
    lastName: String
    birthday: String
    email: String
    password: String
    photo: String
    telephone: String
    gender: String
    privacy: Boolean
    status: Boolean
    address: String
    latitude: Int
    longitude: Int
  }

type Query {
    getUsers: [User]
    getUserById(id: ID!): User
}
type Mutation {
    registerUser(input: UserInput): User
    authUser(input: AuthUserInput): Token
    deleteUser(id: ID!): String
    updateUser(id: ID!, input: UserUpdateInput): String
    sendValidationEmail(input: String!): String
    validateEmail(input: MailValidationInput): Boolean
}

`;


module.exports = typeDefs;
