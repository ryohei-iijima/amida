import { useEffect } from 'react';
import '../assets/css/_components/amida.css'

type Props = {
    amidaLine: number
}

const clearAmida = (amidaLine:number) => {
    document.querySelector('.canvasWrap').innerHTML = "";
    const canvasWrap = document.querySelector('.canvasWrap');
    const createCanvas = document.createElement('canvas');
    let startPath = 30;
    let canvasElementWidth = 30;
    canvasElementWidth = startPath * amidaLine + 2 + 30;
    createCanvas.setAttribute('id', 'canvas-amida');
    createCanvas.setAttribute('width', `${canvasElementWidth}px`);
    createCanvas.setAttribute('height', `500px`);
    canvasWrap?.appendChild(createCanvas);
    const canvasElement = document.getElementById('canvas-amida') as HTMLCanvasElement;
    const ctx = canvasElement?.getContext('2d')!;
    const RANDOM_MIN = 3 ;
    const RANDOM_MAX = 47 ;
    
    for (let i = 0; i <= amidaLine; i ++) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startPath, 0);
        ctx.lineTo(startPath, 500);
        ctx.stroke();

        if(amidaLine >= 1) {
            let counter:number[] = [];
            for(let j = 0; j <= 5; j++) {
                const y = (Math.floor( Math.random() * (RANDOM_MAX + 1 - RANDOM_MIN) ) + RANDOM_MIN) * 10;
                if(counter.includes(y)) continue;
                ctx.beginPath();
                ctx.moveTo(startPath, y);
                ctx.lineTo(startPath + 30, y);
                ctx.stroke();
                counter.push(y);
            }
        }
        startPath += 30;
    }
}

const Amida = (props:Props) => {
    useEffect(() => {
        clearAmida(props.amidaLine);
    }, [props.amidaLine])
    return (
        <>
        <div className='wrap canvasWrap'>
        </div>
        </>
    )
}

export default Amida