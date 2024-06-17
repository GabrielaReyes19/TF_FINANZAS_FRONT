import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirCreditoComponent } from './anadir-credito.component';

describe('AnadirCreditoComponent', () => {
  let component: AnadirCreditoComponent;
  let fixture: ComponentFixture<AnadirCreditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnadirCreditoComponent]
    });
    fixture = TestBed.createComponent(AnadirCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
