// 在调用前先判断一下functionName是否已存在
// 以防出现错误
functionName && functionName({
    code: 'success',
    message: '不受任何跨域限制，但必是GET请求且对方服务器支持！'
})