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
  async userInfo() {
    let query = this.ctx.query;
    console.log(query);
    if(query.account === '17621960934'){
        this.ctx.body = JSON.stringify({
            code: 0,
            data: {
                name: 'Tom',
                age: 18
            },
            msg: ''
        })
    }else{
        this.ctx.body = JSON.stringify({
            code: 1,
            data: {},
            msg: '这谁的手机号？'
        })
    }
  }
}

module.exports = UserController;
