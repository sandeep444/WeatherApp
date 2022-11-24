import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDashBoardComponent } from './weather-dash-board.component';

describe('WeatherDashBoardComponent', () => {
  let component: WeatherDashBoardComponent;
  let fixture: ComponentFixture<WeatherDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDashBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
