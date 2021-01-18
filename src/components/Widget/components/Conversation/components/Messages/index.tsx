import React, { useEffect, useRef, useState, ElementRef, ImgHTMLAttributes, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import format from 'date-fns/format';

import { scrollToBottom } from '../../../../../../utils/messages';
import { Message, Link, CustomCompMessage, GlobalState } from '../../../../../../store/types';
import { setBadgeCount, markAllMessagesRead } from '@actions';

import Loader from './components/Loader';
import './styles.scss';

type Props = {
  showTimeStamp: boolean;
  profileAvatar?: string;
};

function Messages({ profileAvatar, showTimeStamp }: Props) {
  const dispatch = useDispatch();
  const { messages, typing, showChat, badgeCount, parameters } = useSelector((state: GlobalState) => ({
    messages: state.messages.messages,
    badgeCount: state.messages.badgeCount,
    typing: state.behavior.messageLoader,
    showChat: state.behavior.showChat,
    parameters: state.dialogConfig.parameters
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore
    scrollToBottom(messageRef.current);
    if (showChat && badgeCount) {
      dispatch(markAllMessagesRead());
    } else {
      dispatch(setBadgeCount(messages.filter(message => message.unread).length));
    }
  }, [messages, badgeCount, showChat]);

  const getComponentToRender = (message: Message | Link | CustomCompMessage) => {
    const ComponentToRender = message.component;
    if (message.type === 'component') {
      return <ComponentToRender {...message.props} />;
    }
    return <ComponentToRender message={message} showTimeStamp={showTimeStamp} />;
  };

  // TODO: Fix this function or change to move the avatar to last message from response
  // const shouldRenderAvatar = (message: Message, index: number) => {
  //   const previousMessage = messages[index - 1];
  //   if (message.showAvatar && previousMessage.showAvatar) {
  //     dispatch(hideAvatar(index));
  //   }
  // }

  const defineWidgetHeight = () => {
    const minimalValue = 300;

    if (parameters && parameters.chatbotHeight) {
      const expectedHeight = parameters.chatbotHeight - 180;

      if (expectedHeight < minimalValue) {
        return minimalValue;
      }

      return expectedHeight;
    }

    return minimalValue;
  };

  return (
    <div
      style={{ height: defineWidgetHeight() }}
      id="messages"
      className="rcw-messages-container"
      ref={messageRef}
    >
      {messages?.map((message, index) => (
        <div className="rcw-message" key={`${index}-${format(message.timestamp, 'hh:mm')}`}>
          {profileAvatar && message.showAvatar && (
            <img src={profileAvatar} className="rcw-avatar" alt="profile" />
          )}
          {getComponentToRender(message)}
        </div>
      ))}
      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
