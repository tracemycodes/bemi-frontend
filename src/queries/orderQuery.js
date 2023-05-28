import { gql } from "@apollo/client";

const SINGLE_ORDER = gql`
  query singleOrder($orderId: String!) {
    singleOrder(orderId: $orderId) {
      _id
      shippingAdd {
        uuid
        firstName
        lastName
        address
        apartment
        city
        country
        state
        zipCode
        phone
      }
      products {
        color
        count
        image
        name
        price
        size
      }
      transactionId
      createdAt
      orderStatus {
        status
        orderUrl
        placed {
          status
          orderDate
        }
        packed {
          status
          orderDate
        }
        shipped {
          status
          orderDate
        }
        delivered {
          status
          orderDate
        }
      }
    }
  }
`;

const GET_ORDER = gql`
  query getOrders {
    getOrders {
      _id
      shippingAdd {
        uuid
        firstName
        lastName
        address
        apartment
        city
        country
        state
        zipCode
        phone
      }
      products {
        color
        count
        image
        name
        price
        size
      }
      transactionId
      createdAt
      updatedAt
      orderStatus {
        status
        orderUrl
        placed {
          status
          orderDate
        }
        packed {
          status
          orderDate
        }
        shipped {
          status
          orderDate
        }
        delivered {
          status
          orderDate
        }
      }
    }
  }
`;

const ALL_ORDERS = gql`
  query orders {
    orders {
      products {
        count
        price
      }
      _id
      orderStatus {
        status
        orderUrl
        placed {
          status
          orderDate
        }
        packed {
          status
          orderDate
        }
        shipped {
          status
          orderDate
        }
        delivered {
          status
          orderDate
        }
      }
      createdAt
      transactionId
      name
      email
    }
  }
`;

export { SINGLE_ORDER, ALL_ORDERS, GET_ORDER };
