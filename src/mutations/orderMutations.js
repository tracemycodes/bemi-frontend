import { gql } from "@apollo/client";

const ADD_ORDER = gql`
  mutation addOrder($products: [productPurchaseInput]) {
    addOrder(orderInput: { products: $products }) {
      _id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation updateOrder(
    $orderId: String!
    $user: String
    $shippingAdd: AddressInput
    $billing: AddressInput
    $paid: Boolean
    $orderStatus: statusSchemaInput
    $products: [productPurchaseInput]
    $transactionId: String
  ) {
    updateOrder(
        orderInput: {
        orderId: $orderId
        user: $user
        shippingAdd: $shippingAdd
        billing: $billing
        paid: $paid
        orderStatus: $orderStatus
        products: $products
        transactionId: $transactionId
      }
    ) {
      user
      paid
    }
  }
`;

export { ADD_ORDER, UPDATE_ORDER };

// $orderId: String
// $user: String
// $shippingAdd: String
// $billing: AddressInput
// $paid: Boolean
// $orderStatus: statusSchemaInput

// orderId: $orderId
//         user: $user
//         shippingAdd: $shippingAdd
//         billing: $billing
//         paid: $paid
//         orderStatus: $orderStatus
