// @flow
import _object from 'lodash/object';
import * as types from '../constant/dictActions';

const DEFAULT_TAB_KEY = 'tab0';

const initialState = {
  menu: DEFAULT_TAB_KEY,
  tabs: {
    [DEFAULT_TAB_KEY]: { path: '/' },
  },
  currentTab: DEFAULT_TAB_KEY,
  tabIndex: 1,
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case types.LOCATION_CHANGE: {
      return {
        ...state,
        menu: action.payload.pathname,
        tabs: {
          ...state.tabs,
          [state.currentTab]: { path: action.payload.pathname },
        },
      };
    }
    case types.TAB_NEW: {
      const { tabs, tabIndex } = state;
      const tabKey = 'tab' + tabIndex;
      return {
        ...state,
        menu: action.payload,
        tabs: { ...tabs, [tabKey]: { path: action.payload } },
        currentTab: tabKey,
        tabIndex: tabIndex + 1,
      };
    }
    case types.TAB_CHANGE: {
      return {
        ...state,
        menu: state.tabs[action.payload].path,
        currentTab: action.payload,
      };
    }
    case types.TAB_UPDATE: {
      return {
        ...state,
        menu: action.payload,
        tabs: {
          ...state.tabs,
          [state.currentTab]: { path: action.payload },
        },
      };
    }
    case types.TAB_REMOVE: {
      const finalTabs = _object.omit(state.tabs, action.payload);
      if (state.currentTab === action.payload) {
        const finalTab = _object.findLastKey(finalTabs);
        return {
          ...state,
          menu: finalTabs[finalTab].path,
          tabs: finalTabs,
          currentTab: finalTab,
        };
      }
      return {
        ...state,
        tabs: finalTabs
      };
    }
    default:
      return state;
  }
}

