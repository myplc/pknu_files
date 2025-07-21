const http = require('http');
const url = require('url');
const fs = require('fs');

const nameList = [
  '김기윤', '김은희', '김정현', '김지상', '박민주', '박세찬', '박수민',
  '박유빈', '박혜빈', '안정민', '양은지', '엄보성', '이경주', '이동호',
  '이바다', '이성훈', '이윤범', '이지민', '정서영', '정희성', '황혜미'
];

const allNamesWithRandom = ['랜덤', ...nameList];

const submissions = [];
const submittedNames = new Set();
const headers = { 'Content-Type': 'text/html; charset=utf-8' };

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

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
      <h1>프로젝트 팀 선택</h1>
      <fieldset>
        <legend>이 세계 규칙</legend>
        <h3>규칙1. 규칙의 미숙지로 인한 불이익은 본인에게 있습니다. 인원이 5명씩 모이면 차례로 1,2,3,4조가 나뉩니다(마지막 조만 6명).</h3>
        <h3>규칙2. 한쪽 인원이 많이 쏠리면 방폭이 되며 그 인원만 다시 투표진행 합니다.(조가 정해진 사람제외)</h3>
        <h3>규칙3. 최고 득점자 1인은 투표권 박탈 후 랜덤 선택자의 조로 배정됩니다.</h3> 
        <h3>규칙4. 모두의 합의 전에는 재투표 및 재배정은 안됩니다.</h3>   
      </fieldset>
      <form method="POST" action="/submit">
        <label>본인이름:
          <select name="name" id="myName" required>
            <option value="">선택하세요</option>
            ${nameList.map(n => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </label>
        <label>1지망:
          <select name="choice1" class="choice" required>
            <option value="">선택하세요</option>
            ${allNamesWithRandom.map(n => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </label>
        <label>2지망:
          <select name="choice2" class="choice" required>
            <option value="">선택하세요</option>
            ${allNamesWithRandom.map(n => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </label>
        <label>3지망:
          <select name="choice3" class="choice" required>
            <option value="">선택하세요</option>
            ${allNamesWithRandom.map(n => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </label>
        <button type="submit">제출</button>
      </form>
      <hr/>

      <canvas id="chart" width="400" height="200"></canvas>

      <script>
        const selects = document.querySelectorAll('.choice');
        const nameSelect = document.getElementById('myName');

        function filterChoices() {
          const myName = nameSelect.value;
          const selected = [...selects].map(s => s.value);
          selects.forEach(s => {
            [...s.options].forEach(o => {
              const isRandom = o.value === '랜덤';
              o.disabled = (!isRandom && selected.includes(o.value) && s.value !== o.value) || o.value === myName;
            });
          });
        }

        nameSelect.addEventListener('change', filterChoices);
        selects.forEach(s => s.addEventListener('change', filterChoices));
        window.addEventListener('DOMContentLoaded', filterChoices);

        async function drawChart() {
          const res = await fetch('/chart-data');
          const data = await res.json();
          const ctx = document.getElementById('chart').getContext('2d');
          const labels = Object.keys(data);
          const values = Object.values(data);
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: '1지망 통계',
                data: values,
                backgroundColor: '#6cf'
              }]
            },
            options: {
              plugins: {
                legend: { display: true },
                tooltip: {
                  callbacks: {
                    label: function(ctx) {
                      return ctx.dataset.label + ': ' + ctx.raw + '명';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0
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

  else if (req.method === 'POST' && parsedUrl.pathname === '/submit') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const name = params.get('name');
      const choice1 = params.get('choice1');
      const choice2 = params.get('choice2');
      const choice3 = params.get('choice3');

      if (!nameList.includes(name) || [choice1, choice2, choice3].includes(name)) {
        res.writeHead(400, headers);
        return res.end('<h2>❌ 유효하지 않은 선택입니다.</h2>');
      }
      if (submittedNames.has(name)) {
        res.writeHead(400, headers);
        return res.end('<h2>❌ 이미 제출하였습니다. 투표 끝.</h2>');
      }

      const record = `${name}, ${choice1}, ${choice2}, ${choice3}\n`;
      fs.appendFileSync('투표결과.txt', record, 'utf-8');

      submissions.push({ name, choice1, choice2, choice3 });
      submittedNames.add(name);
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }

  else if (req.method === 'GET' && parsedUrl.pathname === '/chart-data') {
    const counts = {};
    allNamesWithRandom.forEach(name => counts[name] = 0);
    submissions.forEach(s => {
      if (counts[s.choice1] !== undefined) counts[s.choice1]++;
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(counts));
  }

  else {
    res.writeHead(404, headers);
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('✅ 서버 실행 중: http://localhost:3000');
});
