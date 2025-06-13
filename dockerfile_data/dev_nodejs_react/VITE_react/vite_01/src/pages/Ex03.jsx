import { useState } from "react";

const Inp3 = () => {
    const [in1, setIn1] = useState(0)
    const [in2, setIn2] = useState(0)

    const handleIn1 = e => setIn1(e.target.value)
    const handleIn2 = e => setIn2(e.target.value)


    return (
        <>
            <h1>3. Input을 이용한 실시간 계산</h1>
            <div>
                <input type="text" onChange={handleIn1} placeholder={in1} /> + {" "}
                <input type="text" placeholder={in2} onChange={handleIn2} /> = {in1 * 1 + in2 * 1}
            </div>
            <div>
                <input type="text" placeholder={in1} onChange={handleIn1} /> - {" "}
                <input type="text" placeholder={in2} onChange={handleIn2} /> = {in1 * 1 - in2 * 1}
            </div>
            <div>
                <input type="text" placeholder={in1} onChange={handleIn1} /> x {" "}
                <input type="text" placeholder={in2} onChange={handleIn2} /> = {in1 * in2 * 1}
            </div>
            <div>
                <input type="text" placeholder={in1} onChange={handleIn1} /> / {" "}
                <input type="text" placeholder={in2} onChange={handleIn2} /> = {in1 / in2}
            </div>
            <hr />

            {in1} + {in2} = {in1 * 1 + in2 * 1}<br />
            {in1} - {in2} = {in1 * 1 + in2 * 1}<br />
            {in1} x {in2} = {in1 * 1 + in2 * 1}<br />
            {in1} / {in2} = {in1 * 1 + in2 * 1}

        </>
    )
}
export default Inp3