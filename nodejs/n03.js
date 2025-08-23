const express = require("express")
const path = require('path')
const app = express()

const _path = path.join(__dirname, 'dist')
// 서버사이드 렌더링 , 스프링부트의 타임리프 같은 것
app.get('/',(req , res)=>{
    const name = '홍길동'
    const age = 22
    const htmlList = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1> 안녕하세요.</h1>
    <h2> ${name} 님 안녕하세요.</h2>
    <h3> ${age} 살이시네요.</h3>
</body>
</html>`
    res.send(htmlList)
})

// http://localhost:3000/test?name=apple&age=700 물음표뒤의 쿼리스트링 값을 받아서 서버에 전달
app.get('/test',(req,res)=>{
    const {name, age} = req.query
    res.send(` ${name}님 안녕하세요. ${age}살 이시네요.`)
})

app.listen( 3000, ()=>{
    console.log(`서버가 가동되었습니다. http://localhost:${3000}`)
})