import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '系统概况',
            path: 'analysis',
            component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
          },
        ],
      },
      {
        name: '服务',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: '服务列表',
            path: 'table-list',
            component: dynamicWrapper(app, ['server'], () => import('../routes/Server/ServerList')),
          },
        ],
      },
      {
        name: '基础设施',
        path: 'basic',
        icon: 'table',
        children: [
          {
            name: '数据库',
            path: 'database',
            component: dynamicWrapper(app, ['database'], () => import('../routes/Basic/DatabaseList')),
          },
          {
            name: 'Redis',
            path: 'redis',
            component: dynamicWrapper(app, ['redis'], () => import('../routes/Basic/RedisList')),
          },
          {
            name: 'MQ',
            path: 'mq',
            component: dynamicWrapper(app, ['mq'], () => import('../routes/Basic/MqList')),
          },
        ],
      },
      {
        name: '权限管理',
        path: 'auth',
        icon: 'table',
        children: [
          {
            name: '应用权限管理',
            path: 'authApp',
            component: dynamicWrapper(app, ['authApp'], () => import('../routes/Auth/AuthApp')),
          },
        ],
      },
      {
        name: '设备管理',
        path: 'equipment',
        icon: 'table',
        children: [
          {
            name: '设备列表',
            path: 'equipmentList',
            component: dynamicWrapper(app, ['equipmentList'], () => import('../routes/Equipment/EquipmentList')),
          },
        ],
      },
      {
        name: '日志管理',
        path: 'log',
        icon: 'table',
        children: [
          {
            name: '日志列表',
            path: 'logList',
            component: dynamicWrapper(app, ['logList'], () => import('../routes/Log/LogList')),
          },
        ],
      },
    ],
  },
];

// nav Login data
export const getNavLoginData = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
];
