import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Inp from "./pages/Ex01"
import Inp2 from "./pages/Ex02"
import Inp3 from "./pages/Ex03"
import Sel from "./pages/Ex04"
import Radio from "./pages/Ex05"
import Check from "./pages/Ex06"

function App() {
  return (
    <>
      <Link to="/">Home</Link> |{" "}
      <Link to="/ex01">예제1</Link> |{" "}
      <Link to="/ex02">예제2</Link> |{" "}
      <Link to="/ex03">예제3</Link> |{" "}
      <Link to="/ex04">예제4</Link> |{" "}
      <Link to="/ex05">예제5</Link> |{" "}
      <Link to="/ex06">예제6</Link> |{" "}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex01" element={<Inp />} />
        <Route path="/ex02" element={<Inp2 />} />
        <Route path="/ex03" element={<Inp3 />} />
        <Route path="/ex04" element={<Sel />} />
        <Route path="/ex05" element={<Radio />} />
        <Route path="/ex06" element={<Check />} />

      </Routes>
    </>
  )
}

export default App
