import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { C } from '../connect4Definitions';

@Component({
  selector: 'app-pion',
  templateUrl: './pion.component.html',
  styleUrls: ['./pion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PionComponent implements OnInit {
  @Input() player: C;

  constructor() {
  }

  ngOnInit() {
  }



}
