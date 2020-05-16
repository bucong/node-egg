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
  async index () {
    let title = "egg-api";
    await this.ctx.render('index', {
      title: title,
      systemTime: this.ctx.app.systemTime,
      imgURL: this.ctx.app.imgURL,
      address: "http://47.100.51.191:3000/api/"
    });
  }
  getConfigInfo () {
    let configInfo = {
      qiniuDomain: this.ctx.app.imgURL
    };
    this.ctx.body = {
      code: 0,
      data: configInfo,
      msg: ''
    }
  }
  async uploadImg () {
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
  async imgList () {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.home.imgList(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async imgSet () {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.home.imgSet(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async imgMoveSort () {
    let query = this.ctx.query;
    console.log(query);
    let res = await this.service.home.imgMoveSort(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async qiniuToken () {
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
  async configSave () {
    let query = this.ctx.request.body;
    console.log(query);
    let res = await this.service.home.configSave(query);
    this.ctx.body = {
      code: 0,
      data: res,
      msg: ''
    }
  }
  async test () {
    let query = this.ctx.query;
    console.log(query);
    // 小程序
    const res1 = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx03affc1bee606311&secret=eb0436164f1c8fea9aa1a0ede5bc749e');
    let token = JSON.parse(res1.data.toString()).access_token;
    console.log(token)
    let res2 = await this.ctx.curl('https://api.weixin.qq.com/tcb/uploadfile?access_token=' + token, {
      method: 'POST',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
      data: {
        env: 'bc-mini-server-1129',
        path: "1547709851322U3q4ucnj.png"
      },
      // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
      dataType: 'json',
    });
    this.ctx.body = res2.data
  }
  async wxlogin () {
    let query = this.ctx.request.body;
    console.log(query);
    if (query.username == 'admin' && query.password == 'abc123') {
      this.ctx.body = {
        code: 0,
        data: {},
        msg: '登录成功'
      }
    } else {
      this.ctx.body = {
        code: -1,
        data: {},
        msg: '用户名或密码错误'
      }
    }
  }
  async sendEmail () {
    const ctx = this.ctx;

    const email = '531053266@qq.com';  // 接收者的邮箱
    const subject = '测试邮件';
    const text = '这是一封测试邮件';
    const html = '<h2>测试一下::</h2><a class="elem-a" href="https://baidu.com"><span class="content-elem-span">测试链接</span></a>';

    const has_send = await this.service.tool.sendMail(email, subject, html);

    if (has_send) {
      ctx.body = {
        message: '发送成功',
      };
      return;
    }
    ctx.body = {
      message: '发送失败',
    }
  }
}

module.exports = HomeController;
