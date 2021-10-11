import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ChatBox from "../../src/components/chat/ChatBox";
import BottomBar from "../../src/components/bottomBar";
import { useSocket } from "../../src/hooks";
import { Spinner } from "../../src/components/loading";

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
  position: relative;
  background-color: ${({theme}) => theme.colors.chatBar};
  width: 300px;
  height: 100%;
  border-left: 1px solid ${({theme}) => theme.colors.border};
`

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MeetPage: NextPage<WatchPageProps> = ({

}) => {
  const {query: {id}} = useRouter();
  const socket = useSocket();
  const [disabled,setDisabled] = useState(true);
  
  const handleSubmitChat = (input: string) => {
    socket.emit({ type: `@client/${id[0]}`,payload: input})
  }
  
  useEffect(() => {
    socket.onListen("@joinedRoom", (message) => {
      setDisabled(false);
      console.log({message});
    });

    const roomId = (id || []).length && id[0];
    socket.emit({type: "@joinRoom", payload: roomId})
    
    return () => {
      socket.emit({type: "@leaveRoom", payload: roomId});
      setDisabled(true);
    }
  },[]);

  return(
    <StyledWrapper>
      <StyledVideoArticle>
        {/* @ts-expect-error */}
        <BottomBar/>
      </StyledVideoArticle>
      <StyledChatArticle>
        {disabled && <StyledSpinner/>}
        <ChatBox onSubmitChat={handleSubmitChat} disabled={disabled}/>
      </StyledChatArticle>
    </StyledWrapper>
  )
};

interface WatchPageProps {
  
}

export default MeetPage;