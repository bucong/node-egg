'use strict';

const Controller = require('egg').Controller;

class CommodityController extends Controller {
  async list() {
    let res = await this.service.commodity.list();
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
}

module.exports = CommodityController;
