import dva from 'dva';
import 'moment/locale/zh-cn';
import { routerRedux } from 'dva/router';
import './polyfill';
import './g2';
// import { browserHistory } from 'dva/router';
import './index.less';

// 1. Initialize
const app = dva({
  // history: browserHistory,
  onError(e, dispatch) {
    // 处理未登录的error
    if (e.response && e.response.status === 401) {
      dispatch(routerRedux.push('/user/login'));
    }
  },

});

// 2. Plugins
// app.use({});

// 3. Register global model
app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
