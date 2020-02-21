import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'

import {
  selectorTodos,
} from '../reducers/todo.reducer'
import { ITodo, Todo } from '@app/todos/models/todo'
import { takeUntil } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'
import * as fromAuth from '@app/auth/reducers'
import {
  Add,
  Filter,
  Load,
  Remove,
  TodoFilter,
  Update,
} from '@app/todos/actions/todo'

@Component({
  selector: 'ndfsm-todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: any
  newTodo = ''
  items: Todo[];
  loggedIn$: Observable<boolean>
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor (public store: Store<any>) {

    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn))

    this.store.pipe(select(fromAuth.getLoggedIn))
  }

  filteredTodos () {
    const filter = this.todos.filter
    this.items = this.todos.items
    if (filter !== 'ALL') {
      const predicate = filter === 'DONE' ? t => t.done : t => !t.done
      this.items = this.items.filter(predicate)
    }
  }

  get isAddTodoDisabled () {
    return this.newTodo.length < 4
  }

  ngOnInit () {
    this.store.dispatch(new Load())

    this.store.select(selectorTodos).
      pipe(takeUntil(this.unsubscribe$)).
      subscribe(todos => {
        this.todos = todos
        this.filteredTodos()
      })
  }

  ngOnDestroy (): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  onNewTodoChange (newTodo: string) {
    this.newTodo = newTodo
  }

  onNewTodoClear () {
    this.newTodo = ''
  }

  onAddTodo () {
    this.store.dispatch(new Add(new Todo(this.newTodo)))
    this.newTodo = ''
  }

  onToggleTodo (todo: ITodo) {
    this.store.dispatch(
      new Update({ id: todo._id, data: { done: !todo.done } }))

    // TODO on error revert changes
  }

  onRemoveTodos (todo: ITodo) {
    this.store.dispatch(new Remove(todo._id))
  }

  onFilterTodos (filter: TodoFilter) {
    if (filter === this.todos.filter) {
      return;
    }
    this.store.dispatch(new Filter(filter))
  }
}
