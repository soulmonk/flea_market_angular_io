import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

import {actionChangeTheme, selectorSettings} from '../settings.reducer';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {
  theme: string;
  themes = [
    {value: 'DEFAULT-THEME', label: 'Default'},
    {value: 'LIGHT-THEME', label: 'Light'},
    {value: 'BLACK-THEME', label: 'Black'}
  ];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<any>) {
    store.select(selectorSettings).pipe(takeUntil(this.unsubscribe$)).subscribe(({theme}) => (this.theme = theme));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onThemeSelect({value}) {
    this.store.dispatch(actionChangeTheme(value));
  }
}
