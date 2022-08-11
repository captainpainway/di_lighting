import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLightProgramComponent } from './edit-light-program.component';

describe('EditLightProgramComponent', () => {
  let component: EditLightProgramComponent;
  let fixture: ComponentFixture<EditLightProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLightProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLightProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
