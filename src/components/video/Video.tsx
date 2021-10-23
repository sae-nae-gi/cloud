import React, { forwardRef } from "react";
import styled from "@emotion/styled";

const StyledWrapper = styled.div`
  height: 100%;

  & > video {
    width: 100%;
    height: 100%;
  }
`;

const Video = forwardRef<HTMLVideoElement, VideoProps>(({
  className = "",
  ...rest
}, ref) => {
  return(
    <StyledWrapper className={className}>
      <video 
        {...rest}
        ref={ref}
        controls={false}
        autoPlay
      />
    </StyledWrapper>
  )
})

export interface VideoProps extends React.HTMLAttributes<HTMLVideoElement> {
  
}

export default Video;