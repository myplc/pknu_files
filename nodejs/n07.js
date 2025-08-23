const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname)

fs.readdir(dir, (e , f)=>{
    f.forEach(v=>{
        const filename = path.join(__dirname,v)
        fs.stat(filename, (e, d) => {
            console.log(`${v}(${d.size}Byte),${d.isFile()?'파일':'폴더'}`)
        })
    })
})