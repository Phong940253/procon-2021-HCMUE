import { combineReducers } from 'redux';

const state = {
  token: null,
  host: null,
};

const image = {
  row: 0,
  col: 0,
  maxSelection: 0,
  selectCost: 0,
  swapCost: 0,
  imgW: 0,
  imgH: 0,
  maxPixelValue: 0,
  imageSrc: '',
};

const initialState = {
  state,
};

const initialImageState = {
  image,
};

export const CHANGE_STATE = 'CHANGE_STATE';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';

export const change_state = state => ({
  type: CHANGE_STATE,
  info: state,
});

export const change_image = image => ({
  type: CHANGE_IMAGE,
  info: image,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE:
      return { ...state, state: action.info };
    default:
      return state;
  }
};

export const imageReducer = (state = initialImageState, action) => {
  switch (action.type) {
    case CHANGE_IMAGE:
      return { ...state, image: action.info };
    default:
      return state;
  }
};
export const reducers = combineReducers({
  general: reducer,
  image: imageReducer,
});
