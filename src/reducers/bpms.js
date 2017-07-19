// @flow

import * as types from '../constant/dictActions';

const initialState = [];

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      if (action.payload.bpms) {
        return [...action.payload.bpms];
      }
      return state;
    }
    case types.BPM_UPDATE: {
      if (action.payload) {
        return action.payload.concat();
      }
      return state;
    }
    default:
      return state;
  }
}

