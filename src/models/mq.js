import { queryMqList, delMq, queryQueuesList, queryExchangesList, queryChannelsList } from '../services/api';

export default {
  namespace: 'mq',

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
    *fetch({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryMqList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *fetchQueues({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryQueuesList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *fetchExchanges({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryExchangesList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *fetchChannels({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryChannelsList, payload);
      yield put({
        type: 'save',
        payload: response.result === '1' ? response.data : null,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *deleteMq({ payload }, { call, put }) {
      const response = yield call(delMq, payload);
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
