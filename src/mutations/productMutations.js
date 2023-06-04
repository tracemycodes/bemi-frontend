import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
  mutation addProduct(
    $collectionName: String!
    $name: String!
    $releases: String!
    $price: String!
    $inStock: String!
    $size: [String]!
    $color: [ColorInput]!
    $images: [String!]!
    $variant: [VariantInput]
    $discount: String!
    $description: String!
    $materials: String!
    $careAdvice: String!
  ) {
    addProduct(
      productInput: {
        collectionName: $collectionName
        name: $name
        releases: $releases
        price: $price
        inStock: $inStock
        size: $size
        color: $color
        images: $images
        variant: $variant
        discount: $discount
        description: $description
        materials: $materials
        careAdvice: $careAdvice
      }
    ) {
      _id
      name
      price
      inStock
      images
      discount
    }
  }
`;
const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $productId: String!
    $collectionName: String!
    $name: String!
    $releases: String!
    $price: String!
    $inStock: String!
    $size: [String]!
    $color: [ColorInput]!
    $images: [String!]!
    $variant: [VariantInput]
    $discount: String!
    $description: String!
    $materials: String!
    $careAdvice: String!
  ) {
    updateProduct(
      productInput: {
        productId: $productId
        collectionName: $collectionName
        name: $name
        releases: $releases
        price: $price
        inStock: $inStock
        size: $size
        color: $color
        images: $images
        variant: $variant
        discount: $discount
        description: $description
        materials: $materials
        careAdvice: $careAdvice
      }
    ) {
      _id
      name
      price
      inStock
      images
      discount
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation deleteProduct($productID: String!) {
    deleteProduct(productId: $productID) {
      _id
    }
  }
`;

const PRODUCT_IMAGE = gql`
  mutation uploadMedia($mediaInput: String!) {
    uploadMedia(mediaInput: $mediaInput) {
      url
    }
  }
`;

export { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCT_IMAGE };
