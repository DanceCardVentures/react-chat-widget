import React from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";

import { openFullscreenPreview } from "@actions";

import { GlobalState, Message as MessageType } from "src/store/types";

import { renderPlayIcon } from "../../../../../../../../utils/iconRenderers";

import "./styles.scss";

type Props = {
  message: MessageType;
  showTimeStamp: boolean;
};

function Message({ message, showTimeStamp }: Props) {
  const { parameters } = useSelector((state: GlobalState) => ({
    parameters: state.dialogConfig.parameters,
  }));

  const dispatch = useDispatch();

  const messageBackground =
    message.sender === "response"
      ? parameters?.robotBackgroundColor
      : parameters?.userBackgroundColor;
  const messageTextColor =
    message.sender === "response"
      ? parameters?.robotTextColor
      : parameters?.userTextColor;

  const textStyles = {
    color: messageTextColor,
    fontSize: parameters?.fontSize,
  };

  const renderText = () => <span style={textStyles}>{message.text}</span>;

  return (
    <div className={`rcw-${message.sender}`}>
      <div
        style={{ background: messageBackground }}
        className="rcw-message-text"
      >
        {message.wistiaMatcher ? (
          <button
            className="rcw-video-message-button"
            onClick={() => {
              const obj = {
                videoMatcher: message.wistiaMatcher,
                alt: "Video message",
                width: 720,
                height: 480,
              };

              dispatch(openFullscreenPreview(obj));
            }}
          >
            {renderPlayIcon(messageTextColor)}
            {renderText()}
          </button>
        ) : (
          renderText()
        )}
      </div>

      {/* {showTimeStamp && (
        <span className="rcw-timestamp">
          {format(message.timestamp, "hh:mm")}
        </span>
      )} */}
    </div>
  );
}

export default Message;
