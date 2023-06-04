import styled from "styled-components";

export const BemiNav = styled.div`
  position: relative;
  z-index: 99;
  background: linear-gradient(to bottom, #25211e 0, rgba(37, 33, 30, 0.2) 100%);
  // border: 2px solid red;
  // padding: 14px 0;
  // background: transparent;
  // background: black;

  .shop-cart {
    position: relative;
    .cart-num {
      position: absolute;
      bottom: -40%;
      left: -40%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        width: .85rem;
        height: .85rem;
        border-radius: 50%;
        background-color: #fff;
        color: black;
        cursor: pointer;
      }
    }
  }

  svg {
    cursor: pointer;
  }

  .navBg {
  }

  .mainNav {
    // border: 2px solid green;
    // padding: 13px 0;
  }
  @media (min-width: 768px) {
    &:hover {
      background: black;
    }
  }
`;
