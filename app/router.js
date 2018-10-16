'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/user', controller.user.userInfo);
  router.post('/api/admin/login', controller.admin.login);
  router.get('*', controller.home.index); //配置vue页面
};
