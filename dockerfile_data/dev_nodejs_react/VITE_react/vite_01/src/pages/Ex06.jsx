import { useState } from "react";
import list from "./list"

const Check = () => {
    const [chk, setChk] = useState({ "HTML": false, "CSS": false, "JAVASCRIPT": false, "JAVA": false, "PYTHON": false, "Oracle": false, "MySQL": false, "Nodejs": false })
    const handleChk = e => {
        const { value, checked } = e.target
        setChk(data => {
            return { ...data, [value]: checked }
        })
    }
    return (
        <>
            <h1>6. 체크박스값 확인 </h1>
            <h6>{JSON.stringify(chk)}</h6>

            {list.map((v, i) => {

                return (
                    <span key={i}>
                        <input type="checkbox" onChange={handleChk} value={v} /> {v} {"  "}
                    </span>
                )
            })}

            <ol style={{ "listStylePosition": "inside" }}>
                {list
                    .filter(ck => chk[ck])
                    .map((v) => <li>{v}</li>)
                }
            </ol>
        </>
    )
}

export default Check