'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let title = "我是首页内容";
    await this.ctx.render('index',{
      title: title
    });
  }
}

module.exports = HomeController;
