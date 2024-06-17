import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAnadirComponent } from './inventario-anadir.component';

describe('InventarioAnadirComponent', () => {
  let component: InventarioAnadirComponent;
  let fixture: ComponentFixture<InventarioAnadirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioAnadirComponent]
    });
    fixture = TestBed.createComponent(InventarioAnadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
