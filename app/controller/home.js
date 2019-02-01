'use strict';
//七牛图片上传
const qiniu = require("qiniu");

const Controller = require('egg').Controller;
//文件存储
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class HomeController extends Controller {
  async index() {
    let title = "首页";
    console.log(this.ctx.app.systemTime)
    await this.ctx.render('index',{
      title: title,
      systemTime: this.ctx.app.systemTime,
      imgURL: this.ctx.app.imgURL
    });
  }
  async uploadImg() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    //随机数+时间戳：生成文件名
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    //生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
        //异步把文件流 写入
        await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
        //如果出现错误，关闭管道
        await sendToWormhole(stream);
        throw err;
    }
    this.ctx.body = {
      code: 0,
      data: filename,
      msg: ''
    };
  }
  async imgList() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.home.imgList(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async imgSet() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.home.imgSet(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async imgMoveSort() {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.home.imgMoveSort(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async qiniuToken() {
    let accessKey = 'dBFl65mOLbJvu4B1l162-KxCSBW9sKmYxS0B7-rA';
    let secretKey = '1aBL4UZ36m2O4K5cdFIItBeWHUFEno--5qchGtqg';
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let options = {
      scope: 'mini-program-video',
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    console.log(uploadToken);
    this.ctx.body = {
      code: 0,
      data: uploadToken,
      msg: ''
    }
  }
  async configInfo() {
    let res = await this.service.home.configInfo();
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async configSave() {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.home.configSave(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
}

module.exports = HomeController;
