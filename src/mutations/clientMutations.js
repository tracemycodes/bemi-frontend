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

const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $address: String
    $apartment: String
    $city: String
    $country: String
    $state: String
    $zipCode: String
    $phone: String
    $default: Boolean
  ) {
    updateUser(
      addressInput: {
        firstName: $firstName
        lastName: $lastName
        address: $address
        apartment: $apartment
        city: $city
        country: $country
        state: $state
        zipCode: $zipCode
        phone: $phone
        default: $default
      }
    ) {
      firstName
      lastName
      country
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

const DELETE_ADDRESS = gql`
  mutation deleteAddress($addressId: String!) {
    deleteAddress(addressId: $addressId) {
      _id
    }
  }
`;

export {
  LOGIN_CLIENT,
  ADD_USER,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  UPDATE_USER,
  DELETE_ADDRESS,
};
