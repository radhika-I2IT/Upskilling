import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailByid } from './user-detail-byid';

describe('UserDetailByid', () => {
  let component: UserDetailByid;
  let fixture: ComponentFixture<UserDetailByid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailByid],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailByid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
