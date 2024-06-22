import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCreditoComponent } from './detalles-credito.component';

describe('DetallesCreditoComponent', () => {
  let component: DetallesCreditoComponent;
  let fixture: ComponentFixture<DetallesCreditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesCreditoComponent]
    });
    fixture = TestBed.createComponent(DetallesCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
