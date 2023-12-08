import { forwardRef,  useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";

const ChessSquare = styled.button`
  min-width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;
  border: 1px solid rgb(255, 255, 255) !important; 
  color: aquamarine;
  text-align: center;
  font-family: 'Indie Flower', 'Comic Sans', cursive;
  font-size: 1.2em;
  font-weight: bold;
  background-color: rgb(42, 40, 40);
  border-radius: .25em;

`

const Square = forwardRef( function Square(props, ref) { 
  const [letter, updateLetter] = useState('');
  const btnRef = useRef();
  const handleClick = () => {
    updateLetter(props.np);
  }
  useImperativeHandle(ref, ()=>{
    return {
      clearLetter() {
        updateLetter('');
      },
      setbgc() {
        btnRef.current.style.backgroundColor = "gold";
      },
      resetbgc() {
        btnRef.current.style.backgroundColor = "rgb(42, 40, 40)";
      
      }
    }
  })

  return(
    <ChessSquare 
      onClick={() => {
      if (letter !== '') return;
      !props.onclick(props.pos.y, props.pos.x) && handleClick();
      }}
      ref={btnRef}>{letter}</ChessSquare>
  )
}, []) ;

export default Square;