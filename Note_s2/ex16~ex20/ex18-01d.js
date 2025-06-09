/* 객체 다루기 */
const user = {name:"홍길동", age:10}
// 객체의 키로 값을 읽는법 R
console.log(user.name)
console.log(user['name'])
// 객체를 추가하는 법 C
user.gender = "male"
user['address'] = "부산"
// 수정하는법 U
user.age = 17
user['name'] = '슈퍼맨'
// 삭제하는 법 D
delete user['gender']
// 출력하기
console.log(user)

// 객체 // Tip
// const test = {test}  // {test:test}
const updated = { ...user , age:20} // 외워라!!!!
console.log(updated)