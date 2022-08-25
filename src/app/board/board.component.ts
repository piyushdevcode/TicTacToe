import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boxes: string[] = [];
  winner: string | null = null;
  xIsNext: boolean = true;
  movesCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }
  newGame() {
    this.boxes = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.movesCount = 0;
  }
  get currentPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }
  doMove(index: number) {
    if (!this.boxes[index] && !this.winner) {
      this.boxes.splice(index, 1, this.currentPlayer);
      this.movesCount += 1;
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.findWinner();
  }
  findWinner() {
    let win_possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win_possibilities.length; ++i) {
      const [idx1, idx2, idx3] = win_possibilities[i];

      if (
        this.boxes[idx1] && // check box is not NULL
        this.boxes[idx1] === this.boxes[idx2] &&
        this.boxes[idx2] === this.boxes[idx3]
      ) {
        // change color of winning cells

        // giving somedelay for proper rendering 
        setTimeout(()=>{
          this.toggleWinCell(win_possibilities[i]);
        },500)
        return this.boxes[idx1]; // get the Winner's Symbol
      }
    }
    if (this.movesCount === 9) {
      return 'D';
    }
    return null;
  }
  // toggle the winning cell color
  toggleWinCell(winIndexes:number[]){
    const boxCells = document.querySelector('.board');
    winIndexes.forEach(val=>{
      const ele = boxCells?.children[val];
        // console.log("WINNING INDEX: ",val,"ele: ",ele);
        ele?.classList.add('winning-cells');
    })
  }
}
