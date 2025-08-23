const app = require("express")()
app.get('/',(req , res)=>{res.send('안녕 세상아~!')})
app.listen( 3000, ()=>{console.log(`서버가 가동되었습니다. http://localhost:${3000}`)})