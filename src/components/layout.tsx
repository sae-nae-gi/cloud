import React, { FC } from "react";
import Gnb from "./gnb";
import styled from "@emotion/styled";

const StyledMain = styled.main`
  label: CloudMain;
`;

const StyledSection = styled.section`
  height: 100%;
  padding: 0 120px;

  @media (max-width: 450px) {
    padding: 0 30px;
  }
`; 

const Layout: FC = ({children}) => {
  return(
    <StyledMain>
      <Gnb/>
      <StyledSection>
      {children}
      </StyledSection>
    </StyledMain>
  )
}

export default Layout;