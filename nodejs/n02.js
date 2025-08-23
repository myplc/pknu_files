const express = require("express")
const logger = require("morgan") 
const path = require('path')
const app = express()
const port = 3000


const _path = path.join(__dirname, 'dist')
app.use(express.static(_path)) // 정적 서비스로 index.html 파일 서빙







app.use(logger('tiny'))

app.get('/',(req , res)=>{
    res.send('안녕 세상아~!')
})

app.get('/upload',(req , res)=>{
    res.send('업로드준비')
})
app.get('/list',(req , res)=>{
    res.send('리스트')
})
app.listen( port, ()=>{
    console.log(`서버가 가동되었습니다. http://localhost:${3000}`)
})