import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAccion } from './boton-accion';

describe('BotonAccion', () => {
  let component: BotonAccion;
  let fixture: ComponentFixture<BotonAccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAccion],
    }).compileComponents();

    fixture = TestBed.createComponent(BotonAccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
