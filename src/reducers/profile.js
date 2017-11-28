// @flow

import * as types from '../constant/dictActions';

const GENERAL_LOADING_TIP = '数据加载中，请稍后 ...';

const initialState = {
  dslPath: '',
  gitPath: '',
  appPath: '',
  userDataPath: '',
  /* eslint-disable no-undef */
  height: document.documentElement.clientHeight,
  width: document.documentElement.clientWidth,
  gitBranch: '',
  dependencies: [],
  tuLingApiUrl: '',

  init: false,
  loading: false,
  loadingTip: GENERAL_LOADING_TIP,
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      const mergedState = {};
      Object.keys(state).forEach(item => {
        if (action.payload.profile && action.payload.profile[item] !== undefined) {
          mergedState[item] = action.payload.profile[item];
        }
      });
      return { ...state, ...mergedState };
    }
    case types.APP_INIT_END: {
      return { ...state, init: true };
    }
    case types.APP_LOADING_START:
      return {
        ...state,
        loading: true,
        loadingTip: action.payload || GENERAL_LOADING_TIP,
      };
    case types.APP_LOADING_END:
      return {
        ...state,
        loading: false,
        // loadingTip: GENERAL_LOADING_TIP,
      };
    case types.APP_RESIZE:
      return { ...state, ...action.payload };
    case types.APP_UPDATE_DSLPATH:
      return { ...state, dslPath: action.payload };
    case types.APP_UPDATE_GITPATH:
      return { ...state, gitPath: action.payload };
    case types.APP_GIT_MESSAGE:
      return {
        ...state,
        loadingTip: action.payload || GENERAL_LOADING_TIP,
      };
    default:
      return state;
  }
}
