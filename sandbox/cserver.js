const http = require('http');
const url = require('url');
const fs = require('fs');

// 이름 리스트
const nameList = [
  '김기윤', '김은희', '김정현', '김지상', '박민주', '박세찬', '박수민',
  '박유빈', '박혜빈', '안정민', '양은지', '엄보성', '이경주', '이동호',
  '이바다', '이성훈', '이윤범', '이지민', '정서영', '정희성', '황혜미'
];

const submissions = [];
const submittedNames = new Set();
const headers = { 'Content-Type': 'text/html; charset=utf-8' };

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // 🔹 메인 페이지
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <title>반 선택 투표</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        body { font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; }
        form { background: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 5px #ccc; }
        label, select, button { display: block; margin-bottom: 10px; width: 100%; }
        button { background: #007bff; color: white; padding: 10px; border: none; border-radius: 5px; }
        canvas { margin-top: 30px; }
      </style>
    </head>
    <body>
      <h2>1~3지망 반 선택</h2>
      <form method="POST" action="/submit">
        <label>이름:
          <select name="name" required>
            ${nameList.map(n => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </label>
        <label>1지망:
          <select name="choice1" required>
            <option>A</option><option>B</option><option>C</option><option>D</option>
          </select>
        </label>
        <label>2지망:
          <select name="choice2" required>
            <option>A</option><option>B</option><option>C</option><option>D</option>
          </select>
        </label>
        <label>3지망:
          <select name="choice3" required>
            <option>A</option><option>B</option><option>C</option><option>D</option>
          </select>
        </label>
        <button type="submit">제출</button>
      </form>

      <canvas id="chart" width="400" height="200"></canvas>

      <script>
        async function drawChart() {
          const res = await fetch('/chart-data');
          const data = await res.json();
          const ctx = document.getElementById('chart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['A', 'B', 'C', 'D'],
              datasets: [{
                label: '1지망 수',
                data: [data.A, data.B, data.C, data.D],
                backgroundColor: ['#f66', '#6cf', '#6f6', '#fc6']
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(val) { return parseInt(val); }
                  }
                }
              }
            }
          });
        }
        drawChart();
      </script>
    </body>
    </html>
    `;
    res.writeHead(200, headers);
    res.end(html);
  }

  // 🔹 제출 처리
  else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const name = params.get('name');
      const choice1 = params.get('choice1');
      const choice2 = params.get('choice2');
      const choice3 = params.get('choice3');

      if (!nameList.includes(name)) {
        res.writeHead(400, headers);
        return res.end('<h2>❌ 명단에 없는 이름입니다.</h2>');
      }
      if (submittedNames.has(name)) {
        res.writeHead(400, headers);
        return res.end('<h2>❌ 이미 제출하였습니다.</h2>');
      }

      const record = `${name}, ${choice1}, ${choice2}, ${choice3}\n`;
      fs.appendFileSync('투표결과.txt', record, 'utf-8');

      submissions.push({ name, choice1, choice2, choice3 });
      submittedNames.add(name);
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }

  // 🔹 차트 데이터
  else if (req.method === 'GET' && parsedUrl.pathname === '/chart-data') {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    submissions.forEach(s => {
      if (counts[s.choice1] !== undefined) {
        counts[s.choice1]++;
      }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(counts));
  }

  // 🔹 기타
  else {
    res.writeHead(404, headers);
    res.end('404 Not Found');
  }
});

server.listen(3003, () => {
  console.log('✅ 서버 실행 중: http://localhost:3003');
});
