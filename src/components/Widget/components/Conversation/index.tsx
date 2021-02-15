import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { motion } from "framer-motion";

import { DialogQuickResponse, GlobalState } from "src/store/types";

import {
  addUserMessage,
  addResponseMessage,
  setDialogActiveMessage,
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
}: Props) {
  const { dialogConfig, activeMessage, parameters } = useSelector(
    (state: GlobalState) => ({
      dialogConfig: state.dialogConfig.config,
      activeMessage: state.dialogConfig.activeMessage,
      parameters: state.dialogConfig.parameters,
    })
  );

  const dispatch = useDispatch();

  const [responsesActiveBlob, setResponsesActiveBlob] = useState(0);

  /* - - - - - - - - - - - - - - - - - - - */

  const handleQuickResponseClick = (response: DialogQuickResponse) => {
    const nextActiveStep = dialogConfig?.script[response.value];

    dispatch(addUserMessage(response.label));
    dispatch(
      addResponseMessage({
        text: nextActiveStep.message,
        wistiaMatcher: nextActiveStep.wistiaMatcher,
      })
    );
    dispatch(setDialogActiveMessage(nextActiveStep));

    setResponsesActiveBlob(0);
  };

  const renderResponseItem = (res: DialogQuickResponse) => {
    const variants = {
      open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 500, velocity: -100 },
        },
      },
      closed: {
        y: 15,
        opacity: 0,
        transition: {
          y: { stiffness: 500 },
        },
      },
    };

    return (
      <motion.li
        key={`${res.value}-${res.label.concat("")}`}
        variants={variants}
      >
        <div
          className="rcw-quick-response-button"
          style={{
            background: parameters?.chatOptionButtonBackgroundColor,
            color: parameters?.chatOptionButtonTextColor,
          }}
          onClick={() => handleQuickResponseClick(res)}
        >
          {res.label}
        </div>
      </motion.li>
    );
  };

  /* - - - - - - - - - - - - - - - - - - - */

  const renderResponses = () => {
    if (!activeMessage) {
      return;
    }

    const len = activeMessage.quickResponses.length;
    const responsesPerBlob = 4;

    const blobs = activeMessage.quickResponses.reduce(
      (blobs: Array<Array<DialogQuickResponse>>, response) => {
        const lastBlobIndex = blobs.length - 1;
        const lastBlob = blobs[lastBlobIndex];

        if (!lastBlob) {
          return [[response]];
        }

        return lastBlob.length === responsesPerBlob
          ? [...blobs, [response]]
          : blobs.map((blob, i) =>
              i === lastBlobIndex ? [...blob, response] : blob
            );
      },
      []
    );

    const animationVariants = {
      open: {
        opacity: 1,
        visibility: "visible",
        transition: { staggerChildren: 0.07, delayChildren: 0.15 },
      },
      closed: {
        opacity: 0,
        visibility: "hidden",
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
      },
    };

    const renderBlobs = () =>
      blobs.map((blob, i) => (
        <motion.div
          animate={i === responsesActiveBlob ? "open" : "closed"}
          // @ts-ignore
          variants={animationVariants}
          initial={{ opacity: i === responsesActiveBlob ? 1 : 0 }}
          className="rcw-responses-animated-container rcw-responses-additional-paddings"
          key={i}
        >
          {blob.map(renderResponseItem)}
        </motion.div>
      ));

    switch (len) {
      case 0:
        return "No responses";
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <div className="rcw-responses-animated-container">
            {activeMessage.quickResponses.map(renderResponseItem)}
          </div>
        );
      default:
        return (
          <>
            <div className="rcw-responses-nav-container">
              <button
                disabled={responsesActiveBlob === 0}
                onClick={() => setResponsesActiveBlob((counter) => counter - 1)}
              >
                ↑
              </button>
              <button
                disabled={blobs.length === responsesActiveBlob + 1}
                onClick={() => setResponsesActiveBlob((counter) => counter + 1)}
              >
                ↓
              </button>
            </div>
            {renderBlobs()}
          </>
        );
    }
  };

  /* - - - - - - - - - - - - - - - - - - - */

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
      <Messages profileAvatar={profileAvatar} showTimeStamp={false} />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />

      <ul className="rcw-responses-carousel">{renderResponses()}</ul>
    </div>
  );
}

export default Conversation;
