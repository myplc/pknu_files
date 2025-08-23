const express = require("express")
const path = require('path')
const app = express()
const port = 3000


const _path = path.join(__dirname, 'dist')
app.use(express.static(_path)) // 정적 서비스로 index.html 파일 서빙


app.get('/test',(req,res)=>{
    const {inname, inage} = req.query
    console.log(inname, inage)
    res.send(`<h1>${inname}님 안녕하세요. ${inage}살 이시네요.</h1> <a href="/">홈으로가기</a>`)
})

app.listen( port, ()=>{
    console.log(`서버가 가동되었습니다. http://localhost:${3000}`)
})