import React, { FC } from "react";
import styled from "@emotion/styled";
import open_call from "../../asset/open_call.svg";
import close_call from "../../asset/close_call.svg";
import open_view from "../../asset/open_view.svg";
import close_view from "../../asset/close_view.svg";

const StyledWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.bottomBar};
  width: 100%;
  height: 76px;
  padding: 8px;
`;

const StyledContainer = styled.div`
  & div {
    display: inline-block;
  }
`;

const StyledIconBox = styled.div`
`;

const StyledCall = styled.div<{
  mute?: boolean;
}>`
  background: url(${({mute}) => mute ? open_call : close_call}) center no-repeat;
  background-size: cover;
  width: 48px;
  height: 48px;
  margin-right: 32px;
  cursor: pointer;
`;

const StyledView = styled.div<{
  view?: boolean;
}>`
  background: url(${({view}) => view ? open_view : close_view}) center no-repeat;
  background-size: cover;
  width: 48px;
  height: 48px;
  cursor: pointer;
`

const BottomBar: FC<BottomBarProps> = ({
  isMute,
  isView,
  onMute,
  onView
}) => {


  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledIconBox onClick={onMute} >
          <StyledCall mute={isMute}/>
        </StyledIconBox>
        <StyledIconBox onClick={onView}>
          <StyledView view={isView}/>
        </StyledIconBox>
      </StyledContainer>
    </StyledWrapper>
  )
}

export interface BottomBarProps {
  onMute: () => void;
  isMute: boolean;
  onView: () => void;
  isView: boolean;
}

export default BottomBar;