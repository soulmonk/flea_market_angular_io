import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoreModule } from 'app/core/index';
import { SharedModule } from 'app/shared/index';

// import { ExamplesModule } from '../examples.module';

import { TodosComponent } from './todo.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule, SharedModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
