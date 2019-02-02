'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  // 首页展示图
  async imgList(query) {
    let db = this.app.mysql;
    let result = await db.select('imgs', {
      where: {type: query.imgType},
      orders: [
        ['sort', 'asc'] //排序
      ]
    });
    for(let item of result){
      item.img = this.service.home.qiniuLink(item.img);
    }
    return result;
  }
  // 修改首页展示图
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
  // 修改首页图片顺序
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
  // 修改配置信息，七牛域名
  async configSave(query) {
    let db = this.app.mysql;
    let result = await db.update('config', {
      imgURL: query.imgURL
    }, {
      where: {
        id: 1
      }
    });
    this.ctx.app.imgURL = query.imgURL;
    return '成功';
  }
  qiniuLink(img) {
    let url = this.ctx.app.imgURL + img;
    return url;
  }
}

module.exports = HomeService;
