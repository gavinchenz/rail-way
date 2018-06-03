## rail-way 铁路大数据中心应用系统

> A Vue.js project
>用Vue-cli+Webpack+Vuex+Express+Axios+Echarst+Swiper搭建前端view


#开发环境
"devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-import": "^1.7.0",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "node-notifier": "^5.1.2",
    "node-sass": "^4.9.0",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "sass-loader": "^7.0.1",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  }

#项目运行配置：

>1.项目命令窗口输入执行：npm install （cd到项目根目录，根据package.json文件安装项目开发及环境依赖）
>2.项目命令窗口输入执行：npm run dev （cd到项目根目录，开启项目开发状态）

#项目架构配置

>根目录下src文件：

>1.assets：静态文件夹，包含（font、images、style、script）四个子文件夹；

>2.axios：异步获取后台数据，包含index.js文件，具体使用方法见index.js文件；

>3.components:组件文件夹，存放项目中所有需要应用的组件，该文件夹的子文件夹除了公共组件（Common文件夹）外，均必须根据页面级组件的组件名（name）来命名该子文件夹名；

>4.router:vue-router路由配置文件

>5.view:页面级组件文件夹，存放所有需要引入的页面级根组件，由vue-router配置路由，在App.vue中引用；

>6.vuex:项目中央存储仓库；

>7.App.vue：项目根组件，轻易不要修改

>8.main.js：入口文件，按需引入所需要的模块

##项目命名规范

>1.文件夹命名：采用大驼峰命名规则（Pascal命名）；

>2.组件（模板）命名：采用大驼峰命名规则（Pascal命名）；

>3.路由命名：采用大驼峰命名规则（Pascal命名）；

>4.class命名：采用串式命名（kebab），多个单词之前用短横杠连接，如：user-header；

>5.id命名：采用小驼峰命名（Camel），单个单词、多单词的首个单词小写，多单词自首个单词后的单词首字母大写，如:app、userName；

>6.js命名：采用小驼峰命名（Camel），单个单词、多单词的首个单词小写，多单词自首个单词后的单词首字母大写，如:index.js、userLogin.js；

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
