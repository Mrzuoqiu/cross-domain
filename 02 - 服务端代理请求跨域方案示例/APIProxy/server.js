const express = require('express')
const http = require('http')
const app = express()

app.use(express.static('www'))

app.get('/api/joke/:page/:pageSize', (req, res) => {
    var page = req.params.page
    var pageSize = req.params.pageSize

    http.request('http://japi.juhe.cn/joke/content/list.from?'+
    `key=a6f2b8a01fd6fe8324ada4c10c7b90e7&page=${page}&pagesize=${pageSize}&time=1418745237`, re => {
        var result = ''
        re.on('data', data => {
            result += data
        })
        re.on('end', () => {
            res.set('Content-Type','application/json;charset=utf-8')
            res.end(result)
        })
    }).end()
})

app.listen(3000, err => console.log('正在运行..'))