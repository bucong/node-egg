module.exports = options => {
  return async function routerIn(ctx, next) {
    console.log(ctx.url);
    await next();
    if(ctx.body.code && ctx.body.code != 0){
      ctx.coreLogger.info(ctx.body);
    }
  }
}