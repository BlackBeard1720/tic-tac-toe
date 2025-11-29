const Gameboard = (function(){
  const board = ["", "", "", "", "", "", "", "", ""];
  const setCell = function(i, mark){
    if(!board[i] && i >=0 && i < 9){
      board[i] = mark;
      return true;
    }
    return false;
  }

  const resetBoard = function(){
    for(let i = 0; i < board.length; i++){
      board[i] = "";
    }
  }

  const getBoard = function(){
    return [...board];
  }

  return {setCell, resetBoard, getBoard};
})();

function Player(name, mark){
  return {name, mark}
}

const Game = (function(){
  let player1 = null;
  let player2 = null;
  let currentPlayer = null;
  let isGameRunning = false;
  let winner = null;
  
  const gameBegin = function(playerName1, playerName2, starter=1){
    Gameboard.resetBoard();
    winner = null;
    isGameRunning = true;
    player1 = Player(playerName1, 'x');
    player2 = Player(playerName2, 'o');
    if(starter === 1){
      currentPlayer = player1;
    } else if(starter === 2){
      currentPlayer = player2;
    }
    return
  }

  const checkWin = function(){
    const board = Gameboard.getBoard();
    if((board[0] !== "") && (board[0] === board[1]) && (board[1] === board[2])) return true;
    if((board[3] !== "") && (board[3] === board[4]) && (board[4] === board[5])) return true;
    if((board[6] !== "") && (board[6] === board[7]) && (board[7] === board[8])) return true;
    if((board[0] !== "") && (board[0] === board[3]) && (board[3] === board[6])) return true;
    if((board[1] !== "") && (board[1] === board[4]) && (board[4] === board[7])) return true;
    if((board[2] !== "") && (board[2] === board[5]) && (board[5] === board[8])) return true;
    if((board[0] !== "") && (board[0] === board[4]) && (board[4] === board[8])) return true;
    if((board[2] !== "") && (board[2] === board[4]) && (board[4] === board[6])) return true;
    return false;
  }

  const changePlayer = function(){
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  const playTurn = function(position){
    if(!isGameRunning) return "game over";
    if(Gameboard.setCell(position, currentPlayer.mark)){
      if(checkWin()){
        winner = currentPlayer;
        isGameRunning = false;
        return `${currentPlayer.name} win`;
      }
      if(!Gameboard.getBoard().includes("")) return "tie";
      changePlayer();
      return "ok";
    }
    return "taken";
  }

  return {gameBegin, playTurn};
})();


