import React, { FC } from "react";
import styled from "@emotion/styled";
import { Chat } from "../../stores";

const StyledWrapper = styled.div`
  word-break: break-all;
  padding: 4px 8px;
`;

const StyledName = styled.div<{
  color?: string;
}>`
  display: inline-block;
  color: ${({color}) => color ? color : "#fff"};
  font-size: 16px;
  font-weight: 700;
  word-break: break-all;
  line-height: 16px;
  margin-right: 12px;
`;

const StyledSpan = styled.span`
  font-size: 16px;
  line-height: 16px;
`;
/**
 * 
 
--color-brand-muted-ice: #e0ebff;
    --color-brand-muted-cupcake: #ffa3ee;
    --color-brand-muted-mint: #8fffd2;
    --color-brand-muted-sky: #7aa7ff;
    --color-brand-muted-blush: #ffcdcc;
    --color-brand-muted-canary: #f5f500;
    --color-brand-muted-smoke: #d3d3d9;
    --color-brand-muted-lavender: #d1b3ff;
    --color-brand-muted-mustard: #ffd37a;
    --color-brand-muted-emerald: #00f593;
    --color-brand-muted-coral: #ff8280;
    --color-brand-muted-ocean: #1345aa;
    --color-brand-accent-grape: #5c16c5;
    --color-brand-accent-dragonfruit: #ff38db;
    --color-brand-accent-carrot: #e69900;
    --color-brand-accent-sun: #f5f500;
    --color-brand-accent-lime: #00f593;
    --color-brand-accent-turquoise: #00f0f0;
    --color-brand-accent-eggplant: #451093;
    --color-brand-accent-wine: #ae1392;
    --color-brand-accent-slime: #00f593;
    --color-brand-accent-seafoam: #8fffd2;
    --color-brand-accent-cherry: #eb0400;
    --color-brand-accent-marine: #1f69ff;
    --color-brand-accent-seaweed: #00a3a3;
    --color-brand-accent-pebble: #848494;
    --color-brand-accent-moon: #efeff1;
    --color-brand-accent-fiji: #8fffd2;
    --color-brand-accent-blueberry: #1f69ff;
    --color-brand-accent-arctic: #00f0f0;
    --color-brand-accent-highlighter: #f5f500;
 */
const ChatCard: FC<ChatCardProps> = ({
  color,
  userName,
  message,
}) => {
  return(
    <StyledWrapper>
      <StyledName color={color}>{userName}: </StyledName>
      <StyledSpan>{message}</StyledSpan>
    </StyledWrapper>
  )
}

export interface ChatCardProps extends Chat{
  color?: string;
}

export default ChatCard;