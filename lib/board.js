class Board {

  constructor(NUM_COL, NUM_ROW){
    let board = new Array(NUM_COL);
    for (let i = 0; i < NUM_ROW; i++) {
      board[i] = new Array(NUM_ROW);
    }
    return board;
  }
}

module.exports = Board;
