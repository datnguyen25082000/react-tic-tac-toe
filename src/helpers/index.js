export const calculateWinner = (squares, numCol, position) => {
  let arrWin = [];
  let numWin = 3;
  if (numCol >= 5) numWin = 5;

  const row = Math.floor(position / numCol);
  const col = position % numCol;

  let indexRow = row;
  let indexCol = col;

  if (position <= 0) return null;

  // row
  indexRow = row;
  indexCol = col;
  while (indexRow >= 0) {
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;

    indexRow--;
  }

  indexRow = row;
  indexCol = col;
  while (indexRow < numCol - 1) {
    indexRow++;
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
  }

  if (arrWin.length === numWin) {
    return {
      positionWin: arrWin,
      typeWin: squares[position],
    };
  }

  // col
  arrWin = [];
  indexRow = row;
  indexCol = col;
  while (indexCol >= 0) {
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
    indexCol--;
  }

  indexRow = row;
  indexCol = col;
  while (indexCol < numCol - 1) {
    indexCol++;
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
  }

  if (arrWin && arrWin.length === numWin) {
    return {
      positionWin: arrWin,
      typeWin: squares[position],
    };
  }

  // \
  arrWin = [];
  indexRow = row;
  indexCol = col;
  while (indexCol >= 0 && indexRow >= 0) {
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
    indexCol--;
    indexRow--;
  }

  indexRow = row;
  indexCol = col;
  while (indexCol < numCol - 1 && indexRow < numCol - 1) {
    indexCol++;
    indexRow++;
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
  }

  if (arrWin && arrWin.length === numWin) {
    return {
      positionWin: arrWin,
      typeWin: squares[position],
    };
  }

  // /
  arrWin = [];
  indexRow = row;
  indexCol = col;
  while (indexCol <= numCol && indexRow >= 0) {
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
    indexCol++;
    indexRow--;
  }

  indexRow = row;
  indexCol = col;
  while (indexCol >= 1 && indexRow < numCol - 1) {
    indexCol--;
    indexRow++;
    if (squares[indexRow * numCol + indexCol] === squares[position])
      arrWin.push(indexRow * numCol + indexCol);
    else break;
  }

  if (arrWin && arrWin.length === numWin) {
    return {
      positionWin: arrWin,
      typeWin: squares[position],
    };
  }
};
