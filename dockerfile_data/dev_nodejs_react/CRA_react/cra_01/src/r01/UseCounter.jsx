import { useState } from "react"

function useCounter(init) {
    const [count, setCount] = useState(init)
    const increaseCount = () => setCount(count + 1)
    const decreaseCount = () => setCount(count > 0 ? count - 1 : 0)
    return [count, increaseCount, decreaseCount]
}

export default useCounter