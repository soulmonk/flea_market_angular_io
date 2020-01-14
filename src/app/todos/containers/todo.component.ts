import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as todoActions from '../actions/todo';

import {actionFilterTodos, actionRemoveDoneTodos, actionToggleTodo, selectorTodos, TodoFilter} from '../reducers/todo.reducer';
import {ITodo, Todo} from '@app/todos/models/todo';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import * as fromAuth from '@app/auth/reducers';

@Component({
  selector: 'ndfsm-todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: any;
  newTodo = '';
  loggedIn$: Observable<boolean>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public store: Store<any>) {

    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
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
