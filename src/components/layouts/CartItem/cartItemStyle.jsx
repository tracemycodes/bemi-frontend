import styled from "styled-components";

export const BemiCart = styled.div`
  .productCartContainer {
    padding-bottom: 30px;
    border-bottom: 1px solid #AAAAAA;
    .productCartContainer:last-child {
      border: none;
    }

  .cartProductImg {
    width: 115px;
    height: 164px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cartProductInfo {
    width: 70%;
  }

  .cartProductName {
    font-size: clamp(
      0.73998rem,
      0.6633246132596685rem + 0.3270629834254144vw,
      0.924975rem
    );
  }

  .cartProductName {
    font-size: clamp(
      0.7992rem,
      0.7164099447513812rem + 0.3532375690607735vw,
      0.999rem
    );
  }

  .quantityControl {
  }

  input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  .quantityInput {
    height: 42px;
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #aaaaaa;

    &:hover {
      border-color: black;
    }
  }

  .cartQuantity {
    width: 10%;
    display: flex;
    text-align: center;
    justify-content: center;
    outline: none;
  }

  .quantityBtn {
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    transition: background-color 0.25s ease-in-out;
    padding: 6px calc(4px * 3);

    &:hover {
      background: #f5f5f5;
    }
  }

  .cartRemove {
    font-size: 14px;
    text-decoration: underline;
  }
`;
