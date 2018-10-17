'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {

  }
  async login() {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.admin.adminLogin(query);
    console.log(res);
    if(res.length > 0){
      this.ctx.body = {
        code: 0,
        data: res[0],
        msg: ''
      };
    }else{
      this.ctx.body = {
        code: 1,
        data: {},
        msg: '用户名或密码错误'
      };
    }
  }
}

module.exports = AdminController;
