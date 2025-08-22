import React, { useEffect, useRef } from 'react'
import styles from './cody.module.css'
import { ModalDispatchContextProps } from '../../contexts/modal/ModalDispatchContext';

interface Props {
    id:number;
    close : Partial<ModalDispatchContextProps>[1];
}

const CodyModal: React.FC<Props> = ({id, close}) => {
    const container = useRef<HTMLDivElement | null>(null);
    const radius = 320;
    const allRound = Math.PI * 2 * radius;
    const currStyle = document.createElement('style');
    const nextStyle = document.createElement('style');

    /**
     * 모달을 닫는 함수
     * @param e 이벤트
     */
    const closeModal = (e:React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if(e.target !== e.currentTarget){
          return;
        }

        if(close){
            close(id);
        }
    }

    /**
     * cos과 sin값을 생성하는 함수
     * @param radian 호의 길이
     * @param radius 반지름
     */ 
    const getPos = (radian:number, radius:number) => {
        return [
            Math.cos(radian + Math.PI / 2) * radius,
            Math.sin(radian + Math.PI / 2) * radius
        ]
    }

    /**
     * 요소의 인덱스를 변경시키는 함수
     * @param cards  카드 요소
     * @param isMoveLeft 방향
     */
    const changeIndex = (cards:HTMLCollection, isMoveLeft:boolean)=>{
        for(const card of cards as HTMLCollectionOf<HTMLElement>) {
            const i = parseInt(card.dataset.index!);
            if(isMoveLeft){
            card.dataset.index = `${i+1 > cards.length-1 ? 0 : i+1}`;  
            } else {
            card.dataset.index =  `${i <= 0 ? cards.length-1 : i-1}`;
            }
        }
    }


    /**
     * 조건에 따라 왼쪽, 오른쪽으로 이동 시키는 함수
     * @param cards 카드 요소
     * @param isMoveLeft 방향
     */
    const makeStyle = (cards:HTMLCollection, isMoveLeft:boolean=false)=>{
        const dRound = allRound/cards.length;
        const radian = dRound/radius;
        changeIndex(cards, isMoveLeft);
        
        // 이미지의 위치를 변경하는 스타일 생성
        let strStyle = '';
        for(const card of cards as HTMLCollectionOf<HTMLElement>){
            if(card.dataset.index ){
                const i = parseInt(card.dataset.index);
                const [x, y] = getPos(radian*i, radius);
                const div = Math.ceil(cards.length/2);
                
                strStyle += `[data-index="${i}"] {
                    transform : translate3d(${x}px, 0, ${y}px) scale(${i==0? 250 : 100}%);
                    z-index : ${div > i ? div - i : i - div};
                    transform-origin: 50% 50%;
                    ${i===0? 'filter:blur(0) !important;':''}
                    margin-top: -${card.offsetHeight/2}px;
                }\n`;
                
            }
        }
    
        if(nextStyle!.textContent!.trim() !== ''){
            currStyle.textContent = nextStyle.textContent;
            nextStyle.textContent = strStyle;
        } else {
            nextStyle.textContent = strStyle;
            document.head.appendChild(nextStyle);
        }
    }

    /**
     * 이미지 요소를 클릭했을 때 스타일을 만드는 함수
     * @param e 
     */
    const onClick = (e:React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        
        if(container.current){
            const rect = container.current.querySelector('[data-index="0"]')!.getBoundingClientRect();
            if(e.clientX > rect.left){
            makeStyle(container.current.children, true);  
            } else {
            makeStyle(container.current.children);  
            }
        }
    }
    
    // 바인딩된 후 
    useEffect(()=>{
        container && container.current && makeStyle(container.current.children);
    },[])
        
    return (
        <div className={styles.container} ref={container} onClick={closeModal}>
            <img src="images/kz1.jpg" data-index="6" onClick={onClick}/>
            <img src="images/kz2.jpg" data-index="5" onClick={onClick}/>
            <img src="images/kz3.jpg" data-index="4" onClick={onClick}/>
            <img src="images/kz4.jpg" data-index="3" onClick={onClick}/>
            <img src="images/prod1.jpg" data-index="2" onClick={onClick}/>
            <img src="images/kz4.jpg" data-index="1" onClick={onClick}/>
        </div>
    )
}

export default CodyModal