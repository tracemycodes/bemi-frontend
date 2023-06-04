import styled from "styled-components"

export const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: clamp(0.5rem, 2vw, 0.8rem);
  align-items: center;
  // padding-top: clamp(0.8rem, 1vw, 1rem);
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .termsChecked {
    display: block;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .checkmark {
    border: 1px solid black;
    position: absolute;
    top: 0;
    left: 0;
    height: 1.2rem;
    width: 1.2rem;
    background-color: white;
    border-radius: 2px;
  }

  .termsChecked input:checked ~ .checkmark {
    background-color: black;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .termsChecked input:checked ~ .checkmark:after {
    display: block;
  }

  .termsChecked .checkmark:after {
    left: 6px;
    top: 3px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export const LoginBtn = styled.div`
  .hr-lines {
    position: relative;
    max-width: 500px;
    margin: 6px auto;
    text-align: center;
  }
  .hr-lines:before {
    content: " ";
    display: block;
    height: 1px;
    width: 155px;
    position: absolute;
    top: 50%;
    left: 0;
    background: ${({ theme }) => theme.colors.darkgray};
  }
  .hr-lines:after {
    content: " ";
    height: 1px;
    width: 155px;
    background: red;
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    background: ${({ theme }) => theme.colors.darkgray};
  }
`
