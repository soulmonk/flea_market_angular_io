import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as todoActions from '../actions/todo';

import {
  actionAddTodo,
  actionFilterTodos,
  actionPersistTodos,
  actionRemoveDoneTodos,
  actionToggleTodo,
  selectorTodos,
  TodoFilter
} from '../reducers/todo.reducer';
import { ITodo, Todo } from 'app/todos/models/todo';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'ndfsm-todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  todos: any;
  newTodo = '';

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new todoActions.Load());

    this.store.select(selectorTodos).pipe(takeUntil(this.unsubscribe$)).subscribe(todos => {
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get filteredTodos() {
    const filter = this.todos.filter;
    if (filter === 'ALL') {
      return this.todos.items;
    } else {
      const predicate = filter === 'DONE' ? t => t.done : t => !t.done;
      return this.todos.items.filter(predicate);
    }
  }

  get isAddTodoDisabled() {
    return this.newTodo.length < 4;
  }

  get isRemoveDoneTodosDisabled() {
    return this.todos.items.filter(item => item.done).length === 0;
  }

  onNewTodoChange(newTodo: string) {
    this.newTodo = newTodo;
  }

  onNewTodoClear() {
    this.newTodo = '';
  }

  onAddTodo() {
    this.store.dispatch(new todoActions.AddTodo(new Todo(this.newTodo)));
    this.newTodo = '';
  }

  onToggleTodo(todo: ITodo) {
    this.store.dispatch(actionToggleTodo(todo._id));
  }

  onRemoveDoneTodos() {
    this.store.dispatch(actionRemoveDoneTodos());
  }

  onFilterTodos(filter: TodoFilter) {
    this.store.dispatch(actionFilterTodos(filter));
  }
}
