import React from "react";
import { Provider } from "react-redux";

import Widget from "./components/Widget";

import store from "./store";

import { AnyFunction } from "./utils/types";

type Props = {
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  title?: string;
  titleAvatar?: string;
  subtitle?: string;
  senderPlaceHolder?: string;
  showCloseButton?: boolean;
  fullScreenMode?: boolean;
  autofocus?: boolean;
  profileAvatar?: string;
  launcher?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId?: string;
  launcherOpenLabel?: string;
  launcherCloseLabel?: string;
  sendButtonAlt?: string;
  showTimeStamp?: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  handleSubmit?: AnyFunction;
} & typeof defaultProps;

function ConnectedWidget(props: Props) {
  return (
    <Provider store={store}>
      <Widget {...props} />
    </Provider>
  );
}

const defaultProps = {
  title: "Welcome",
  subtitle: "This is your chat subtitle",
  senderPlaceHolder: "Type a message...",
  showCloseButton: true,
  fullScreenMode: false,
  autofocus: true,
  chatId: "rcw-chat-container",
  launcherOpenLabel: "Open chat",
  launcherCloseLabel: "Close chat",
  sendButtonAlt: "Send",
  showTimeStamp: true,
  imagePreview: false,
  zoomStep: 80,
};
ConnectedWidget.defaultProps = defaultProps;

export default ConnectedWidget;
