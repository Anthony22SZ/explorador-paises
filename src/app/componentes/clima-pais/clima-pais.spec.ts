import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaPais } from './clima-pais';

describe('ClimaPais', () => {
  let component: ClimaPais;
  let fixture: ComponentFixture<ClimaPais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimaPais],
    }).compileComponents();

    fixture = TestBed.createComponent(ClimaPais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
