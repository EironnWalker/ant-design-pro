import { queryServerList, removeRule, querySreverInterface } from '../services/api';

export default {
  namespace: 'server',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    interfaceData: {
      list: [],
    },
    loading: true,
    interfaceLoading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryServerList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchDetail({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeDetailLoading',
        payload: true,
      });
      const response = yield call(querySreverInterface, payload);
      yield put({
        type: 'saveInterface',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeDetailLoading',
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
    saveInterface(state, action) {
      return {
        ...state,
        interfaceData: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeDetailLoading(state, action) {
      return {
        ...state,
        interfaceLoading: action.payload,
      };
    },
  },
};
