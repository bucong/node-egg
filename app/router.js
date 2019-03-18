'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); //首页
  //上传图片
  router.post('/api/upload/img', controller.home.uploadImg);
  router.get('/api/img/list', controller.home.imgList);
  router.get('/api/img/set', controller.home.imgSet);
  router.get('/api/img/moveSort', controller.home.imgMoveSort);
  router.get('/api/qiniu/token', controller.home.qiniuToken);
  //配置信息
  router.get('/api/config/info', controller.home.getConfigInfo);
  router.post('/api/config/save', controller.home.configSave);
  //用户
  router.get('/api/user/login', controller.user.userLogin);
  router.get('/api/user/getVerification', controller.user.getVerification);
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
  router.get('/api/order/delete', controller.order.delete);
  //评论
  router.post('/api/commodity/evaluateSub', controller.commodity.evaluateSub);
  //后台登录
  router.post('/api/admin/login', controller.admin.login);

  // router.get('*', controller.home.index); //配置vue页面

  // 测试
  router.get('/api/test', controller.home.test);
};
