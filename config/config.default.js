'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535608252642_8210';

  // add your config here
  config.middleware = [];

  //配置ejs模板引擎，使用.html文件
  config.view = {
    mapping: {'.html': 'ejs'} 
  };
  
  //设置监听端口
  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: '0.0.0.0',
    }
  };

  //跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8088', 'http://192.168.0.118:8088', 'http://47.100.51.191'], //白名单
  };
  
  config.cors = {
    // origin: '*', //允许所有跨域访问，关闭则允许白名单访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  
  //配置数据库
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'Bucong0934',
      database: 'egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
