import React, { FC, useEffect } from "react";
import styled from "@emotion/styled";
import logo from "../asset/logo.png";
import Link from "next/link"
import { Profile } from "../stores/ProfileStore";
import { ProfileBadge } from "./badge";

const StyledWrapper = styled.nav`
  display: flex;
  position: relative;
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

const StyledProfileBadge = styled(ProfileBadge)`
  position: absolute;
  top: 16px;
  right: 40px;
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
  profile,  
}) => {
  return(
    <StyledWrapper>
      <Link href="/">
        <a>
        <StyledLogoBox imageUrl={logo}/>
        </a>
      </Link>
      {profile.userName && <StyledProfileBadge imageUrl={profile.image}/>}
    </StyledWrapper>
  )
}

interface GnbProps {
  profile: Profile,
}


export default Gnb;