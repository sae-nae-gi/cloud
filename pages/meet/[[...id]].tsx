import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import ChatBox from "../../src/components/chat/ChatBox";
import BottomBar from "../../src/components/bottomBar";
import { useSocket, useStores } from "../../src/hooks";
import { Spinner } from "../../src/components/loading";
import { ACTION_RESET_CHAT, ACTION_SEND_CHAT, ACTION_WAIT_CHAT, chatActionCreator } from "../../src/stores";
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
  const dispatch = useDispatch();
  const roomId = serverRoomId || id && id.length > 0 ? id[0] : ""; 
  const {chat: chatState} = useStores();
  const handleSubmitChat = (input: string) => {
    socket.emit({ type: `@client/${roomId}`,payload: input})
    socket.emit({type: `@client/${ACTION_SEND_CHAT}`, payload: input})
  }
  
  useEffect(() => {
    console.log("roomId: ", roomId)
    if(roomId.length){
      const dummyUserId = nanoid(5);
      socket.onListen("@joinedRoom", (data: JoinRoomPayload) => {
        console.warn("current room users: ", data.roomUsers)
      });
      
      socket.onceListen("@joinedRoom", () => {
        dispatch(chatActionCreator(ACTION_WAIT_CHAT));
        setDisabled(false);
      })

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
        dispatch(chatActionCreator(ACTION_RESET_CHAT))
        setDisabled(true);
      }
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
        <ChatBox 
          onSubmitChat={handleSubmitChat} 
          chats={chatState.chat}
          disabled={disabled}
        />
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