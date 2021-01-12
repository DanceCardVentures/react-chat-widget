import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { DialogQuickResponse, GlobalState } from "src/store/types";

import {
  addUserMessage,
  addResponseMessage,
  setDialogActiveMessage
} from "../../../../store/actions";

import Header from "./components/Header";
import Messages from "./components/Messages";
import QuickButtons from "./components/QuickButtons";

import { AnyFunction } from "../../../../utils/types";

import "./style.scss";

type Props = {
  title: string;
  subtitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  disabledInput: boolean;
  autofocus: boolean;
  className: string;
  sendMessage: AnyFunction;
  toggleChat: AnyFunction;
  profileAvatar?: string;
  titleAvatar?: string;
  onQuickButtonClicked?: AnyFunction;
  onTextInputChange?: (event: any) => void;
  sendButtonAlt: string;
  showTimeStamp: boolean;
};

function Conversation({
  showCloseButton,
  className,
  toggleChat,
  profileAvatar,
  titleAvatar,
  onQuickButtonClicked,
  showTimeStamp
}: Props) {
  const { dialogConfig, activeMessage, parameters } = useSelector(
    (state: GlobalState) => ({
      dialogConfig: state.dialogConfig.config,
      activeMessage: state.dialogConfig.activeMessage,
      parameters: state.dialogConfig.parameters
    })
  );

  const dispatch = useDispatch();

  /* - - - - - - - - - - - - - - - - - - - */

  const handleQuickResponseClick = (response: DialogQuickResponse) => {
    const nextActiveStep = dialogConfig?.script[response.value];

    dispatch(addUserMessage(response.label));
    dispatch(addResponseMessage(nextActiveStep.message));
    dispatch(setDialogActiveMessage(nextActiveStep));
  };

  return (
    <div
      className={cn("rcw-conversation-container", className)}
      aria-live="polite"
    >
      <Header
        title={parameters ? parameters.title : ""}
        subtitle={parameters ? parameters.subTitle : ""}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
      />
      <Messages profileAvatar={profileAvatar} showTimeStamp={showTimeStamp} />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />

      <ul className="quick-responses-list">
        {activeMessage?.quickResponses.map(res => {
          return (
            <li key={res.value}>
              <div
                className="quick-response-button"
                style={{
                  background: parameters?.chatOptionButtonBackgroundColor,
                  color: parameters?.chatOptionButtonTextColor
                }}
                onClick={() => handleQuickResponseClick(res)}
              >
                {res.label}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Conversation;
