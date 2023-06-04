import { gql } from "@apollo/client";

const SINGLE_PRODUCT = gql`
  query singleProduct($productId: String!) {
    singleProduct(productId: $productId) {
      collectionName
      _id
      name
      releases
      price
      inStock
      size
      color {
        color
        shed
      }
      images
      variant {
        color
        images
      }
      discount
      description
      materials
      careAdvice
      createdAt
      updatedAt
    }
  }
`;

const ALL_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      price
      inStock
      images
      discount
      color {
        color
        shed
      }
    }
  }
`

export { SINGLE_PRODUCT, ALL_PRODUCTS };
