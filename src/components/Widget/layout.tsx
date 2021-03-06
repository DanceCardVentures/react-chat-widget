import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";

import { GlobalState } from "src/store/types";
import { AnyFunction } from "src/utils/types";
import { openFullscreenPreview } from "@actions";

import Conversation from "./components/Conversation";
import Launcher from "./components/Launcher";
import FullScreenPreview from "./components/FullScreenPreview";

import "./style.scss";

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  onSendMessage: AnyFunction;
  onToggleConversation: AnyFunction;
  senderPlaceHolder: string;
  onQuickButtonClicked: AnyFunction;
  profileAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  onTextInputChange?: (event: any) => void;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
};

function WidgetLayout({
  onSendMessage,
  onToggleConversation,
  onQuickButtonClicked,
  fullScreenMode,
  customLauncher,
  onTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  imagePreview,
  zoomStep,
  ...props
}: Props) {
  const dispatch = useDispatch();

  const { dissableInput, showChat, visible, parameters } = useSelector(
    (state: GlobalState) => ({
      showChat: state.behavior.showChat,
      dissableInput: state.behavior.disabledInput,
      visible: state.preview.visible,
      parameters: state.dialogConfig.parameters,
    })
  );

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showChat) {
      messageRef.current = document.getElementById(
        "messages"
      ) as HTMLDivElement;
    }
    return () => {
      messageRef.current = null;
    };
  }, [showChat]);

  const eventHandle = (evt) => {
    if (evt.target && evt.target.className === "rcw-message-img") {
      const {
        src,
        alt,
        naturalWidth,
        naturalHeight,
      } = evt.target as HTMLImageElement;
      const obj = {
        src,
        alt,
        width: naturalWidth,
        height: naturalHeight,
      };
      dispatch(openFullscreenPreview(obj));
    }
  };

  /**
   * Previewer needs to prevent body scroll behavior when fullScreenMode is true
   */
  useEffect(() => {
    const target = messageRef?.current;
    if (imagePreview && showChat) {
      target?.addEventListener("click", eventHandle, false);
    }

    return () => {
      target?.removeEventListener("click", eventHandle);
    };
  }, [imagePreview, showChat]);

  useEffect(() => {
    document.body.setAttribute(
      "style",
      `overflow: ${visible || fullScreenMode ? "hidden" : "auto"}`
    );
  }, [fullScreenMode, visible]);

  return (
    <div
      style={window.innerWidth > 600 ? { width: parameters?.chatbotWidth } : {}}
      className={cn("rcw-widget-container", {
        "rcw-full-screen": fullScreenMode,
        "rcw-previewer": imagePreview,
      })}
    >
      {showChat && (
        <Conversation
          sendMessage={onSendMessage}
          toggleChat={onToggleConversation}
          disabledInput={dissableInput}
          className={showChat ? "active" : "hidden"}
          onQuickButtonClicked={onQuickButtonClicked}
          onTextInputChange={onTextInputChange}
          {...props}
        />
      )}

      {customLauncher
        ? customLauncher(onToggleConversation)
        : !fullScreenMode && (
            <Launcher
              toggle={onToggleConversation}
              chatId={chatId}
              openLabel={launcherOpenLabel}
              closeLabel={launcherCloseLabel}
            />
          )}
      <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />
    </div>
  );
}

export default WidgetLayout;
