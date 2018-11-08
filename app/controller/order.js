'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async list() {
    let query = this.ctx.query;
    this.ctx.coreLogger.info('请求数据：'+query);
    console.log(query);
    let res = await this.service.order.list(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async add() {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.order.add(query);
    this.ctx.body = res;
  }
  async userOrder() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.order.userOrder(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    };
  }
  async orderItem() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.order.orderItem(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    };
  }
  async accept() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.order.accept(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    };
  }
  async cancel() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.order.cancel(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    };
  }
  async finish() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.order.finish(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    };
  }
  async delete() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.order.delete(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    };
  }
}

module.exports = OrderController;
