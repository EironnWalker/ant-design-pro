import { queryDbList, changeDatabaseStatus } from '../services/api';

export default {
  namespace: 'database',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
    operationDone: false,
    operationData: null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryDbList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *changeDbStatus({ payload }, { call, put }) {
      const response = yield call(changeDatabaseStatus, payload);
      yield put({
        type: 'changeStatus',
        payload: response,
      });
    },
    *resetOperation({ payload2 }, { put }) {
      yield put({
        type: 'resetStatus',
        payload: payload2,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeStatus(state, action) {
      return {
        ...state,
        operationDone: true,
        operationData: action.payload,
      };
    },
    resetStatus(state) {
      return {
        ...state,
        operationDone: false,
        operationData: null,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
