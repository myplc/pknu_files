const express = require("express")
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3300

app.use(express.static(__dirname))

app.get('/',(req,res)=>{
    fs.readdir(__dirname, {withFileTypes:true, encoding:'utf-8'}, (err, data)=>{
        let list = `<h1>링크를 선택하세요.</h1><ul>`
         data.forEach(v=>{
            console.log(v.name)
            if(v.isFile()){
                list +=`<li><a href="${v.name}" >${v.name}</a> </li>`       
            }else{
                list +=`<li>[폴더] ${v.name}</a> </li>`
            }
        })

        list += '</ul>'
        res.send(list)
    })
})

app.listen(port,()=>{
   console.log(`서버가 가동되었습니다. http://localhost:${port}`)
})