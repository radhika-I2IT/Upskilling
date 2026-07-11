import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calcbtns } from './calcbtns';

describe('Calcbtns', () => {
  let component: Calcbtns;
  let fixture: ComponentFixture<Calcbtns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calcbtns],
    }).compileComponents();

    fixture = TestBed.createComponent(Calcbtns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
