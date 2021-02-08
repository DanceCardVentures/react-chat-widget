import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DialogConfig, GlobalState } from "../../store/types";

import {
  toggleChat,
  addUserMessage,
  setDialogConfig,
  setWidgetParameters,
  setDialogActiveMessage,
  addResponseMessage,
} from "../../store/actions";
import { AnyFunction } from "../../utils/types";

import WidgetLayout from "./layout";

/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
* */

const integrationId = "1d20328f-b6ef-4ead-a535-90c7e912f725";

const URLS = {
  dialogScript: `https://cs-back-dev.dancecardrx.com/media/chatbot/chatbot-${integrationId}.json`,
  widgetLook: `https://cs-back-dev.dancecardrx.com/media/chatbot/chatbot-widget-parameters-${integrationId}.json`,
};

function fetchData(url: string) {
  return fetch(url).then((response) => response.json());
}

/* - - - - - - - - - - - - - - - - - - - */

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  senderPlaceHolder: string;
  profileAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  handleSubmit?: AnyFunction;
};

function Widget(props: Props) {
  const { parameters } = useSelector((state: GlobalState) => ({
    parameters: state.dialogConfig.parameters,
  }));

  const {
    handleQuickButtonClicked,
    handleSubmit,
    handleNewUserMessage,
    handleTextInputChange,
  } = props;

  const dispatch = useDispatch();

  /* - - - - - - - - - - - - - - - - - - - */

  function fetchWidgetData() {
    const fetchDialogScript = fetchData(URLS.dialogScript);
    const fetchWidgetLookConfig = fetchData(URLS.widgetLook);

    Promise.all([fetchDialogScript, fetchWidgetLookConfig]).then(
      ([script, { widgetParameters }]) => {
        const dialogConfig = script as DialogConfig;
        const firstStep = dialogConfig.script[dialogConfig.firstStepId];

        dispatch(setDialogConfig(dialogConfig));
        dispatch(setWidgetParameters(widgetParameters));
        dispatch(setDialogActiveMessage(firstStep));
        dispatch(addResponseMessage(firstStep.message));
      }
    );
  }

  useEffect(() => {
    fetchWidgetData();
  }, []);

  useEffect(() => {
    if (parameters && parameters.autoopenChatbot) {
      dispatch(toggleChat());
    }
  }, [parameters]);

  /* - - - - - - - - - - - - - - - - - - - */

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;

    if (!userInput.trim()) {
      return;
    }

    handleSubmit?.(userInput);
    dispatch(addUserMessage(userInput));
    handleNewUserMessage(userInput);
    event.target.message.value = "";
  };

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value);
  };

  return (
    <WidgetLayout
      onToggleConversation={() => dispatch(toggleChat())}
      onSendMessage={handleMessageSubmit}
      onQuickButtonClicked={onQuickButtonClicked}
      onTextInputChange={handleTextInputChange}
      {...props}
    />
  );
}

export default Widget;
