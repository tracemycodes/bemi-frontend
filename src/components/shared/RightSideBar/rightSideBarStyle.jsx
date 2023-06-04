import styled from "styled-components"

export const SideBarModal = styled.div`
  background: ${({toggle}) => toggle ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.0)'};
  height: 100vh;
  width: 100vw;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 99;
  transition: all 1s cubic-bezier(0.33, 0, 0, 1);
  
  
  .rightSideBarTitle {
    font-family: "lato";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #373f53;
  }
  .rightSideBar-container {
    width: 33.5vw;
    background-color: white;
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px;
    transform: translateX(100%);
    transition: all 1s cubic-bezier(0.33, 0, 0, 1);
    transform: ${({toggle}) => toggle ? 'translateX(0%)' : 'translateX(100%)'};
    display: flex;
    flex-direction: column;
  }
  .rightSideBar-Header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 766px) {
    .rightSideBar-container {
      width: unset;
      background-color: white;
      height: 100vh;
      position: unset;
      padding: 30px;
    }
  }
`
