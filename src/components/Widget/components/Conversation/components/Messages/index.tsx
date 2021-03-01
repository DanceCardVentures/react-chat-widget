import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

import { scrollToBottom } from "../../../../../../utils/messages";
import {
  Message,
  Link,
  CustomCompMessage,
  GlobalState,
} from "../../../../../../store/types";

import MessageComponent from "src/components/Widget/components/Conversation/components/Messages/components/Message";

import Loader from "./components/Loader";
import "./styles.scss";

/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
* */

export function defineWidgetHeight(parametersHeight: number | undefined) {
  const minimalValue = 300;
  const restComponentsTotalHeight = 180;

  if (parametersHeight) {
    const expectedHeight = parametersHeight - restComponentsTotalHeight;

    if (expectedHeight < minimalValue) {
      return minimalValue;
    }

    return expectedHeight;
  }

  return minimalValue;
}

type Props = {
  showTimeStamp: boolean;
  profileAvatar?: string;
};

function Messages({ showTimeStamp }: Props) {
  const { messages, typing, showChat, parameters } = useSelector(
    (state: GlobalState) => ({
      messages: state.messages.messages,
      badgeCount: state.messages.badgeCount,
      typing: state.behavior.messageLoader,
      showChat: state.behavior.showChat,
      parameters: state.dialogConfig.parameters,
    })
  );

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore
    scrollToBottom(messageRef.current);
  }, [messages, showChat]);

  const getComponentToRender = (
    message: Message | Link | CustomCompMessage
  ) => {
    // @ts-ignore
    return <MessageComponent message={message} showTimeStamp={showTimeStamp} />;
  };

  return (
    <div
      style={{
        height: defineWidgetHeight(parameters && parameters.chatbotHeight),
      }}
      id="messages"
      className="rcw-messages-container"
      ref={messageRef}
    >
      {messages.map((message, index) => {
        return (
          <div
            className="rcw-message"
            key={`${index}-${format(message.timestamp, "hh:mm")}`}
          >
            {getComponentToRender(message)}
          </div>
        );
      })}
      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
