import { TestBed } from '@angular/core/testing';

import { Connect4Service } from './connect4.service';

describe('ReversiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Connect4Service = TestBed.get(Connect4Service);
    expect(service).toBeTruthy();
  });
});
