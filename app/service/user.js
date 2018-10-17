'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async thirdLogin(query) {
    let db = this.app.mysql;
    let res = {
      code: 0,
      data: {},
      msg: ''
    };
    if(query.loginType === 'wx'){

    }else if(query.loginType === 'qq'){
      //QQ授权登录
      //第一步，获取token
      let tokenData = await this.ctx.curl('https://graph.qq.com/oauth2.0/token',{
        data: {
          grant_type: 'authorization_code',
          client_id: '101479867',
          redirect_uri: query.qqCallback,
          client_secret: '053cf1fc1b4a07f339ff213665d5523f',
          code: query.code
        }
      });
      let tokenResult = tokenData.data.toString('utf8');
      console.log(tokenResult);
      if (tokenResult.substr(0, 12) === 'access_token') {
        let tokenArr = tokenResult.split('&');
        let token = tokenArr[0].split('=')[1];
        //第二步，获取openid
        let openIdData = await this.ctx.curl('https://graph.qq.com/oauth2.0/me',{
          data: {
            access_token: token
          }
        });
        let openIdResult = openIdData.data.toString('utf8');
        console.log(openIdResult);
        let openIdLen = openIdResult.length;
        let openIdObj = JSON.parse(openIdResult.substring(9, openIdLen - 3));
        let openId = openIdObj.openid;
        //第三步，获取用户信息
        let userData = await this.ctx.curl('https://graph.qq.com/user/get_user_info',{
          data: {
            access_token: token,
            oauth_consumer_key: '101479867',
            openid: openId
          }
        });
        let userResult = userData.data.toString('utf8');
        let userInfo = JSON.parse(userResult);
        console.log(userInfo);
        let selectUser = await db.select('user', {
          columns: ['id', 'name', 'figureurl'],
          where: {
            qqOpenId: openId
          }
        })
        if(selectUser.length > 0){
          //已经注册过
          res.data = selectUser[0];
        }else{
          //新用户
          let insertUser = await db.insert('user', {
            qqOpenId: openId,
            name: userInfo.nickname,
            figureurl: userInfo.figureurl
          })
          if(insertUser.affectedRows === 1){
            let getUserInfo = await db.select('user', {
              columns: ['id', 'name', 'figureurl'],
              where: {
                qqOpenId: openId
              }
            })
            res.data = getUserInfo[0];
          }
        }
      } else {
        // let errMsgLen = tokenResult.length;
        // let errMsgObj = JSON.parse(tokenResult.substring(9, errMsgLen - 3));
        // let errMsg = errMsgObj.error_description;
        // res.msg = errMsg;
        res.code = 1;
        res.msg = 'code失效';
      }
      return res;
    }
  }
}

module.exports = UserService;
