import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlingGuestComponent } from './handling-guest.component';

describe('HandlingGuestComponent', () => {
  let component: HandlingGuestComponent;
  let fixture: ComponentFixture<HandlingGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandlingGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandlingGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
