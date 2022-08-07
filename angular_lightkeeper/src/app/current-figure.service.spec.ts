import { TestBed } from '@angular/core/testing';

import { CurrentFigureService } from './current-figure.service';

describe('CurrentFigureService', () => {
  let service: CurrentFigureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentFigureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
