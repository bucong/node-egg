'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async imgList(query) {
    let db = this.app.mysql;
    let result = await db.select('imgs', {
      where: {type: query.imgType},
      orders: [
        ['sort', 'asc'] //排序
      ]
    });
    return result;
  }
  async imgSet(query) {
    let db = this.app.mysql;
    let result = await db.update('imgs', {
      img: query.img
    }, {
      where: {
        id: query.id
      }
    });
    if(result.affectedRows === 1){
      return {
        code: 0,
        data: '修改成功',
        msg: ''
      }
    }else{
      return {
        code: 5,
        data: '',
        msg: '修改失败'
      }
    }
  }
  async imgMoveSort(query) {
    let db = this.app.mysql;
    let result1 = await db.update('imgs', {
      sort: query.sort2
    }, {
      where:{
        id: query.exchangeId1
      }
    });
    let result2 = await db.update('imgs', {
      sort: query.sort1
    }, {
      where:{
        id: query.exchangeId2
      }
    });
    if(result1.affectedRows === 1 && result2.affectedRows === 1){
      return {
        code: 0,
        data: '操作成功',
        msg: ''
      }
    }else{
      return {
        code: 5,
        data: {},
        msg: '操作失败'
      }
    }
  }
  async configInfo() {
    let db = this.app.mysql;
    let result = await db.select('config');
    return result[0];
  }
  async configSave(query) {
    let db = this.app.mysql;
    let result = await db.update('config', {
      imgURL: query.imgURL
    }, {
      where: {
        id: 1
      }
    });
    return '成功';
  }
}

module.exports = HomeService;
