import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFigureComponent } from './current-figure.component';

describe('CurrentFigureComponent', () => {
  let component: CurrentFigureComponent;
  let fixture: ComponentFixture<CurrentFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentFigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
