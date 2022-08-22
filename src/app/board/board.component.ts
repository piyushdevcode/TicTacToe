import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boxes: string[] = [];
  winner!: string;
  xIsNext: boolean = true;  

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }
  newGame(){
    this.boxes = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }
  
}
