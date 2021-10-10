import React, { FC, useEffect } from "react";
import styled from "@emotion/styled";
import logo from "../asset/logo.png";
import Link from "next/link"

const StyledWrapper = styled.nav`
  display: flex;
  align-items: center;
  background-color: ${({theme}) => theme.colors.gnb};
  height: 92px;
  padding: 0 40px;
  border-bottom: 1px solid ${({theme}) => theme.colors.border};

  @media (max-width: 450px) {
    height: 60px;
    padding: 0 15px;
  }
`;

const StyledLogoBox = styled.div<{
  imageUrl: string;
}>`
  background: url(${({imageUrl}) => imageUrl}) center no-repeat;
  background-size: cover;
  width: 60px;
  height: 60px;
  cursor: pointer;

  @media (max-width: 450px) {
    width: 48px;
    height: 48px;
  }
`;

const Gnb: FC<GnbProps> = ({
  
}) => {
  return(
    <StyledWrapper>
      <Link href="/">
        <a>
        <StyledLogoBox imageUrl={logo}/>
        </a>
      </Link>
    </StyledWrapper>
  )
}

interface GnbProps {
  
}

export default Gnb;