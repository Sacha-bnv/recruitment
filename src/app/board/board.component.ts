import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Connect4Service} from '../connect4.service';
import { Board, C, L, P4ModelInterface } from '../connect4Definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  constructor(private c4s: Connect4Service) { }

  ngOnInit() {
  }

  test = false;
  
  getBoard() : Board {
    return this.c4s.getBoard();
  }

  notEmpty(c: C) : boolean {
    return c !== C.Empty;
  }

  getPlayer(c: C) : C {
    return c;
  }

  canPlay(i:number, j:number) : boolean {
    return this.c4s.CanPlay(i, j).length > 0;
  }

  play(i:number ,j:number) : void {
    this.c4s.play(i, j);
  }

  get observableReversi(): Observable<P4ModelInterface> {
    return this.c4s.getObservable();
  }

  trackIndex(index:number, element:any): number {
    return index;
  }

}
