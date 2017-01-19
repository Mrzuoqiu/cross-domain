// $.get('data.json', null, function(res){
//     alert(res.message)
// })

// $.get('http://abc.zhiyou100.com/domain/data.json', null, function(res){
//     alert(res.message)
// })

// $.get('http://xyz.zhiyou100.com/domain/data.json', null, function(res){
//     alert(res.message)
// })

// 在浏览器中，通过JS代码访问不同域名下的URL（JS的XHR/AJAX）
// 或者iframe（JS访问iframe内部的DOM）时，会被禁止访问，这种
// 问题称做跨跨访问（禁止）问题

// 不是通过JS代码进行的跨域访问不存在跨域问题！比如可以跨域
// 加载图片、引用JS文件、下载各种文件、使用iframe跨域嵌入其它
// 网站的页面

// 跨域问题的解决方案
// 一、在对方的服务器中的响应头中添加 
// Access-Control-Allow-Origin 允许哪些域进行跨域访问
// 它是值可以是 域名，或者 * 
// 这种方案只有在对方信任或不在乎（安全）的情况下才能使用

// 二、如果域名都是同一个根域名的子域名，则可以使用
// document.domain = "根域名" 来统一JS执行环境中的域名
// 这种方案只能在同一个公司或组织的内部使用

// document.domain = 'zhiyou100.com'

// setTimeout(function() {
//     var data = $('iframe')[0].contentWindow.document.body.innerText
//     alert(data)
// }, 2000);


// 三、JSONP    JSON Padding
// 原理：
// 浏览器不限制通过script标签引入其它网站的脚本
// 所以，可以通过JS向页面上动态添加一个script标签
// 并且指定其 src 为一个特殊的url，对方的服务器
// 针对这个url的请求，会进行特殊处理

// 如：向head标签中动态添加以下script标签
// <script src="http://api.baidu.com/weather/zhengzhou/functionName"></script>
// 会导致浏览器向上述URL发起一个GET请求（JSONP只能是GET请求）

// 对方的服务器收到这个请求后，会返回一个特殊的JS文件:

// functionName({
//     天气数据
// })

// 如果此时在页面中定义了functionName函数，则functionName函数
// 会被调用，并且能够得到天气数据！
// 这种将JSON数据放入指定函数参数位置的跨域访问解决方案被称为JSONP
// 即使用JSON填充函数后面的（）内部的空白（padding）

// 这种方案可以跨域任意域名，但是必是对方故意这样设计才能使用

var s = document.createElement('script')
s.src = 'http://www.h5.name/domain/data.js'

document.head.appendChild(s)

// 在jQuery中 $.getJSON() 这个方法支持 JSONP !!!
// 在url后面加 callback=? 即可

// 通过网络监视观察响应内容
// http://api.map.baidu.com/telematics/v3/weather?location=郑州市&output=json&ak=iw5m2G7ayDow8ofDdDGVUMB3&mcode=com.BaiduWeather
// 加上下面参数再观察一下
// &callback=functionName

// 打开预科的天气例子，观察jquery中的getJSON方法中使用callback=?的效果


// 四、将要请求的URL发送给自己的服务端，让服务端发起请求
// （服务端没有跨域限制），服务端请求成功后，将数据再回传给
// 浏览中的JS----服务端代理请求

// 这种方式只要自己的服务端支持一下就可以了，是比较常用的方案
// 没有任何限制
// 这种方式还可以实现其它方案无法实现的功能：
// 通过服务端抓取别人的网页，将网页上的数据提取出来，变成JSON
// 返回给我们使用

// 浏览器-->服务器-->第三方网页-->抓取数据-->JSON-----
// |                                               |
// ————————————————————————————————————————————————|

// 在Node.js中，使用cheerio模块可以像使用jquery一样
// 从HTML字符串中筛选并提取想要的数据

// 在Node.js中，使用http模块可以下载任意url的数据
// http.request(url, res => {
//     var data = ''

//     res.on('data', d => {
//         data += d
//     })

//     res.on('end', () => {
//         // data已经完整，可以使用了
//         $ = cheerio.load(data)
//         var datas = $('.content').map(ele => $(this).text())
//         // 从HTML中提取所需要数据（已经转换成数组）
//     })
// })

// 五、使用任何可以利用的浏览器端中间机制实现跨域
// 交换数据，如：

// window.name
// var name 
// 在代码中使用name变量时实际上使用的是window对象
// 的name属性，但是name属性是window对象的内部属性
// 它只接受字符串值，如果给它赋其它值，将会直接被
// 转换成字符串！！！！尤其是赋一个对象给name变量的
// 时候，会导致数据丢失！！！(对象toString()后是
// [object Object])

// 但是name有一特别性质可以被用来做跨域数据交换
// name值不会随全局作用域被销毁，不管窗口跳转到哪个
// 页面，不管窗口打开了多少个页面，name的值都是通
// 用的

// 其它的，诸如 location.hash 也可以用来做跨域数据
// 交换

// 六、 使用H5新增的API，如WebWorker/WebSockets
