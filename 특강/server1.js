const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>여기는 SSR 코드로 ${port}포트로 진행중입니다.</h1>
  </body>
</html>
`)
})

app.get('/list', (req, res) => {
  res.send('list 데이터 입니다.')
})

app.listen(port, () => {
  console.log(`서버가 시작었습니다. http://localhost:${port}`)
})
