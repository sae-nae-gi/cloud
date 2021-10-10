import { NextPage } from "next";
import { useEffect } from "react";
import styled from "@emotion/styled";
import ChatBox from "../../src/components/chat/ChatBox";
import BottomBar from "../../src/components/bottomBar";
import { useSocket } from "../../src/hooks";

const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const StyledVideoArticle = styled.article`
  position: relative;
  width: calc(100% - 200px);
  padding: 8px;
`;

const StyledChatArticle = styled.article`
  background-color: ${({theme}) => theme.colors.chatBar};
  width: 300px;
  height: 100%;
  border-left: 1px solid ${({theme}) => theme.colors.border};
`

const MeetPage: NextPage<WatchPageProps> = ({

}) => {
  const socket = useSocket();
  const handleSubmitChat = () => {
    
  }
  
  useEffect(() => {
    

    return () => {
      
    }
  },[]);

  return(
    <StyledWrapper>
      <StyledVideoArticle>
        {/* @ts-expect-error */}
        <BottomBar/>
      </StyledVideoArticle>
      <StyledChatArticle>
        <ChatBox onSubmitChat={handleSubmitChat}/>
      </StyledChatArticle>
    </StyledWrapper>
  )
};

interface WatchPageProps {
  
}

export default MeetPage;