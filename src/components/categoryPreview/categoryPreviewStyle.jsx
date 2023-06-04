import styled from "styled-components";
import newInImg from "../../assets/productImages/Bemi06.jpg";
import kidsImg from "../../assets/images/kids-dress.jpeg";

export const CategorySection = styled.section`
  margin: 1rem auto;
  max-width: 80rem;
  width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 870px) {
    height: 35rem;
  }
  @media (max-width: 750px) {
    flex-direction: column;
    height: 100rem;
  }
  @media (max-width: 620px) {
    height: 80rem;
  }
  @media (max-width: 460px) {
    height: 70rem;
  }
  @media (max-width: 400px) {
    height: 65rem;
  }

  .grid-2 {
    width: calc(50% - 1rem);
    height: 100%;
    position: relative;
    @media (max-width: 750px) {
      width: 100%;
      margin: 2rem 0;
    }
  }

  .grid-box1 {
    background-image: url(${newInImg});
    background-size: cover;
    background-position: center;
  }
  .grid-box2 {
    background-image: url(${kidsImg});
    background-size: cover;
    background-position: center;
  }

  .grid-text {
    position: absolute;
    content: " ";
    bottom: 2rem;
    left: 2rem;
    width: 70%;
    text-align: left;
    // border: 2px solid black;
    color: #fff;

    h4 {
        font-size: 1rem;
    }
    h2 {
        font-size: 2rem;
        margin: .4rem 0;
    }
    button {
        font-size: .8rem;
        border-bottom: 2px solid white;
        padding-bottom: .5rem;
        position: relative;
        // &:before {
        //   position: absolute;
        //   width: 2rem;
        //   height: .5rem;
        //   background-color: white;
        //   bottom: -.3rem;
        //   left: -2.1rem;
        //   content: "";
        // }
        // &:hover:before {
        //   transition: transform .3s ease-out;
        //   transform: translateX(7.5rem)
  
        // }
    }
`;
