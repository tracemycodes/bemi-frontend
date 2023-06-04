import styled from "styled-components"

export const SideNav = styled.div`
  height: 100vh;
  background: ${({toggle}) => toggle ? 'rgba(0, 0, 0, 0.49)' : 'rgba(0, 0, 0, 0.0)'};
  width: 100vw;
  right: 0;
  top: 0;
  position: fixed;
  transition: all .5s cubic-bezier(0.33, 0, 0, 1);
  z-index: 99;

  .cancelIcon:hover {
    // color: white;
  }
  .socialLink:hover {
    color: white;
  }
  .searchInput {
    border: 1px dotted #cccccc;
  }

  .searchInput::placeholder {
    color: #e5dfd9;
    font-size: 15px;
  }
  .searchInput:focus {
    border: 1px solid white;
  }

  nav {
    transform: translateX(-100%);
    transition: all .5s cubic-bezier(0.33, 0, 0, 1);
    transform: ${({toggle}) => toggle ? 'translateX(0%)' : 'translateX(-100%)'};
  }

  .navLinkItem {
    border-bottom: 1px solid #cccccc;
  }
  .navLinkItem:hover {
    color: white;
  }
  .cartLink {
    border: 1px solid #cccccc;
  }
`
