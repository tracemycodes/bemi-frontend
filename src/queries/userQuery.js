import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    getUser {
      firstName
      lastName
      email
      isAdmin
      _id
      address {
        apartment
        city
        country
        state
      }
    }
  }
`;

const GET_ADDRESS = gql`
  query getAddress {
    getAddress {
      firstName
      lastName
      _id
      apartment
      city
      country
      state
      address
      zipCode
      phone
      default
    }
  }
`;

export { GET_USER, GET_ADDRESS };
