const fs = require('fs')
const path = require('path')
console.log(__dirname)
const filename = path.join(__dirname,"n01.js")

// 파일의 상태 정보를 비동기적으로 가져옴
fs.stat(filename, (e, d) => {
    // 파일의 마지막 수정 시간 (내용이 변경된 시점)
    console.log(d.mtime);
    // 파일의 메타데이터가 마지막으로 변경된 시간 (권한, 소유자 등)
    console.log(d.ctime);
    // 파일을 마지막으로 읽은 시간
    console.log(d.atime);
    // 파일이 생성된 시간 (일부 파일 시스템에서만 정확히 지원됨)
    console.log(d.birthtime);
    // 파일의 크기 (바이트 단위)
    console.log(d.size);
    // 해당 경로가 일반 파일인지 여부 (true/false)
    console.log(d.isFile());
    // 해당 경로가 디렉토리인지 여부 (true/false)
    console.log(d.isDirectory());
});
