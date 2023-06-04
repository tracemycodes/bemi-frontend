import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      userInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      _id
    }
  }
`;

const LOGIN_CLIENT = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(loginInput: { email: $email, password: $password }) {
      userId
      token
      isAdmin
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation resetPassword($email: String!, $callbackUrl: String!) {
    resetPassword(resetInput: { email: $email, callbackUrl: $callbackUrl }) {
      msg
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $resetId: String!) {
    changePassword(passwordInput: { password: $password, resetId: $resetId }) {
      msg
    }
  }
`;

export { LOGIN_CLIENT, ADD_USER, FORGOT_PASSWORD, CHANGE_PASSWORD };
