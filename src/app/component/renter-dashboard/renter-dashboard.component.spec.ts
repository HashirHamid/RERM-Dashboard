import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterDashboardComponent } from './renter-dashboard.component';

describe('ResellerDashboardComponent', () => {
  let component: RenterDashboardComponent;
  let fixture: ComponentFixture<RenterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
