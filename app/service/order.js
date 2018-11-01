'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async list(query) {
    let db = this.app.mysql;
    let where = {};
    if(query.state && query.state !== ''){
      where.state = query.state
    }
    if(query.store && query.store !== ''){
      where.store = query.store
    }
    let result = await db.select('order', {
      where: where,
      orders: [
        ['id', 'desc']
      ],
      limit: 20, //查询条数
      offset: (query.page - 1) * 20
    });
    return result;
  }
  async add(query) {
    let db = this.app.mysql;
    let result = await db.insert('order', {
      userId: query.userId,
      times: query.times,
      state: 1,
      list: query.list,
      price: query.price,
      store: query.store
    });
    if(result.affectedRows === 1){
      return {
        code: 0,
        data: '添加成功',
        msg: ''
      }
    }else{
      return {
        code: 5,
        data: '',
        msg: '添加失败'
      }
    }
  }
  async userOrder(query) {
    let db = this.app.mysql;
    let result = await db.select('order', {
      where: {
        userId: query.userId
      },
      orders: [
        ['id', 'desc']
      ],
    });
    return result;
  }
  async orderItem(query) {
    let db = this.app.mysql;
    let commodity = await db.select('commodity');
    let commodityMap = new Map();
    for(let item of commodity){
      commodityMap[item.id] = item;
    }
    let order = await db.select('order', {
      where: {
        id: query.id
      }
    });
    let orderLine = order[0];
    let list = JSON.parse(orderLine.list);
    let newList = [];
    for(let item of list){
      commodityMap[item.id].num = item.num;
      newList.push(commodityMap[item.id]);
    }
    orderLine.list = newList;
    return orderLine;
  }
  async accept(query) {
    let db = this.app.mysql;
    let result = await db.update('order', {
      state: 2
    }, {
      where: {
        id: query.id
      }
    });
    if(result.affectedRows === 1){
      return '接单成功';
    }
  }
  async cancel(query) {
    let db = this.app.mysql;
    let result = await db.update('order', {
      state: 3
    }, {
      where: {
        id: query.id
      }
    });
    if(result.affectedRows === 1){
      return '取消订单成功';
    }
  }
  async finish(query) {
    let db = this.app.mysql;
    let result = await db.update('order', {
      state: 4
    }, {
      where: {
        id: query.id
      }
    });
    if(result.affectedRows === 1){
      return '完成订单成功';
    }
  }
}

module.exports = OrderService;
