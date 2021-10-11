import React, { FC } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const StyledWrapper = styled.div`
  width: 50px;
  height: 50px;
`

const load3 = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  position: relative;
  transform: translateZ(0);
  background: linear-gradient(to right, #0dc5c1 10%, rgba(255, 255, 255, 0) 42%);
  font-size: 10px;
  text-indent: -9999em;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 50px auto;
  animation: ${load3} 1.4s infinite linear;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-radius: 100% 0 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #1e1e1f;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    margin: auto;
  }
`

const Spinner = ({...rest}) => {
  return (  
    <StyledWrapper {...rest}>
      <StyledSpinner/>
    </StyledWrapper>
  )
}

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>{

}

export default Spinner;