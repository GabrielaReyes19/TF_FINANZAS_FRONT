import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioModificarComponent } from './inventario-modificar.component';

describe('InventarioModificarComponent', () => {
  let component: InventarioModificarComponent;
  let fixture: ComponentFixture<InventarioModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioModificarComponent]
    });
    fixture = TestBed.createComponent(InventarioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
