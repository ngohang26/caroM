import styled from "styled-components";
// import Row from "./Row";
import Square from "./Square";
const Wrapper = styled.div `
  max-width: 80%;
  max-height: 80%;
  width: fit-content;
  height: fit-content;
  place-self: center;
  overflow-x: scroll;
  //border: 1px solid black;
  border-radius: 5px;
  &::-webkit-scrollbar{
    display: none;
  }
`

const Rows = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-center;
  
`

export default function Board(props) {
  let B = props.board.map((element, index) => {
    return <Rows key={index}>{
      element.map((e, i) => {
        return <Square key={i} pos={{y : index, x: i,}} onclick={props.onclick} np={props.np} ref={element => props.refs[index][i].current = element}/>;
      })
    }</Rows>
  })
  
  return(
    <Wrapper>
        {B}
    </Wrapper>
  );
}