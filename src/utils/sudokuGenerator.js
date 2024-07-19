export default class SudokuGenerator {
  constructor(size, numToRemove) {
    this.size = size;
    this.numToRemove = numToRemove;
    
    const SRsize = Math.sqrt(size); 
    this.SRsize = Math.floor(SRsize);

    this.matrix = Array.from({
      length: size
    }, () => Array.from({
      length: size
    }, () => 0));

    this.solution = Array.from({
      length: size
    }, () => Array.from({
      length: size
    }, () => 0));

    this.matrixStart = Array.from({
      length: size
    }, () => Array.from({
      length: size
    }, () => 0));

    this.fillValues();
  }

  fillValues() {
    this.fillDiagonal();
    this.fillRemaining(0, this.SRsize);
    this.solution = this.matrix.map(row => [...row]);
    this.removeKDigits();
    this.matrixStart = this.matrix.map(row => [...row]);
  }

  fillDiagonal() {
    for (let i = 0; i < this.size; i += this.SRsize) {
      this.fillBox(i, i);
    }
  }

  unUsedInBox(rowStart, colStart, num) {
    for (let i = 0; i < this.SRsize; i++) {
      for (let j = 0; j < this.SRsize; j++) {
        if (this.matrix[rowStart + i][colStart + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  fillBox(row, col) {
    let num = 0;
    for (let i = 0; i < this.SRsize; i++) {
      for (let j = 0; j < this.SRsize; j++) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          num = this.randomGenerator(this.size);
          if (this.unUsedInBox(row, col, num)) {
            break;
          }
        }
        this.matrix[row + i][col + j] = num;
      }
    }
  }

  randomGenerator(num) {
    return Math.floor(Math.random() * num) + 1;
  }

  checkIfSafe(i, j, num) {
    return (
      this.unUsedInRow(i, num) &&
      this.unUsedInCol(j, num) &&
      this.unUsedInBox(i - i % this.SRsize, j - j % this.SRsize, num)
    );
  }

  unUsedInRow(i, num) {
    for (let j = 0; j < this.size; j++) {
      if (this.matrix[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  unUsedInCol(j, num) {
    for (let i = 0; i < this.size; i++) {
      if (this.matrix[i][j] === num) {
        return false;
      }
    }
    return true;
  }

  fillRemaining(i, j) {
    if (i === this.size - 1 && j === this.size) {
      return true;
    }

    if (j === this.size) {
      i += 1;
      j = 0;
    }

    if (this.matrix[i][j] !== 0) {
      return this.fillRemaining(i, j + 1);
    }

    for (let num = 1; num <= this.size; num++) {
      if (this.checkIfSafe(i, j, num)) {
        this.matrix[i][j] = num;
        if (this.fillRemaining(i, j + 1)) {
          return true;
        }
        this.matrix[i][j] = 0;
      }
    }

    return false;
  }

  print() {
    for (let i = 0; i < this.size; i++) {
      console.log(this.matrix[i].join(" "));
    }
  }

  removeKDigits() {
    let count = this.numToRemove;
    while (count !== 0) {
      let i = Math.floor(Math.random() * this.size);
      let j = Math.floor(Math.random() * this.size);
      if (this.matrix[i][j] !== 0) {
        count--;
        this.matrix[i][j] = 0;
      }
    }

    return;
  }
}