import styled, { css } from "styled-components";

export const AccordionDiv = styled.div`
  max-height: 0;
  transition: max-height ease-in .6s;
  overflow: hidden;
  ${({ toggle }) =>
    toggle &&
    css`
      transition: max-height ease-in .6s;
      max-height: 10rem;
    `}
    ${({ toggle }) =>
    !toggle &&
    css`
      transition: none;
    `}
`;

export const DetailsSection = styled.section`
  h2 {
    font-size: 1.3rem;
  }
  .product-price {
    font-weight: bold;
    margin: 0.3rem 0 0.5rem;
  }
  .product-size-guide {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    button {
      margin-left: 0.6rem;
      border-bottom: 2px solid black;
    }
  }

  .product-sizes {
    p {
      display: flex;
      strong {
        margin-right: 0.5rem;
      }
    }
    .product-size-btn {
      margin: 0.5rem 0;
      button {
        margin-right: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid black;
      }
    }
  }

  .product-color {
    margin: 1rem 0;
    p {
      display: flex;
      strong {
        margin-right: 0.5rem;
      }
    }
    .shed-div {
      display: flex;

      > * + * {
        margin-left: .5rem;
      }
    }
    .product-shed {
      width: 1.75rem;
      height: 1.3rem;
      border: 1px solid black;
      background-color: blue;
    }
  }

  .product-quantity {
    h3 {
    }
    .product-qun-btn {
      display: flex;
      margin: 0.5rem 0;
      > * {
        border: 1px solid black;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.4rem;
      }
    }
  }

  .product-purchase {
    margin-top: 2rem;
    button {
      display: block;
      width: 100%;
      height: 2.5rem;
      border: 1px solid black;
      margin: 0.5rem 0;
      background-color: black;
      color: #fff;
    }
  }

  .product-contact {
    margin: 1rem 0;
    h3 {
      cursor: pointer;
      border-bottom: 1px solid black;
      display: inline-block;
    }
    p {
      margin: 0.5rem 0;
    }
    .product-media-icons {
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.75rem;
        cursor: pointer;
        font-size: 1.5rem;
      }
    }
  }

  .product-info {
    margin: unset;
    padding: unset;
    display: flex;
    flex-direction: column;

    > * {
      display: block;
      border-bottom: 1px solid black;
    }
    .info-div {
      padding: 0.5rem 0;
      padding-right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        font-size: 1.3rem;
      }
    }
    .product-mark-down {
      overflow: hidden;
      transistion: all ease 3s;
    }
  }
`;
