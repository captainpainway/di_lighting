import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLightProgramComponent } from './add-light-program.component';

describe('AddLightProgramComponent', () => {
  let component: AddLightProgramComponent;
  let fixture: ComponentFixture<AddLightProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLightProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLightProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
