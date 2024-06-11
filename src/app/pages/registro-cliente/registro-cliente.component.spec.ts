import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroClienteComponent } from './registro-cliente.component';

describe('RegistroClienteComponent', () => {
  let component: RegistroClienteComponent;
  let fixture: ComponentFixture<RegistroClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroClienteComponent]
    });
    fixture = TestBed.createComponent(RegistroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
