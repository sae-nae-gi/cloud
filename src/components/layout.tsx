import React, { FC, useEffect } from "react";
import Gnb from "./gnb";
import styled from "@emotion/styled";
import { connect, useDispatch } from "react-redux";
import { Profile } from "../stores/ProfileStore";
import { actionCreator as profileActionCreator } from "../stores/ProfileStore";
import { getRandomImage } from "../utils";

const StyledMain = styled.main`
  label: CloudMain;
`;

const StyledSection = styled.section`
  height: 100%;

  @media (max-width: 450px) {
    padding: 0 30px;
  }
`; 

const Layout: FC<LayoutProps> = ({
  children,
  profile,
}) => {
  const dispatch = useDispatch();

  const profileImage = React.useMemo(() => {
    return getRandomImage();
  },[]);

  useEffect(() => {
    const existUserName = localStorage.getItem("cloud_user_name");
    if(existUserName){
      dispatch(profileActionCreator("@profile/login", {
        userName: existUserName,
        image: profileImage,
      }))
    }
  },[]);
  
  return(
    <StyledMain>
      <Gnb profile={profile}/>
        <StyledSection>
          {children}
        </StyledSection>
    </StyledMain>
  )
}

export interface LayoutProps extends React.HTMLAttributes<HTMLElement>{
  profile: Profile;
};

const mapStateToProps = (state) => {
  const { profile } = state;
  return {
    profile,
  }
}

export default connect(mapStateToProps)(Layout);