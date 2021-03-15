import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DialogConfig, WidgetParameters, GlobalState } from "../../store/types";

import {
  toggleChat,
  addUserMessage,
  setDialogConfig,
  setWidgetParameters,
  setDialogActiveMessage,
  addResponseMessage,
  showPhoneNumber,
} from "../../store/actions";
import { AnyFunction } from "../../utils/types";
import { makeLocalStorageSync } from "../../utils/localStorage";

import isEmpty from "lodash/isEmpty";

import { LOCAL_STORAGE_KEY } from "../../constants";

import WidgetLayout from "./layout";

/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
* */

type WidgetData = {
  widgetParameters: WidgetParameters;
  dialogConfig: DialogConfig;
};

const integrationId = "7fa68be8-6a53-447b-b8f5-3af6d02d7cec";
// const integrationId = window.DANCECARD_LEAD_NURTURING_CHATBOT_INTEGRATION_ID;

const URLS = {
  dialogScript: `https://cs-back-dev.dancecardrx.com/media/chatbot/chatbot-${integrationId}.json`,
  widgetLook: `https://cs-back-dev.dancecardrx.com/media/chatbot/chatbot-widget-parameters-${integrationId}.json`,
};

function fetchData(url: string) {
  return fetch(url).then((response) => response.json());
}

function applyCSS(css: string) {
  const element = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(element);
  element.innerHTML = decodeURI(css); 
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
  const { parameters, showChat, messages } = useSelector(
    (state: GlobalState) => ({
      parameters: state.dialogConfig.parameters,
      showChat: state.behavior.showChat,
      messages: state.messages.messages,
    })
  );

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

        makeLocalStorageSync<WidgetData>({
          dataToSync: {
            dialogConfig,
            widgetParameters,
          },
          key: LOCAL_STORAGE_KEY,
        });

        dispatch(setDialogConfig(dialogConfig));
        dispatch(setWidgetParameters(widgetParameters));

        dispatch(setDialogActiveMessage(firstStep));

        if (isEmpty(messages)) {
          dispatch(
            addResponseMessage({
              text: firstStep.message,
              wistiaMatcher: firstStep.wistiaMatcher,
            })
          );
        }

        if (widgetParameters.css) {
          applyCSS(widgetParameters.css)
        }

        const { phoneNumberParameters } = script;

        if (phoneNumberParameters && phoneNumberParameters.delayInSeconds) {
          setTimeout(() => {
            dispatch(showPhoneNumber());
          }, phoneNumberParameters.delayInSeconds * 1000);
        }
      }
    );
  }

  useEffect(() => {
    fetchWidgetData();
  }, []);

  useEffect(() => {
    if (parameters && parameters.autoopenChatbot) {
      if (!showChat) {
        dispatch(toggleChat());
      }
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
