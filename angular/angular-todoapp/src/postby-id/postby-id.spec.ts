import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostbyId } from './postby-id';

describe('PostbyId', () => {
  let component: PostbyId;
  let fixture: ComponentFixture<PostbyId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostbyId],
    }).compileComponents();

    fixture = TestBed.createComponent(PostbyId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
