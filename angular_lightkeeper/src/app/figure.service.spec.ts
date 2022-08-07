import { TestBed } from '@angular/core/testing';

import { FigureService } from './figure.service';

describe('FigureService', () => {
  let service: FigureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
