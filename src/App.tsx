import { useState } from 'react'
import Amida from './_components/amida'
import AmidaSVG from './_components/amida-svg'
// import InputPanel from './_components/inputPanel'
import './assets/css/App.css'

const App = () => {
  const [amidaLine, setAmidaLine] = useState(2);
  const addAmidaLine = () => {
    const member = document.getElementById('member');
    if (member && member.value) {
      if (member.value <= 1) {
        alert("1以上の値を入力してください");
        return
      }
      setAmidaLine(member.value)
    } else {
      setAmidaLine(amidaLine + 1)
    }
  }  
  return (
    <>
      {/* <InputPanel setAmidaLine={setAmidaLine}></InputPanel> */}
      <p>人数を入力してください</p>
      <input id='member' type="text" />人
      <button onClick={addAmidaLine}>追加</button>
      {/* <Amida amidaLine={amidaLine}></Amida> */}
      <AmidaSVG amidaLine={amidaLine}></AmidaSVG>
    </>
  )
}

export default App
