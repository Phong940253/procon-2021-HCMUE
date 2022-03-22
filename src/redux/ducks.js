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
  width: 0,
  height: 0,
  maxPixelValue: 0,
  imageSrc: '',
};

const initialState = {
  state,
};

const initialImageState = {
  image,
};

const initialDataImageState = {
  dataImage: [],
};

export const CHANGE_STATE = 'CHANGE_STATE';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const CHANGE_DATA_IMAGE = 'CHANGE_DATA_IMAGE';

export const change_state = state => ({
  type: CHANGE_STATE,
  info: state,
});

export const change_image = image => ({
  type: CHANGE_IMAGE,
  info: image,
});

export const change_data_image = dataImage => ({
  type: CHANGE_DATA_IMAGE,
  info: dataImage,
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

export const dataImageReducer = (state = initialDataImageState, action) => {
  switch (action.type) {
    case CHANGE_DATA_IMAGE:
      return { ...state, dataImage: action.info };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  general: reducer,
  image: imageReducer,
  dataImage: dataImageReducer,
});
