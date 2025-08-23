const { craeteServer, createServer } = require("http")
const port = 3000

const server = createServer((req, res)=>{
    res.end("Hello World")
} )

server.listen( port,  ()=>{
    console.log("서버가 동작하였습니다.")
} )