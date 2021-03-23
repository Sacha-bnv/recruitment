import { Observable } from 'rxjs';

export enum C {Empty, Player1, Player2}
export type Turn  = C.Player1 | C.Player2;

export type L     = [C, C, C, C, C, C, C];
export type Board = [L, L, L, L, L, L];

export interface TileCoords {
  x: number;
  y: number;
}
export type PlayImpact = TileCoords[];

export interface P4ModelInterface {
  getBoard(): Board;
  CanPlay(x: number, y: number): PlayImpact; //Si le joueur peut joueur sur la case ou il a cliqué
  turn(): Turn; //Renvoi le joueur courant
  play(i: number, j: number): void; //Méthodes permettant de joueur sur une case de coordonnées i, j
  getObservable(): Observable<P4ModelInterface>;
}

export interface TileCoords {
  x: number;
  y: number;
}

export function CtoString(c: C): string {
  switch(c) {
    case C.Empty: return 'Empty';
    case C.Player1: return 'Player1';
    case C.Player2: return 'Player2';
  }
}
