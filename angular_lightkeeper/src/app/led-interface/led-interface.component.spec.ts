import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedInterfaceComponent } from './led-interface.component';

describe('LedInterfaceComponent', () => {
  let component: LedInterfaceComponent;
  let fixture: ComponentFixture<LedInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
