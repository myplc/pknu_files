const express = require("express")
const path = require('path')
const app = express()
const port = 3000


// const _path = path.join(__dirname, 'dist')
// app.use(express.static(_path)) // 정적 서비스로 index.html 파일 서빙

app.get('/',(req,res)=>{
    const {inid = '값을 고르세요.'} = req.query
    console.log(inid)
    const arr = ['My life is pretty','Life is Egg','The Avengers are back','Test is Test']
    const pick = `
    <a href="/?inid=0">이쁘다. |</a>
    <a href="/?inid=1">삶이란? |</a>
    <a href="/?inid=2">어벤저스 |</a>
    <a href="/?inid=3">테스트는?</a>
    <hr/>
    ${arr[inid]||"값을 고르세요."}
    <hr/>
    `
    res.send(pick)
})

app.listen( port, ()=>{
    console.log(`서버가 가동되었습니다. http://localhost:${port}`)
})