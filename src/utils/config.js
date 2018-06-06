/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */

let baseUrl = '';
let routerMode = 'history';
let headerConfig = {
  contentType:'application/x-www-form-urlencoded'
};

if (process.env.NODE_ENV == 'development') {
    //  baseUrl = 'http://localhost:8003/api';  // 本地 Mock URL
    // baseUrl = 'http://192.168.1.153:8889/api';  // Back End API interface
} else if (process.env.NODE_ENV == 'production') {
    // baseUrl = 'http://jiusuo.com';
}

export {
    baseUrl,
    routerMode,
    headerConfig
}