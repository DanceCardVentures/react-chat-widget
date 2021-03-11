import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import dialogConfig from "./reducers/dialogConfigReducer";
import behavior from "./reducers/behaviorReducer";
import messages from "./reducers/messagesReducer";
import preview from "./reducers/fullscreenPreviewReducer";

import { TOGGLE_CHAT } from "src/store/actions/types";

import { SESSION_STORAGE_KEY } from "../constants";

import { createPreloadedState } from "../utils/store";

const reducer = combineReducers({
  dialogConfig,
  behavior,
  messages,
  preview,
});

const sessionStorageSync = (store) => (next) => (action) => {
  const { messages } = store.getState();

  sessionStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({
      messages,
    })
  );

  next(action);
};

const preserveBodyScroll = (store) => (next) => (action) => {
  if (action.type === TOGGLE_CHAT) {
    const { behavior } = store.getState();
    const bodyNode = document.getElementsByTagName("body")[0];

    if (window.innerWidth < 600) {
      if (!behavior.showChat) {
        bodyNode.style.overflow = "hidden";
      } else {
        bodyNode.style.overflow = "";
      }
    }
  }

  next(action);
};

function middlewaresCreator() {
  const logger = createLogger({});

  return [thunk, sessionStorageSync, preserveBodyScroll];
}

export default createStore(
  reducer,
  createPreloadedState(),
  applyMiddleware(...middlewaresCreator())
);
