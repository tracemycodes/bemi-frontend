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
      width: 43%;
    //   border: 2px solid red;

      @media (max-width: 1160px) {
        width: 47%;
      }
      
    }
    .flex-one {
        height: 43rem;
        @media (max-width: 1020px) {
            width: 57%;
          } 
          @media (max-width: 905px) {
            width: 100%;
          }
    }
    .flex-two {
        @media (max-width: 1020px) {
            width: 40%;
          } 
          @media (max-width: 905px) {
            width: 100%;
            margin: 2rem 0 1rem;
          }
    }
}
`;
