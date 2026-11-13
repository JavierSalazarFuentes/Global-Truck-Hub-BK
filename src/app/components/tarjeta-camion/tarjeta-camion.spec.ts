import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCamion } from './tarjeta-camion';

describe('TarjetaCamion', () => {
  let component: TarjetaCamion;
  let fixture: ComponentFixture<TarjetaCamion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCamion],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaCamion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
