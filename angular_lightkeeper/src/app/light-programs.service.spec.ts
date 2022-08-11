import { TestBed } from '@angular/core/testing';

import { LightProgramsService } from './light-programs.service';

describe('LightProgramsService', () => {
  let service: LightProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
