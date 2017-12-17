import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';
import { environment as env } from '@env/environment';
import { login, logout, selectorAuth } from '@app/core';
import { map } from 'rxjs/operators/map';
import { selectorSettings } from '@app/settings';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'ndfsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  // TODO EXTRACT
  navigation = [
    {link: 'notes', label: 'Notes'},
    {link: 'tools', label: 'Tools'},
    {link: 'todos', label: 'Todos'},
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];

  isAuthenticated;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title) {}

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

    this.store.select(selectorAuth).pipe(takeUntil(this.unsubscribe$)).subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));

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

  onLoginClick() {
    this.store.dispatch(login());
  }

  onLogoutClick() {
    this.store.dispatch(logout());
  }
}
