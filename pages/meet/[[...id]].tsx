import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, createRef, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import ChatBox from "../../src/components/chat/ChatBox";
import Video from "../../src/components/video/Video";
import BottomBar from "../../src/components/bottomBar";
import { useSocket, useStores } from "../../src/hooks";
import { Media, SignalingChannel } from "../../src/utils";
import { Spinner } from "../../src/components/loading";
import { ACTION_JOIN_ROOM, ACTION_LEAVE_ROOM, ACTION_RESET_CHAT, ACTION_RESET_ROOM, ACTION_SEND_CHAT, ACTION_WAIT_CHAT, ACTION_WAIT_JOIN_ROOM, ACTION_WAIT_LEAVE_ROOM, chatActionCreator, roomActionCreator, RoomState } from "../../src/stores";
import { nanoid } from "nanoid";
import VideoRoom from "../../src/components/video/VideoRoom";
import { PeerConnection, Channel } from "../../src/utils";
import { setEmitFlags } from "typescript";

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
  background-color: ${({ theme }) => theme.colors.chatBar};
  width: 300px;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CLIENT_PREFIX = "@client/";
const SERVER_PREFIX = "@server/";

const MeetPage: NextPage<WatchPageProps> = ({
  serverRoomId,
}) => {
  const { query: { id } } = useRouter();
  const socket = useSocket();
  const peerConnectionRef = useRef<PeerConnection>(new PeerConnection(
    new SignalingChannel(socket),
    {},
  ))
  const [disabled, setDisabled] = useState(true);
  const myVideoIdRef = useRef<string>(nanoid());
  const myVideoRef = createRef<HTMLVideoElement>();
  const dispatch = useDispatch();
  const roomId = serverRoomId || id && id.length > 0 ? id[0] : "";
  const { chat: chatState, room: roomState, profile: { userName, } } = useStores();

  const handleSubmitChat = (input: string) => {
    // socket.emit({ type: `${CLIENT_PREFIX}${roomId}`,payload: input})
    socket.emit({ type: `${CLIENT_PREFIX}${ACTION_SEND_CHAT}`, payload: input })
  }

  const handleConnectClose = () => {
    resetChatStore();
    resetRoomStore();
    // 소켓 연결을 끊기 때문에 다음 연결까지 비활성화 해둔다.
    setDisabled(true);
  }

  const resetChatStore = () => {
    dispatch(chatActionCreator(ACTION_RESET_CHAT));
  }

  const resetRoomStore = () => {
    dispatch(roomActionCreator(ACTION_RESET_ROOM));
  }

  const handleMediaCallback = (stream: MediaStream) => {
    if (myVideoRef && myVideoRef.current) {
      myVideoRef.current.srcObject = stream;
    }
  }

  useEffect(() => {
    if (roomId.length) {
      const { current: peerConnection } = peerConnectionRef;
      peerConnection.invite({
        roomId,
        userName,
      });

      const dummyUserId = nanoid(5);

      socket.onceListen(`${SERVER_PREFIX}${ACTION_JOIN_ROOM}`, (message: RoomState) => {
        dispatch(roomActionCreator(ACTION_JOIN_ROOM, message));
        dispatch(chatActionCreator(ACTION_WAIT_CHAT));
        dispatch(roomActionCreator(ACTION_WAIT_JOIN_ROOM));
        dispatch(roomActionCreator(ACTION_WAIT_LEAVE_ROOM));
        setDisabled(false);
      })
      socket.emit({
        type: `${CLIENT_PREFIX}${ACTION_JOIN_ROOM}`, payload: {
          roomId,
          userName: dummyUserId,
        }
      })

      return () => {
        socket.emit({
          type: `${CLIENT_PREFIX}${ACTION_LEAVE_ROOM}`, payload: {
            roomId,
            userName: dummyUserId,
          }
        });
        handleConnectClose();
      }
    }
  }, []);

  return (
    <StyledWrapper>
      <StyledVideoArticle>
        <VideoRoom>
          <Video
            data-video-id={myVideoIdRef.current}
            ref={myVideoRef}
          />
        </VideoRoom>
        {/* @ts-expect-error */}
        <BottomBar />
      </StyledVideoArticle>
      <StyledChatArticle>
        {disabled && <StyledSpinner />}
        <ChatBox
          onSubmitChat={handleSubmitChat}
          chats={chatState.chat}
          disabled={disabled}
        />
      </StyledChatArticle>
    </StyledWrapper>
  )
};

export const getServerSideProps = async ({ query }) => {
  return ({
    props: {
      serverRoomId: (query.id && query.id.length) ? query.id[0] : "",
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