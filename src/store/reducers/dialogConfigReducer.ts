import { createReducer } from '../../utils/createReducer';
import { DialogConfigState, DialogActiveMessage } from '../types';

import {
  DialogConfigActions,
  SET_DIALOG_CONFIG,
  SET_DIALOG_ACTIVE_MESSAGE,
  SET_WIDGET_PARAMETERS
} from '../actions/types';

const initialState = {
  config: undefined,
  activeMessage: undefined,
  parameters: undefined
};

const dialogConfigReducer = {
  [SET_DIALOG_CONFIG]: (state: DialogConfigState, { config: { script, firstStepId } }) => ({
    ...state,
    config: {
      firstStepId,
      script
    }
  }),
  [SET_DIALOG_CONFIG]: (state: DialogConfigState, { config }) => ({
    ...state,
    config
  }),
  [SET_DIALOG_ACTIVE_MESSAGE]: (state: DialogConfigState, { message }) => ({
    ...state,
    activeMessage: message
  }),
  [SET_WIDGET_PARAMETERS]: (state: DialogConfigState, { parameters }) => ({
    ...state,
    parameters
  })
};

export default (state: DialogConfigState = initialState, action: DialogConfigActions) =>
  createReducer(dialogConfigReducer, state, action);
