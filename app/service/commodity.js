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
    let resultInfo = await db.select('commodity',{
      where: {
        id: query.id
      }
    });
    let resultEvaluate = await db.select('evaluate',{
      where: {
        cId: query.id
      }
    });
    for(let item of resultEvaluate){
      let resultUser = await db.select('user',{
        where: {
          id: item.userId
        }
      });
      item.userName = resultUser[0].name;
      item.figureurl = resultUser[0].figureurl;
    }
    return {
      info: resultInfo[0],
      evaluate: resultEvaluate
    }  
  }
}

module.exports = CommodityService;
