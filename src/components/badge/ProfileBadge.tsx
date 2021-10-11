import React from "react";
import styled from "@emotion/styled";

const StyledWrapper = styled.div`
  border-radius: 50%;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  imageUrl,
  ...rest
}) => {
  return (
    <StyledWrapper {...rest}>
      <StyledImage src={imageUrl}/>
    </StyledWrapper>
  )
}

export interface ProfileBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
}

export default ProfileBadge;