import styled from "styled-components";

export const SliderDiv = styled.div`
  height: 35rem;
  border: 2px solid black;
`;

export const SliderSection = styled.section`
  max-width: 80rem;
  width: 100%;
  margin: 1rem auto;
  border-top: 0.7px solid black;
  border-bottom: 0.7px solid black;
  padding: 1rem 0;
  @media (min-width: 700px) {
    width: 100%;
  }
  @media (max-width: 1330px) {
    padding: 1rem 1.25rem;
  }
  .slider-header {
    h2 {
      font-size: 1.8rem;
    }
    p {
      margin-top: .3rem;
      font-weight: 200;
      font-size: .9rem;
    }
    button {
      margin: 1rem 0 1.3rem;
      font-size: .9rem;
      border-bottom: 2px solid black;
      padding-bottom: .5rem;
      position: relative;
      &:before {
        position: absolute;
        width: 3rem;
        height: .5rem;
        background-color: white;
        bottom: -.3rem;
        left: -3rem;
        content: "";
      }
      &:hover:before {
        transition: transform .5s ease-out;
        transform: translateX(14.5rem)

      }
    }
  }
`;
