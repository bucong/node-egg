'use strict';

const Service = require('egg').Service;

class CommodityService extends Service {
  async list() {
    let db = this.app.mysql;
    let result = await db.select('commodity');
    return result;
  }
}

module.exports = CommodityService;
