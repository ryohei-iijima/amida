import { useEffect } from 'react';
type Props = {
    amidaLine: number
}

const createRedLine = (rowArray, selectPath, hit) => {    
    const creteRedLineWrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const creteRedLineElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const creteRedLineText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    let currentPath = selectPath;
    let initPosition = currentPath === 0 ? 70 : 70 + (currentPath * 70);
    let currentPosition = 0;
    let endFlag = true;
    let pathText = '';
    pathText += `M ${initPosition},20`;
    while(endFlag) {
        if (currentPath === 0) {
            let selectNextPosition = rowArray[currentPath + 1].filter(num => num > currentPosition);
            if (selectNextPosition.length === 0) {
                endFlag = false;
                break;
            }
            currentPosition = Math.min(...selectNextPosition);
            pathText += `V ${currentPosition}`;
            pathText += `h 70`;
            currentPath++
        } else if(currentPath === rowArray.length - 1) {
            let selectNextPosition = rowArray[currentPath].filter(num => num > currentPosition);
            if (selectNextPosition.length === 0) {
                endFlag = false;
                break;
            }
            currentPosition = Math.min(...selectNextPosition);
            pathText += `V ${currentPosition}`;
            pathText += `h -70`;
            currentPath--
        } else {
            let selectNextPosition1 = rowArray[currentPath];
            let selectNextPosition2 = rowArray[currentPath + 1];
            selectNextPosition1 = selectNextPosition1.filter(num => num > currentPosition);
            selectNextPosition2 = selectNextPosition2.filter(num => num > currentPosition);
            if (selectNextPosition1.length === 0 && selectNextPosition2.length === 0) {
                endFlag = false;
                break;
            }
            selectNextPosition1 = Math.min(...selectNextPosition1);
            selectNextPosition2 = Math.min(...selectNextPosition2);
            if (selectNextPosition1 < selectNextPosition2) {
                pathText += `V ${selectNextPosition1}`;
                pathText += `h -70`;
                currentPosition = selectNextPosition1;
                currentPath--
            } else {
                pathText += `V ${selectNextPosition2}`;
                pathText += `h 70`;
                currentPosition = selectNextPosition2;
                currentPath++
            }
        }
    }
    pathText += `V 480`;

    creteRedLineElement.setAttribute('d', pathText);
    creteRedLineElement.setAttribute('stroke', 'black');
    creteRedLineElement.setAttribute('stroke-width', '2');
    creteRedLineElement.setAttribute('fill', 'transparent');
    creteRedLineElement.setAttribute('class', 'red-line');
    creteRedLineElement.setAttribute('id', `red-line${selectPath}`);
    console.log(`hit:${hit}`);
    console.log(`currentPath:${currentPath}`);
    creteRedLineText.textContent = hit === currentPath ? "あたり" : "ハズレ";
    creteRedLineText.setAttribute('fill', 'black');
    creteRedLineText.setAttribute('x', `${(currentPath + 1) * 70 - 25}`);
    creteRedLineText.setAttribute('y', '510');
    creteRedLineWrap.appendChild(creteRedLineElement);
    creteRedLineWrap.appendChild(creteRedLineText);
    return creteRedLineWrap;
};

const createAmida = (amidaLine:number) => {
    console.log(amidaLine);
    const svgWrap = document.querySelector('.svg-wrap');

    // svg-wrapの中身を初期化
    document.querySelector('.svg-wrap').innerHTML = "";

    const createSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    createSVG.setAttribute('version', '1.1');
    createSVG.setAttribute('baseProfile', 'full');
    createSVG.setAttribute('width', '100%');
    createSVG.setAttribute('height', '700px');

    let START_PATH = 70;
    const AJUST_NUM = 70;
    const RANDOM_MIN = 1;
    const RANDOM_MAX = 9;
    const ROW_LINE_NUM = 5;
    let counter1:number[] = [];
    let counter2:number[] = [];
    let colArray = [];
    let rowArray = [];
    const HIT = (Math.floor( Math.random() * amidaLine));


    for (let i = 0; i < amidaLine; i++) {
        const createColLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        createColLine.setAttribute('d', `M ${START_PATH},20 V 480`);
        createColLine.setAttribute('stroke', 'black');
        createColLine.setAttribute('stroke-width', '2');
        createColLine.setAttribute('id', `path${i}`);
        createSVG?.appendChild(createColLine);

        const createDiv = document.createElement('div');
        const createInput = document.createElement('input');
        const createButton = document.createElement('button');
        createDiv.style.width = '70px';
        createDiv.style.boxSizing = 'border-box';
        createInput.style.width = '70px';
        createInput.style.boxSizing = 'border-box';
        createButton.style.width = '70px';
        createButton.style.boxSizing = 'border-box';
        createButton.textContent = "スタート";
        createDiv.style.display = "inline-block";
        if (i === 0) {
            createDiv.style.marginLeft = '35px';
        } else {
            createDiv.style.marginLeft = '0px';
        }
        createInput.setAttribute('type', 'text');
        createButton.setAttribute('type', 'button');
        createInput.setAttribute('data-id', `input${i}`);
        createButton.setAttribute('class', 'exec-line');
        createButton.setAttribute('data-id', `red-line${i}`);
        createDiv.appendChild(createInput);
        createDiv.appendChild(createButton);
        createButton.addEventListener('click', () => {
            /* if(document.querySelector('.circle')) {
                document.querySelectorAll('.circle').forEach((item) => {
                    item.remove();
                });
            } */
            if(document.querySelector('.red-line')) {
                document.querySelectorAll('.red-line').forEach((item) => {
                    item.remove();
                });
            }
            createSVG?.appendChild(createRedLine(rowArray, i, HIT))
            // createCircle(createButton.dataset.id, createSVG);
            document.getElementById(createButton.dataset.id).setAttribute('stroke', 'red');
        })
        svgWrap?.appendChild(createDiv);

        if(amidaLine >= 1 && i >= 1) {
            for(let j = 1; j <= ROW_LINE_NUM; j++) {
                const y = (Math.floor( Math.random() * (RANDOM_MAX + 1 - RANDOM_MIN) ) + RANDOM_MIN) * 50;
                if(counter1.includes(y) || counter2.includes(y)) continue;

                const createRowLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                createRowLine.setAttribute('d', `M ${START_PATH},${y} h -${AJUST_NUM}`);
                createRowLine.setAttribute('stroke', 'black');
                createRowLine.setAttribute('stroke-width', '2');
                createSVG?.appendChild(createRowLine);

                counter2.push(y);
            }

            rowArray[i] = counter2;
            counter1 = counter2;
            counter2 = [];
        } else {
            rowArray[i] = 0;
        }

        colArray.push(i);
        START_PATH += AJUST_NUM;
    }

    svgWrap?.appendChild(createSVG);
}

const createCircle = (selectPath, addElement) => {
    const createAnimateCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    createAnimateCircle.setAttribute('r', '10');
    createAnimateCircle.setAttribute('class', 'circle');
   
    const createAnimateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
    createAnimateMotion.setAttribute('begin', '1.2s');
    createAnimateMotion.setAttribute('dur', '2s');
    createAnimateMotion.setAttribute('repeatCount', '0');
    createAnimateMotion.setAttribute('fill', 'freeze');
    createAnimateMotion.setAttribute('restart', 'always');    
   
    const createAnimateMpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
    createAnimateMpath.setAttribute('href', `#${selectPath}`);

    createAnimateMotion?.appendChild(createAnimateMpath);
    createAnimateCircle?.appendChild(createAnimateMotion);
    addElement.appendChild(createAnimateCircle);
}



const AmidaSVG = (props:Props) => {
    useEffect(() => {
        createAmida(props.amidaLine);
    }, [props.amidaLine])
    return (
        <>
            <div className='svg-wrap'></div>
        </>
    )
}

export default AmidaSVG