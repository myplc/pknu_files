import { useState } from "react"
const TodoList = () => {
    const [indata, setIndata] = useState("")
    const [arr, setArr] = useState([])

    const handleInput = e => {
        setIndata(e.target.value)
    }
    const handleAdd = () => {
        setArr([...arr, indata])
    }

    return (
        <>
            <h1>8. 어레이를 이용한 ToDoList</h1>
            <label htmlFor="inin">배열요소 입력 : </label>
            <input type="text" id="inin" onChange={handleInput} value={indata} />{" "}
            <button onClick={handleAdd}>추가</button>
            <button disabled={!(arr.length > 0)}>삭제</button>
            <div>{indata}</div>
            <hr />
            {/* <div>{arr}</div> */}
            {arr.map((v, i) => {
                return (
                    <div key={i}>{`${i}: ${v}`}</div>
                )
            })}
            <pre>{`1. 엔터로 입력가능
2. localstorage 에 저장/읽기 기능
3. css 꾸미기
4. 삭제기능 구현하기

고급
5. 체크박스로 완료는 줄긋기`}</pre>
        </>
    )
}
export default TodoList