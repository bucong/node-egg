module.exports = {
  schedule: {
    // interval: '5s', // 1 分钟间隔
    cron: '0 35 13 * * *',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // let data = new Date();
    let data = '13点35分的数据';
    ctx.app.cache = data;
  },
};