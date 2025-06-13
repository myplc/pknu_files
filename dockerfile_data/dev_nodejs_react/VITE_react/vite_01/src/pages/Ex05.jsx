import { useState } from "react"
import list from "./list"

const Radio = () => {
    const [rad, setRad] = useState('원하는 언어를 고르세요.')
    const handleRad = e => {
        // const value = e.target.value
        // const checked = e.target.checked
        const { value, checked } = e.target
        setRad(() => ({ [value]: checked })) // 덮어쓰기
    }
    return (
        <>
            <h1> 5. 라디오버튼과 확인</h1>
            <h2>{JSON.stringify(rad)}</h2>
            {list.map((v, i) => {
                return (
                    <div key={i}>
                        <input type="radio" name="one" value={v} onChange={handleRad} />{v} <br />
                    </div>
                )
            })}
        </>
    )
}
export default Radio