import React, { FC, useEffect } from "react";
import styled from "@emotion/styled";

const StyledWrapper = styled.div`
  display: grid;
  position: relative;
  height: calc(100% - 76px);
`;

const VideoRoom: FC<VideoRoomProps> = ({
  children,
  ...rest
}) => {
  
  useEffect(() => {
    
  },[]);

  return(
    <StyledWrapper {...rest}>
      {children}
    </StyledWrapper>
  )
}

export interface VideoRoomProps extends React.HTMLAttributes<HTMLDivElement> {

}

export default VideoRoom;