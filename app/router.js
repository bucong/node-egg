'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/commodity/list', controller.commodity.list);
  router.get('/api/user/login', controller.user.userLogin);
  router.post('/api/admin/login', controller.admin.login);
  router.get('*', controller.home.index); //配置vue页面
};
