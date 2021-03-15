import {
  LOCAL_STORAGE_KEY,
  SESSION_STORAGE_MESSAGES_KEY,
  SESSION_STORAGE_OPEN_STATUS_KEY,
} from "../constants";
import { getDataFromLocalStorage } from "./localStorage";

export function getDataFromSessionStorage(key: string) {
  const raw = sessionStorage.getItem(key);
  return raw ? JSON.parse(raw) : {};
}

function _mapMessagesWithDateFormatter(messages: any[]) {
  return messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
}

export function createPreloadedState() {
  const { dialogConfig, widgetParameters } = getDataFromLocalStorage(
    LOCAL_STORAGE_KEY
  );

  const { messages } = getDataFromSessionStorage(SESSION_STORAGE_MESSAGES_KEY);
  const { behavior } = getDataFromSessionStorage(
    SESSION_STORAGE_OPEN_STATUS_KEY
  );

  return {
    messages: {
      messages: messages
        ? _mapMessagesWithDateFormatter(messages.messages)
        : [],
      badgeCount: 0,
    },
    behavior,
    dialogConfig: {
      config: dialogConfig,
      parameters: widgetParameters,
    },
  };
}
