import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ChatBox from "../../src/components/chat/ChatBox";
import BottomBar from "../../src/components/bottomBar";
import { useSocket } from "../../src/hooks";
import { Spinner } from "../../src/components/loading";
import ChatCard from "../../src/components/chat/ChatCard";
import { nanoid } from "nanoid";
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
  serverRoomId,
}) => {
  const {query: {id}} = useRouter();
  const socket = useSocket();
  const [disabled,setDisabled] = useState(true);
  const roomId = serverRoomId || id && id.length > 0 ? id[0] : ""; 
  
  const handleSubmitChat = (input: string) => {
    socket.emit({ type: `@client/${roomId}`,payload: input})
  }
  
  useEffect(() => {
    if(roomId.length){
      const dummyUserId = nanoid(5);
      socket.onListen("@joinedRoom", (data: JoinRoomPayload) => {
        console.warn("current room users: ", data.roomUsers)
        setDisabled(false);
        socket.onListen(`@server/${roomId}`, (message) => {
          console.log({message});
        })
      });

      socket.onListen("@leftRoom", (data: JoinRoomPayload) => {
        console.warn("current room users: ", data.roomUsers)
      })

      socket.emit({type: "@joinRoom", payload: {
        roomId,
        userId: dummyUserId,
      }})
      
      return () => {
        socket.emit({type: "@leaveRoom", payload: {
          roomId,
          userId: dummyUserId,
        }});
        setDisabled(true);
      }
    }
  },[roomId]);

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

export const getServerSideProps = async ({query}) => {
  return({
    props: {
      serverRoomId: (query.id && query.id.length) ? query.id[0]: "",
    }
  })
}

export interface EmitChatPayload {
  user: string;
  
}

export interface JoinRoomPayload {
  roomId: string,
  userId: string,
  roomUsers: any[];
}

interface WatchPageProps {
  serverRoomId: string;
}

export default MeetPage;