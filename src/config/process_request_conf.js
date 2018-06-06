//  create by lijiahao 2018-01-21
import {Message} from 'iview';
export const process_error = (error) => {
  let message = error.message;
  if (!!message) {
    let code = error.status;
    switch (code) {
      case 300:
        Message.error('登陆会话超时,请重新登录!');
        return window.location.href = '/';
      case 302:
        Message.error('CAS服务未登录,请重新登录!');
        return redirectUrl();
      case 504:
        Message.error('服务器未连接,请重新登录!');
        return window.location.href = '/';
      default:
        let msg = message || '请求异常';
        return Message.error(msg);
    }
  }
}

export const getAuthToken = () => {
  let token;
  return token = sessionStorage.getItem('token') || '';
}
export const checkAuth = () => {
  let token = sessionStorage.getItem('token');
  let authenticated;
  authenticated = !!token ? true : false;
}

export const redirectUrl = () => {
  let redirectUrl = `http://${window.location.hostname}/login?service=${window.location.origin}`;
  return window.location.href = redirectUrl;
}
