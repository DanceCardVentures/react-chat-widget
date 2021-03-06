import { createReducer } from "../../utils/createReducer";
import { BehaviorState } from "../types";

import {
  BehaviorActions,
  TOGGLE_CHAT,
  TOGGLE_INPUT_DISABLED,
  TOGGLE_MESSAGE_LOADER,
  SHOW_PHONE_NUMBER,
  TOGGLE_SHOW_EMAIL_REQUEST_POPUP,
} from "../actions/types";

const initialState = {
  showChat: false,
  disabledInput: false,
  messageLoader: false,
  showEmailRequestPopup: true,
  phoneNumberIsVisible: false,
};

const behaviorReducer = {
  [TOGGLE_CHAT]: (state: BehaviorState) => ({
    ...state,
    showChat: !state.showChat,
  }),

  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) => ({
    ...state,
    disabledInput: !state.disabledInput,
  }),

  [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState) => ({
    ...state,
    messageLoader: !state.messageLoader,
  }),

  [SHOW_PHONE_NUMBER]: (state: BehaviorState) => ({
    ...state,
    phoneNumberIsVisible: true,
  }),

  [TOGGLE_SHOW_EMAIL_REQUEST_POPUP]: (state: BehaviorState) => ({
    ...state,
    showEmailRequestPopup: !state.showEmailRequestPopup,
  }),
};

export default (state: BehaviorState = initialState, action: BehaviorActions) =>
  createReducer(behaviorReducer, state, action);
