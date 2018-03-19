import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';
import { environment as env } from '@env/environment';
import { map } from 'rxjs/operators/map';
import { selectorSettings } from '@app/settings';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '@app/auth/reducers';
import * as Auth from '@app/auth/actions/auth';

@Component({
  selector: 'ndfsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass;
  // TODO EXTRACT
  navigation = [
    {link: 'notes', label: 'Notes'},
    {link: 'tools', label: 'Tools'},
    {link: 'todos', label: 'Todos'}
  ];
  navigationSideMenu = [
    ...this.navigation,
    {link: 'settings', label: 'Settings'}
  ];
  loggedIn$: Observable<boolean>;
  isAuthenticated;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  ngOnInit() {
    // TODO extract
    document.getElementById('global-spinner').setAttribute('style', 'display: none;');

    this.store.select(selectorSettings).pipe(
      takeUntil(this.unsubscribe$),
      map(({theme}) => theme.toLowerCase())
    ).subscribe(theme => {
      this.componentCssClass = theme;
      this.overlayContainer.getContainerElement().classList.add(theme);
    });

    this.router.events.pipe(filter(event => event instanceof ActivationEnd)).subscribe((event: ActivationEnd) => {
      let lastChild = event.snapshot;
      while (lastChild.children.length) {
        lastChild = lastChild.children[0];
      }
      const {title} = lastChild.data;
      this.titleService.setTitle(
        title ? `${title} - ${env.appName}` : env.appName
      );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLogoutClick() {
    this.store.dispatch(new Auth.Logout());
  }
}
