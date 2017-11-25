import { queryAuthAppList, removeRule, queryOpenAuthList, queryRequiredAuthList } from '../services/api';

export default {
  namespace: 'authApp',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    tab1Data: {
      list: [],
      pagination: {},
    },
    tab2Data: {
      list: [],
      pagination: {},
    },
    loading: true,
    tab1Loading: true,
    tab2Loading: true,
    interfaceLoading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryAuthAppList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchTab1({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeTab1Loading',
        payload: true,
      });
      const response = yield call(queryOpenAuthList, payload);
      yield put({
        type: 'saveTab1',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeTab1Loading',
        payload: false,
      });
      if (callback) callback();
    },
    *fetchTab2({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeTab2Loading',
        payload: true,
      });
      const response = yield call(queryRequiredAuthList, payload);
      yield put({
        type: 'saveTab2',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeTab2Loading',
        payload: false,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveTab1(state, action) {
      return {
        ...state,
        tab1Data: action.payload,
      };
    },
    saveTab2(state, action) {
      return {
        ...state,
        tab2Data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeTab1Loading(state, action) {
      return {
        ...state,
        tab1Loading: action.payload,
      };
    },
    changeTab2Loading(state, action) {
      return {
        ...state,
        tab2Loading: action.payload,
      };
    },
  },
};
