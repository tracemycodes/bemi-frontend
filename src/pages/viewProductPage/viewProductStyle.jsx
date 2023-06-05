import styled from "styled-components";

export const ViewProductSection = styled.section`
  margin-bottom: 10rem;

  .product-info {
    margin: 5rem auto;
    max-width: 80rem;
    width: 100%;
    // border: 2px solid green;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1330px) {
      padding: 1rem 1.25rem;
    }
    @media (max-width: 905px) {
      flex-direction: column;
    }

    .flex-2 {
      //   border: 2px solid red;
      
      @media (max-width: 1160px) {
        width: 47%;
      }
    }
    .flex-one {
      width: 40%;
      height: 48rem;
      @media (max-width: 1140px) {
        width: 45%;
      }
      @media (max-width: 1020px) {
        height: 43rem;
        width: 48%;
      }
      @media (max-width: 905px) {
        max-width: 28rem;
        width: 100%;
        margin: 0 auto;
        width: 100%;
      }
      @media (max-width: 605px) {
        max-width: 23rem;
        height: 32rem;
      }
      @media (max-width: 350px) {
        max-width: 23rem;
        height: 25rem;
      }
    }
    .flex-two {
      width: 52%;
      @media (max-width: 1140px) {
        width: 48%;
      }
      @media (max-width: 1020px) {
        width: 48%;
      }
      @media (max-width: 905px) {
        width: 100%;
        margin: 2rem 0 1rem;
      }
    }
  }
`;
