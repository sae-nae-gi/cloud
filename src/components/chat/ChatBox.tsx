import React, {useState} from "react";
import styled from "@emotion/styled";
import ChatInput from "./ChatInput";
import throttle from "lodash/throttle";

const StyledSection = styled.section`
  background-color: ${({theme}) => theme.colors.chatBar};
  height: 100%;
  padding: 8px;
`;

const StyledChatView = styled.article`
  width: 100%;
  height: calc(100% - 60px);
  padding-bottom: 8px;
`
const StyledChatInputArticle = styled.article`
  background-color: ${({theme}) => theme.colors.chatBox};
  height: 60px;
  padding: 12px;

  & > form {
    display: flex;
    height: 100%;
  }
`;

const StyledButton = styled.button`
  background-color: ${({theme}) => theme.colors.submitButton};
  color: white;
  width: 60px;
  height: 100%;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.hoverButton};
  }
`;

const ChatBox: React.FC<ChatBoxProps> = ({ 
  onSubmitChat,
  disabled,
}) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e) => {
    setInput(e.target.value);
  }


  const handleSubmit = throttle((e) => {
    e.preventDefault();
    if(disabled) {
      return false;
    }
    onSubmitChat(input);
    setInput("");
  },150);

  return(
    <StyledSection>
      <StyledChatView></StyledChatView>
      <StyledChatInputArticle>
        <form onSubmit={handleSubmit}>
        <ChatInput 
          value={input} 
          onChange={handleChange}
          disabled={disabled}
        />
        <StyledButton type="submit" disabled={disabled}>입력</StyledButton>
        </form>
      </StyledChatInputArticle>
    </StyledSection>
  )
}

interface ChatBoxProps {
  onSubmitChat: (value: string) => void;
  disabled?: boolean;
}

export default ChatBox;