import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import dialogConfig from "./reducers/dialogConfigReducer";
import behavior from "./reducers/behaviorReducer";
import messages from "./reducers/messagesReducer";
import quickButtons from "./reducers/quickButtonsReducer";
import preview from "./reducers/fullscreenPreviewReducer";

import { createPreloadedState } from "../utils/store";

const reducer = combineReducers({
  dialogConfig,
  behavior,
  messages,
  quickButtons,
  preview,
});

function middlewaresCreator() {
  const logger = createLogger({});

  return [logger];
}

export default createStore(
  reducer,
  createPreloadedState()
  // applyMiddleware(...middlewaresCreator())
);
