import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivationEnd, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {environment as env} from '@env';
import {loadTheme, selectorSettings} from '@app/settings';
import {OverlayContainer} from '@angular/cdk/overlay';
import * as fromAuth from '@app/auth/reducers';
import * as Auth from '@app/auth/actions/auth';
import {RefreshToken} from '@app/auth/actions/auth';
import {Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {User} from '@app/auth/models/user';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'ndfsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass;
  // TODO EXTRACT
  navigation = [
    {link: 'tools', label: 'Tools'},
  ];
  // navigationDev = [
  //   { link: 'games', label: 'Games' },
  //   { link: 'scripts', label: 'Scripts' },
  // ]

  // todo move to module
  navigationUser = [
    {
      link: 'finance', label: 'Finance',
      children: [
        {link: 'finance/dashboard', label: 'Dashboard'},
        {link: 'finance/transaction', label: 'Transactions'},
        {link: 'finance/transaction-types', label: 'TransactionTypes'},
        {link: 'finance/cards', label: 'Cards'},
        {link: 'finance/banks', label: 'Banks'},
      ]
    },
  ];
  navigationSideMenu = [
    ...this.navigation,
    {link: 'settings', label: 'Settings'},
  ];
  loggedIn$: Observable<boolean>;
  userName$: Observable<User>;

  isOnline: boolean = true;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title) {

    this.store.dispatch(new RefreshToken(true));
    this.store.dispatch(loadTheme());

    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.userName$ = this.store.pipe(select(fromAuth.getUser));
  }

  ngOnInit() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('../.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));


    // TODO extract
    document.getElementById('global-spinner').setAttribute('style', 'display: none;');

    this.store.select(selectorSettings).pipe(
      takeUntil(this.unsubscribe$),
      map(({theme}) => theme.toLowerCase()),
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
        title ? `${title} - ${env.appName}` : env.appName,
      );
    });
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLogoutClick() {
    this.store.dispatch(new Auth.Logout());
  }
}
