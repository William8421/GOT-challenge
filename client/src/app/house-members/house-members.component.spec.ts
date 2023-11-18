import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMembersComponent } from './house-members.component';

describe('HouseMembersComponent', () => {
  let component: HouseMembersComponent;
  let fixture: ComponentFixture<HouseMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseMembersComponent]
    });
    fixture = TestBed.createComponent(HouseMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
