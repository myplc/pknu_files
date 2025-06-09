/* 참조 복사 */
const arr =[11,22,33,44,55]
const arr2 = arr
arr2[2] = 77
console.log(arr, arr2)
console.log(arr == arr2)
console.log(arr === arr2)

/* 옅은 복사 */
const srr = [66,77,88,99,0]
const arr3 = [...srr]
arr3[2] = 77
console.log(srr, arr3)
console.log(srr == arr3)
console.log(srr === arr3)

console.log(Math.max(1,2,3,4,11,22,33,44,77,34)) 
console.log(Math.max(arr)) // NaN
console.log(Math.max(...arr))
console.log(Math.min(...arr))

//  python   a = b.copy()