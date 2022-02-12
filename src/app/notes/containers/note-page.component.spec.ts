import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotePageComponent } from './note-page.component';

describe('NotesComponent', () => {
  let component: NotePageComponent;
  let fixture: ComponentFixture<NotePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
