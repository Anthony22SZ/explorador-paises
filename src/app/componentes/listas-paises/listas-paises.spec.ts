import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasPaises } from './listas-paises';

describe('ListasPaises', () => {
  let component: ListasPaises;
  let fixture: ComponentFixture<ListasPaises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasPaises],
    }).compileComponents();

    fixture = TestBed.createComponent(ListasPaises);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
