'use strict';

const Service = require('egg').Service;

class CommodityService extends Service {
  async list() {
    let db = this.app.mysql;
    let result = await db.select('commodity');
    return result;
  }
  async add(query) {
    let db = this.app.mysql;
    let result = await db.insert('commodity', {
      type: query.type,
      name: query.name,
      price: query.price,
      img: query.img,
      desc: query.desc,
      discount: query.discount,
      praise: 0,
      salesVolume: 0
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
  async info(query) {
    let db = this.app.mysql;
    let result = await db.select('commodity',{
      where: {
        id: query.id
      }
    });
    return result[0];
  }
  async evaluate(query) {
    let db = this.app.mysql;
    let result = await db.select('evaluate',{
      where: {
        cId: query.id
      }
    });
    for(let item of result){
      let resultUser = await db.select('user',{
        where: {
          id: item.userId
        }
      });
      item.userName = resultUser[0].name;
      item.figureurl = resultUser[0].figureurl;
    }
    return result;
  }
  async update(query) {
    let db = this.app.mysql;
    let result = await db.update('commodity', {
      type: query.type,
      name: query.name,
      price: query.price,
      img: query.img,
      desc: query.desc,
      discount: query.discount
    }, {
      where: {
        id: query.id
      }
    });
    if(result.affectedRows === 1){
      return {
        code: 0,
        data: {
          info: '修改成功'
        },
        msg: ''
      }
    }else{
      return {
        code: 5,
        data: {},
        msg: '修改失败'
      }
    }
  }
  async delete(query) {
    let db = this.app.mysql;
    let result = await db.delete('commodity', {
      id: query.id
    });
    if(result.affectedRows === 1){
      return {
        code: 0,
        data: {
          info: '删除成功'
        },
        msg: ''
      }
    }else{
      return {
        code: 5,
        data: {},
        msg: '删除失败'
      }
    }
  }
  async evaluateSub(query) {
    let db = this.app.mysql;
    let result = await db.insert('evaluate', {
      cId: query.cId,
      userId: query.userId,
      content: query.content,
      imgs: query.imgs,
      times: query.times
    });
    if(result.affectedRows === 1){
      return {
        code: 0,
        data: {
          info: '提交成功'
        },
        msg: ''
      }
    }else{
      return {
        code: 5,
        data: {},
        msg: '提交失败'
      }
    }
  }
}

module.exports = CommodityService;
