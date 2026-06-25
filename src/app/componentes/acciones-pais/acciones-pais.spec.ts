import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesPais } from './acciones-pais';

describe('AccionesPais', () => {
  let component: AccionesPais;
  let fixture: ComponentFixture<AccionesPais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesPais],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesPais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
