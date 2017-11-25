import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryServerList(params) {
  return request(`/api/serverList?${stringify(params)}`);
}

export async function queryAuthAppList(params) {
  return request(`/api/authAppList?${stringify(params)}`);
}

export async function queryDbList(params) {
  return request(`/api/databaseList?${stringify(params)}`);
}

export async function changeDatabaseStatus(params) {
  return request(`/api/changeDatabaseStatus?${stringify(params)}`);
}

export async function queryRedisList(params) {
  return request(`/api/redisList?${stringify(params)}`);
}

export async function changeRedisStatus(params) {
  return request(`/api/changeRedisStatus?${stringify(params)}`);
}

export async function queryMqList(params) {
  return request(`/api/mqList?${stringify(params)}`);
}

export async function delMq(params) {
  return request(`/api/delMq?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function querySreverInterface(params) {
  return request('/api/serverDetail', {
    method: 'GET',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryOpenAuthList(params) {
  return request('/api/openAuthList', {
    method: 'GET',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryRequiredAuthList(params) {
  return request('/api/requiredAuthList', {
    method: 'GET',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function getSysInfo() {
  return request('/api/sysInfo');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function accountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeMobileLogin(params) {
  return request('/api/login/mobile', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
