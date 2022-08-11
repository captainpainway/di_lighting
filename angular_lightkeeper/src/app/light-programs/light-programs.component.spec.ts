import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightProgramsComponent } from './light-programs.component';

describe('LightProgramsComponent', () => {
  let component: LightProgramsComponent;
  let fixture: ComponentFixture<LightProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
