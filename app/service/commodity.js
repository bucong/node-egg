'use strict';

const Service = require('egg').Service;

class CommodityService extends Service {
  async list() {
    let db = this.app.mysql;
    let result = await db.select('commodity');
    for(let item of result){
      item.img = this.service.home.qiniuLink(item.img);
    }
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
    let img = result[0].img;
    result[0].showImg = this.service.home.qiniuLink(img);
    return result[0];
  }
  async evaluate(query) {
    let db = this.app.mysql;
    let result = await db.query('select evaluate.*, user.name, user.figureurl from evaluate left join user on evaluate.userId = user.id where cId = ?', [query.id]);
    for(let item of result){
      if(item.imgs && item.imgs != ''){
        let imgArr = item.imgs.split(',');
        let newArr = [];
        for(let i of imgArr){
          newArr.push(this.service.home.qiniuLink(i));
        }
        item.imgs = newArr;
      }
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
      star: query.star,
      times: query.times
    });
    let orderResult = await db.update('order', {
      state: 5
    }, {
      where: {
        id: query.orderId
      }
    });
    //评分大于3分，则点赞
    if(query.star > 3){
      await db.query('update commodity set praise = praise + 1 where id = ?', [query.cId]);
    }
    if(result.affectedRows === 1 && orderResult.affectedRows === 1){
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
