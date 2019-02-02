module.exports = {
  schedule: {
    interval: '10m', // 10 分钟间隔
    // cron: '0 45 13 * * *',
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true, //启动立即执行
  },
  async task(ctx) {
    let date = new Date();
    let data = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    ctx.app.systemTime = data;
  },
};