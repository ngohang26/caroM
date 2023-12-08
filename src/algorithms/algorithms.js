export const endHorizontal = (loc, letter, size, board) => {
    let index = 1;
    let count = 1;
    let winSquares = [{y: loc.y, x: loc.x}];
    while (index <= 4 && loc.x + index < size.width) {
      if (board[loc.y][loc.x + index] === letter){
        count++;
        winSquares.push({y: loc.y, x: loc.x + index})
      }
      else break;
      index++;
    }
    index = 1;
    while (index <= 4 && loc.x - index >= 0) {
      if (board[loc.y][loc.x - index] === letter){
        count++;
        winSquares.push({y: loc.y, x: loc.x - index})
      }
      else break;
      index++;
    }
    return count >= 5 ? winSquares : false ;
}
export const endVertical = (loc, letter, size, board) => {
    let index = 1;
    let count = 1;
    let winSquares = [{y: loc.y, x: loc.x}];
    while (index <= 4 && loc.y + index < size.height) {
      if (board[loc.y + index][loc.x] === letter){
        count++;
        winSquares.push({y: loc.y + index, x: loc.x})
      }
      else break;
      index++;
    }
    index = 1;
    while (index <= 4 && loc.y - index >= 0) {
      if (board[loc.y - index][loc.x] === letter){
        count++;
        winSquares.push({y: loc.y - index, x: loc.x})
      }
      else break;
      index++;
    }
    return count >= 5 ? winSquares : false ;
}
export const endMainDiagonal = (loc, letter, size, board) => {
    let index = 1;
    let count = 1;
    let winSquares = [{y: loc.y, x: loc.x}];

    while (index <= 4 && loc.y + index < size.height && loc.x + index < size.width) {
      if (board[loc.y + index][loc.x + index] === letter){
        count++;
        winSquares.push({y: loc.y + index, x: loc.x + index})
      }
      else break;
      index++;
    }
    index = 1;
    while (index <= 4 && loc.y - index >= 0 && loc.x - index >= 0) {
      if (board[loc.y - index][loc.x - index] === letter){
        winSquares.push({y: loc.y - index, x: loc.x - index})
        count++;
      }
      else break;
      index++;
    }
    return count >= 5 ? winSquares : false ;
}
export const endAntidiagonal = (loc, letter, size, board) => {
    let index = 1;
    let count = 1;
    let winSquares = [{y: loc.y, x: loc.x}];

    while (index <= 4 && loc.y - index >= 0 && loc.x + index < size.width) {
        if (board[loc.y - index][loc.x + index] === letter){
            count++;
            winSquares.push({y: loc.y - index, x: loc.x + index})
        }
        else break;
            index++;
    }
    index = 1;
    while (index <= 4 && loc.y + index < size.height && loc.x - index >= 0) {
        if (board[loc.y + index][loc.x - index] === letter){
            count++;
            winSquares.push({y: loc.y + index, x: loc.x - index})
        }
        else break;
            index++;
    }
    return count >= 5 ? winSquares : false ;
}