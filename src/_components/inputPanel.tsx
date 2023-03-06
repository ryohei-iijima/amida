import { useEffect } from 'react';
import '../assets/css/_components/inputPanel.css'

const addAmidaLine = () => {
    console.log("hogehoge")
}

const InputPanel = () => {
    return (
        <>
        <div className='wrap'>
            <button onClick={addAmidaLine}>追加</button>
        </div>
        </>
    )
}

export default InputPanel