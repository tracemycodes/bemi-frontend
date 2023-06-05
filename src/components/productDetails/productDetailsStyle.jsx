import styled, { css } from "styled-components";

export const AccordionDiv = styled.div`
  max-height: 0;
  margin-bottom .5rem;
  transition: max-height ease-in 0.6s;
  overflow: hidden;
  @media (max-width: 415px) {
    font-size: .9rem;
  }
  ${({ toggle }) =>
    toggle &&
    css`
      transition: max-height ease-in 0.6s;
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
    margin-bottom: 0.75rem;

    @media (max-width: 415px) {
      font-size: 1.2rem;
    }
  }
  .product-price {
    margin: 0.3rem 0 0.5rem;
    @media (max-width: 415px) {
      font-size: 0.9rem;
    }
  }
  .product-size-guide {
    display: flex;
    align-items: center;
    margin: 1rem 0;

    @media (max-width: 415px) {
      font-size: 0.9rem;
    }

    button {
      margin-left: 0.6rem;
      border-bottom: 2px solid black;
    }
  }

  .product-sizes {
    p {
      display: flex;
      @media (max-width: 415px) {
        font-size: 0.9rem;
      }
      strong {
        margin-right: 0.5rem;
      }
    }
    .product-size-btn {
      margin: 0.5rem 0 0;
      display: flex;

      @media (max-width: 415px) {
        font-size: 0.9rem;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        width: 1.8rem;
        height: 1.8rem;
        border: 1px solid black;
      }
    }
  }

  .product-color {
    margin: 1rem 0;
    @media (max-width: 415px) {
      font-size: 0.9rem;
    }
    p {
      display: flex;
      strong {
        margin-right: 0.5rem;
      }
    }
    .shed-div {
      display: flex;

      > * + * {
        margin-left: 0.5rem;
      }
    }
    .product-shed {
      width: 1.3rem;
      height: 1.3rem;
      border: 1px solid black;
      background-color: blue;
      border-radius: 50%;
    }
  }

  .product-quantity {
    @media (max-width: 415px) {
      font-size: 0.9rem;
    }
    h3 {
    }
    .product-qun-btn {
      display: flex;
      margin: 0.5rem 0;
      > * {
        border: 1px solid black;
        width: 1.8rem;
        height: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.4rem;
      }
    }
  }

  .product-purchase {
    margin-top: 2rem;
    @media (max-width: 415px) {
      font-size: 0.9rem;
    }
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
    margin: 1.5rem 0;
    h3 {
      cursor: pointer;
      border-bottom: 1px solid black;
      display: inline-block;
      font-size: 1.2rem;
      @media (max-width: 415px) {
        font-size: 1rem;
      }
    }
    p {
      margin: 0.5rem 0;
      @media (max-width: 415px) {
        font-size: 0.9rem;
      }
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
    border: 1px solid transparent;

    > * {
      display: block;
      border-bottom: 1px solid black;
    }
    .info-div {
      padding: 0.5rem 0 0;
      padding-right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      h3 {
        font-size: 1.2rem;
        @media (max-width: 415px) {
          font-size: 1rem;
        }
      }
    }
    .product-mark-down {
      overflow: hidden;
      transistion: all ease 3s;
    }
  }
`;
