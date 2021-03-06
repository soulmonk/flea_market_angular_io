import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomStringComponent } from './random-string.component';

describe('LinksComponent', () => {
  let component: RandomStringComponent;
  let fixture: ComponentFixture<RandomStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
