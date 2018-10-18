'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); //首页
  //前端页面
  router.get('/api/user/login', controller.user.userLogin);
  router.get('/api/commodity/list', controller.commodity.list);
  router.get('/api/commodity/info', controller.commodity.info);
  router.post('/api/commodity/add', controller.commodity.add);
  //后台管理
  router.post('/api/admin/login', controller.admin.login);

  router.get('*', controller.home.index); //配置vue页面
};
