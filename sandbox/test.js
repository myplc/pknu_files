const axios = require('axios')

const url = 'https://apis.data.go.kr/B551011/TarRlteTarService1/areaBasedList1'
const params = {
  serviceKey:
    'oUQKydR5Va+ZHhX322gRHaUqFPBhodTiidQzTV7xyuFBr75AwNnR5hyf/DtEV6YGi4PmUmvoP5Qj9m7yKctSXA==',
  pageNo: 1,
  numOfRows: 10,
  MobileOS: 'ETC',
  MobileApp: 'AppTest',
  baseYm: '202503',
  areaCd: '11',
  signguCd: '11530',
  _type: 'json'
}

axios
  .get(url, { params })
  .then((response) => {
    console.log('✅ 응답 성공:\n')
    console.log(JSON.stringify(response.data, null, 2)) // 보기 좋게 출력
  })
  .catch((error) => {
    console.error('❌ 오류 발생:\n')
    if (error.response) {
      console.error('응답 상태:', error.response.status)
      console.error('응답 데이터:', error.response.data)
    } else {
      console.error('요청 자체 실패:', error.message)
    }
  })
