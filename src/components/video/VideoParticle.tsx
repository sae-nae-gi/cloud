import React, { FC } from "react";
import styled from "@emotion/styled";

const StyledWrapper = styled.div`
  width: 100%;
`;

const VideoParticle: FC<VideoParticleProps> = ({
  ...rest
}) => {
  return(
    <StyledWrapper>
      
    </StyledWrapper>
  )
}

export interface VideoParticleProps extends React.HTMLAttributes<HTMLDivElement> {}