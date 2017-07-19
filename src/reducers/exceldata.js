/**
 * Created by jkwu on 17-7-4.
 */
import * as types from '../constant/dictActions';

const initialState = [];

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.APP_INIT: {
      if (action.payload.exceldata) {
        return [...state, ...action.payload.exceldata];
      }
      return state;
    }
    case types.EXCEL_ADD: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
