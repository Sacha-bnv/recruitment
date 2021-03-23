import { Injectable } from '@angular/core';
import {Board, C, P4ModelInterface, TileCoords, Turn} from './connect4Definitions';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Connect4Service implements P4ModelInterface {
  private board: Board;
  private subject = new BehaviorSubject<P4ModelInterface>(this);
  readonly obs = this.subject.asObservable();
  currentTurn: Turn;

  constructor() {
    this.initBoard();
  }

  getObservable(): Observable<P4ModelInterface> {
    return this.obs;
  }

  getBoard() {
    return this.board;
  }

  CanPlay(x, y): TileCoords[] {
    //Première ligne
    if (x == 5 && this.board[x][y] === C.Empty) {
      const L: TileCoords[] = [];
      const tilesToFlip: TileCoords[] = [];
      L.push({x: x, y: y});
      tilesToFlip.push( ...L );
      return tilesToFlip;
    }
    if (this.board[x][y] === C.Empty) {
      const tilesToFlip: TileCoords[] = [];
      //Parcourir la direction du haut à partir de la case x, y
      const D = [ [1, 0] ];
      D.forEach( ([dx, dy]) => {
        let px = x;
        let py = y;
        const L: TileCoords[] = [];
          px += dx; py += dy;
          //Est ce que je suis toujours sur le plateau ?
          if (this.board[px] && this.board[px][py] !== undefined) { 
            L.push({x: px, y: py});
          }

        if ((this.board[px] && this.board[px][py] !== C.Empty)) {
          tilesToFlip.push( ...L );
        }
                
      });

      return tilesToFlip;
    }
    return [];
  }
  
  turn() {
    return this.currentTurn;
  }

  play(i, j) {
    this.estGagnant(i, j);
    const L = this.CanPlay(i, j);
    if (L.length) {
      this.board[i][j] = this.turn();
      this.currentTurn = this.turn() === C.Player1 ? C.Player2 : C.Player1;
      this.subject.next(this);
    }
  }

  //Définition des conditions de victoire (ex : j1d1 = victoire du joueur 1 en ayant aligné 4 pions en diagonale)
  estGagnant(i, j) {

    let j1h1, j2h1, j1h2, j2h2, j1v, j2v, j1d1, j2d1, j1d2, j2d2 = false;

    if (this.board[i][j+3] !== undefined) {
      j1h1 = this.board[i][j+1] === C.Player1 && this.board[i][j+2] === C.Player1 && this.board[i][j+3] === C.Player1;
      j2h1 = this.board[i][j+1] === C.Player2 && this.board[i][j+2] === C.Player2 && this.board[i][j+3] === C.Player2;
    }
    if (this.board[i][j-3] !== undefined) {
      j1h2 = this.board[i][j-1] === C.Player1 && this.board[i][j-2] === C.Player1 && this.board[i][j-3] === C.Player1;    
      j2h2 = this.board[i][j-1] === C.Player2 && this.board[i][j-2] === C.Player2 && this.board[i][j-3] === C.Player2;
    }
    if (this.board[i+3] && this.board[i+3][j] !== undefined) {
      j1v = this.board[i+1][j] === C.Player1 && this.board[i+2][j] === C.Player1 && this.board[i+3][j] === C.Player1;
      j2v = this.board[i+1][j] === C.Player2 && this.board[i+2][j] === C.Player2 && this.board[i+3][j] === C.Player2;
    }
    if (this.board[i+3] && this.board[i+3][j+3] !== undefined) {
      j1d1 = this.board[i+1][j+1] === C.Player1 && this.board[i+2][j+2] === C.Player1 && this.board[i+3][j+3] === C.Player1;
      j2d1 = this.board[i+1][j+1] === C.Player2 && this.board[i+1][j+2] === C.Player2 && this.board[i+1][j+3] === C.Player2;
    }
    if (this.board[i+3] && this.board[i+3][j-3] !== undefined) {
      j1d2 = this.board[i+1][j-1] === C.Player1 && this.board[i+1][j-2] === C.Player1 && this.board[i+1][j-3] === C.Player1;    
      j2d2 = this.board[i+1][j-1] === C.Player2 && this.board[i+1][j-2] === C.Player2 && this.board[i+1][j-3] === C.Player2;
    }

    if (j1h1 || j1h2 || j1v || j1d1 || j1d2) {
      console.log('Le joueur 1 (pions jaunes) a gagné !');
    } else if (j2h1 || j2h2 || j2v || j2d1 || j2d2) {
      console.log('Le joueur 2 (pions rouges) a gagné !');
    }
  }

  private initBoard() {
    this.currentTurn = C.Player1;
    this.board = new Array(6).fill(0).map(l => new Array(7).fill(C.Empty)) as Board;
  }

}
