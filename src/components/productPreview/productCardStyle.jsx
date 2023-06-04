import styled from "styled-components";

export const ViewBtn = styled.button`
  position: absolute;
  content: "";
  width: 60%;
  padding: 0.6rem;
  border: 1.5px solid #fff;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: #fff;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
`;

export const ProductDiv = styled.div`
  height: ${(props) => (props.height ? props.height : "35rem")};
  &:hover ${ViewBtn} {
    display: flex;
  }

  .product-img {
    width: 100%;
    height: 80%;
    position: relative;
    transistion: all ease 3s;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .product-name {
    margin: 1rem 0 0.2rem;
    font-size: 1.1rem;
    font-weight: 300;
  }
  .product-view {
    position: absolute;
    content: "";
    width: 60%;
    padding: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: #fff;
    bottom: 2rem;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
  .product-shed {
    margin-top: 0.2rem;
    span {
      width: 1rem;
      height: 1rem;
      border: 1.5px solid black;
      display: inline-block;
      border-radius: 50%;
    }
    > * + * {
      margin-left: 0.2rem;
    }
  }
`;
