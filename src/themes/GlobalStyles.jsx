import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Futura,helvetica, arial, sans-serif;
}



.home{
  // border: 2px solid red;
  width: 100%;
  position: relative;
  z-index: 10;
  margin-top: -130px;
  min-height: 400px;
}
.bemiTitle{
  left: 50%;
  transform: translate(-50%)
}
`

export default GlobalStyle
