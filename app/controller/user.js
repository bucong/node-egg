'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async userLogin() {
    //三方登陆
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.user.thirdLogin(query);
    this.ctx.body = res;
  }
}

module.exports = UserController;
