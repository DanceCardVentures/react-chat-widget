import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { motion } from "framer-motion";

import { DialogQuickResponse, GlobalState } from "src/store/types";

import {
  addUserMessage,
  addResponseMessage,
  setDialogActiveMessage
} from "../../../../store/actions";

import Header from "./components/Header";
import Messages from "./components/Messages";
import QuickButtons from "./components/QuickButtons";
import Testimonials from "./components/Testimonials";

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

  const responsesContainerRef = useRef<any>(null);

  // useEffect(() => {
  //   document.addEventListener("click", event => {
  //     if (responsesContainerRef && responsesContainerRef.current) {
  //       const withinBoundaries = event
  //         .composedPath()
  //         .includes((responsesContainerRef.current as unknown) as EventTarget);
  //       console.log("withinBoundaries: ", withinBoundaries);
  //     }
  //   });
  // }, []);

  const dispatch = useDispatch();

  const [responsesListIsVisible, setResponsesListVisibility] = useState(false);

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
      <Testimonials />
      <Messages profileAvatar={profileAvatar} showTimeStamp={showTimeStamp} />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />

      <motion.ul
        ref={responsesContainerRef}
        className="rcw-responses-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: responsesListIsVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: responsesListIsVisible ? 0.15 : 0 }}
      >
        {activeMessage?.quickResponses.map(res => {
          return (
            <li key={`${res.value}-${res.label.concat("")}`}>
              <div
                className="rcw-quick-response-button"
                style={{
                  background: parameters?.chatOptionButtonBackgroundColor,
                  color: parameters?.chatOptionButtonTextColor
                }}
                onClick={() => {
                  handleQuickResponseClick(res);
                  setResponsesListVisibility(false);
                }}
              >
                {res.label}
              </div>
            </li>
          );
        })}
      </motion.ul>

      <ul className="rcw-quick-responses-list">
        {activeMessage?.quickResponses.length === 1 ? (
          <div
            className="rcw-quick-response-button"
            style={{
              background: parameters?.chatOptionButtonBackgroundColor,
              color: parameters?.chatOptionButtonTextColor
            }}
            onClick={() => {
              handleQuickResponseClick(activeMessage?.quickResponses[0]);
              setResponsesListVisibility(false);
            }}
          >
            {activeMessage?.quickResponses[0].label}
          </div>
        ) : (
          <button
            className="rcw-more-replies-button"
            onClick={() => setResponsesListVisibility(flag => !flag)}
          >
            {responsesListIsVisible ? "Dismiss" : "More replies"}
          </button>
        )}
      </ul>
    </div>
  );
}

export default Conversation;
