import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveHousesComponent } from './live-houses.component';

describe('LiveHousesComponent', () => {
  let component: LiveHousesComponent;
  let fixture: ComponentFixture<LiveHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveHousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
