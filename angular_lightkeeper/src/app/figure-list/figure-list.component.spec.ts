import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureListComponent } from './figure-list.component';

describe('FigureListComponent', () => {
  let component: FigureListComponent;
  let fixture: ComponentFixture<FigureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigureListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FigureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
