const express = require('express')
const app = express()
const port = 4000

// "public" 폴더를 정적 루트로 설정하기
app.use(express.static("public"))


app.listen(port, () => {
  console.log(`서버가 시작었습니다. http://localhost:${port}`)
})
