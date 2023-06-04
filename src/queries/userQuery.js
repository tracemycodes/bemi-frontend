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

export { GET_USER };
