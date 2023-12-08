// eslint-disable-next-line
import { createRef, useEffect, useRef, useState } from 'react';
import Board from '../../components/chessBoard/Board'
import MyInput from '../../components/boardSIze/MyInput';
import MyButton from '../../components/boardSIze/MyButton';
import {Wrapper} from '../../components/boardSIze/Wrapper';
import Header from '../../components/general/header';
import MainContainer from '../chessBoard/MainContainer';
import CommandContainer from '../../components/chessBoard/CommandContainer';
import Err from '../../components/boardSIze/InvalidStyle';
import CommandBtn from '../../components/chessBoard/CommandBtn';
import {endHorizontal, endVertical, endMainDiagonal, endAntidiagonal}from '../../algorithms/algorithms'
export default function Main() {
  
  const btn = useRef(null);

  const [size, setSize] = useState({
    height: '',
    width: '',
    isValid: true
  })

  const createRefs = (h, w) => {
    let arr = [];
    for (let i =0; i < h; i++){
      arr.push(Array(w))
      for (let j =0; j < w; j++) {
        arr[i][j] = createRef();
      }
    }
    return arr; // mảng tham chiếu
  }
  
  const setBoard = (h, w) => {
    let array = Array(h);
    for(let i = 0; i < h; i++) {
      array[i] = Array(w).fill('');
    }
    return array;
  }

  const [state, setState] = useState({
    history: [],
    nowPlaying: 'X',
    board: null,
    refs: null,
    winer: ''
  })
  

  const checkWinner = () => {
    if (state.history.length === 0) return;
    let location = state.history.slice(-1).pop(); // lấy ra phần từ cuối cùng
    let win = state.nowPlaying === 'X' ? 'O' : 'X'
    let result = endHorizontal(location, win, size, state.board) || endVertical(location, win, size, state.board) || endMainDiagonal(location, win, size, state.board) || endAntidiagonal(location, win, size, state.board);
    if (result){
      setState({...state, winer: win}) 
      btn.current.disabled = true//undo
      result.forEach((loc) => {
        state.refs[loc.y][loc.x].current.setbgc();
      })
    }
    else if (state.history.length === size.height*size.width){
      btn.current.disabled = true
      setState({...state, winer: "Hoà"})
    }
  }

  useEffect(() => {
    checkWinner()
  }, [state.nowPlaying])
  
  const handleClick = (r, c) => {
    if (state.winer) return state.winer
    state.board[r][c] = state.nowPlaying;
    let np = state.nowPlaying === 'X' ? 'O' : 'X'
    setState({
      ...state,
      history: [...state.history, {x:c, y:r}], // lưu vào mảng, gồm các object với tọa độ xy
      nowPlaying: np,   // cập nhật lại người chơi là X hay Y
    })
    return false
  }

  const handleUndo = () => {
    if (state.history.length > 0) {
      let location = state.history.pop();
      let np = ''
      state.refs[location.y][location.x].current.clearLetter();
      state.nowPlaying === 'X' ? np = 'O' : np = 'X';
      state.board[location.y][location.x] = '';
      setState({...state, nowPlaying: np})
    }
  }

  const handleReset = () => {
    state.refs.forEach(element => {
      element.forEach(e => {
        e.current.clearLetter();
        e.current.resetbgc();
      })
    });
    setState({                  // đặt về giá trị ban đầu
      history: [],
      nowPlaying: 'X',
      board:setBoard(size.height, size.width),
      refs: state.refs,
      winer: ''
    })
    btn.current.disabled = false // cho ấn nút 

  }
  const handleChangHeight = (event) => {
    setSize({...size , height: Number.parseInt(event.target.value)})
  }
  const handleChangWidth = (event) => {
    setSize({...size, width: Number.parseInt(event.target.value)})
  }
  const handleSetSize = () => {
    if (Number.isInteger(size.height) && Number.isInteger(size.width) && size.height >= 5 && size.width >= 5 && size.height <= 50 && size.width <= 50 )
      setState({...state, board: setBoard(size.height, size.width), refs: createRefs(size.height, size.width)})
    // thay đổi giá trị của state, sao chép các giá trị cũ của state cũ
    // thay Board và Ref thành 2 giá trị mới. 
    // setBoard mảng 2 chiều gồm giá trị rỗng
    //                       lưu những tham chiếu đến các nút bàn cờ
      else setSize({...size, isValid: false})
  }
  return (
  <>
    <Header>Tic-Tac-Toe</Header>
    {(state.board === null) ? (
      <Wrapper>
        <h2>Please choose the size ...</h2>
        <MyInput text={'Row '} value={size.height} onChange={handleChangHeight}></MyInput>
        <MyInput text={'Column '} value={size.width} onChange={handleChangWidth}></MyInput>
        {(!size.isValid) ? <Err>Kích thước bạn nhập vào chưa hợp lệ <br/> Kích thước phải lớn hơn 5 và nhỏ hơn hoặc bằng 50 </Err> : (null)}
        <MyButton onClick={handleSetSize}></MyButton>
      </Wrapper>
      ) : (
      <MainContainer>
        <Board onclick={handleClick} board={state.board} np={state.nowPlaying} refs={state.refs}/>
        <CommandContainer>
          <div>Next Playing: {state.nowPlaying}</div>
          <div>Result: {state.winer}</div>
          <CommandBtn ref={btn} text={'Undo'} onClick={handleUndo}/>
          <CommandBtn text={'Reset'} onClick={handleReset}/>
        </CommandContainer>
      </MainContainer>
      )
    }
  </>
  )
}