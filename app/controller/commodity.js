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
  async add() {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.commodity.add(query);
    this.ctx.body = res;
  }
  async info() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.commodity.info(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async evaluate() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.commodity.evaluate(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async update() {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.commodity.update(query);
    this.ctx.body = res;
  } 
  async delete() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.commodity.delete(query);
    this.ctx.body = res;
  } 
  async evaluateSub() {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.commodity.evaluateSub(query);
    this.ctx.body = res;
  } 
}

module.exports = CommodityController;
