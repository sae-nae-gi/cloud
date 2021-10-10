import React, { FC } from "react";
import styled from "@emotion/styled";

const StyledChatInput = styled.input`
  background-color: transparent;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;

const ChatInput: FC<ChatInputProps> = ({
  ...rest
}) => {
  return(
    <StyledChatInput {...rest}/>
  )
}

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement>{

}

export default ChatInput;