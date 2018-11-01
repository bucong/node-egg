'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); //首页
  //上传图片
  router.post('/api/upload/img', controller.home.uploadImg);
  //前端页面
  router.get('/api/user/login', controller.user.userLogin);
  //菜品信息
  router.post('/api/commodity/add', controller.commodity.add);
  router.get('/api/commodity/list', controller.commodity.list);
  router.get('/api/commodity/info', controller.commodity.info);
  router.get('/api/commodity/evaluate', controller.commodity.evaluate);
  router.post('/api/commodity/update', controller.commodity.update);
  router.get('/api/commodity/delete', controller.commodity.delete);
  //订单
  router.get('/api/order/list', controller.order.list);
  router.post('/api/order/add', controller.order.add);
  router.get('/api/order/userOrder', controller.order.userOrder);
  router.get('/api/order/orderItem', controller.order.orderItem);
  router.get('/api/order/accept', controller.order.accept);
  router.get('/api/order/cancel', controller.order.cancel);
  router.get('/api/order/finish', controller.order.finish);
  //评论
  router.post('/api/commodity/evaluateSub', controller.commodity.evaluateSub);
  //后台登录
  router.post('/api/admin/login', controller.admin.login);

  router.get('*', controller.home.index); //配置vue页面
};
