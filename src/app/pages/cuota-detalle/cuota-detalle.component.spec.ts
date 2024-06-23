import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaDetalleComponent } from './cuota-detalle.component';

describe('CuotaDetalleComponent', () => {
  let component: CuotaDetalleComponent;
  let fixture: ComponentFixture<CuotaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuotaDetalleComponent]
    });
    fixture = TestBed.createComponent(CuotaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
