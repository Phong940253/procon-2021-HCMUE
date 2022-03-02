import { combineReducers } from 'redux';

const state = {
  token: null,
  host: null,
};

const initialState = {
  state,
};

export const CHANGE_STATE = 'CHANGE_STATE';

export const change_state = state => ({
  type: CHANGE_STATE,
  info: state,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE:
      return { ...state, state: action.info };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  general: reducer,
});
