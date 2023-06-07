import styled from "styled-components"

export const BemiBag = styled.div`
  position: relative;
  .cartContainer {
    margin-top: 1rem;
    overflow-y: auto;
    position: relative;
    z-index: 20;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .orderNote {
    width: 150px;
  }

  #orderNote {
    resize: none;
  }
`
