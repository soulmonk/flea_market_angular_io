import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivationEnd, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { environment as env } from '@env'
import { selectorSettings } from '@app/settings'
import { OverlayContainer } from '@angular/cdk/overlay'
import * as fromAuth from '@app/auth/reducers'
import * as Auth from '@app/auth/actions/auth'
import { RefreshToken } from '@app/auth/actions/auth'
import { Observable, Subject } from 'rxjs'
import { filter, map, takeUntil } from 'rxjs/operators'
import { User } from '@app/auth/models/user'

@Component({
  selector: 'ndfsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass
  // TODO EXTRACT
  navigation = [
    { link: 'notes', label: 'Notes' },
    { link: 'tools', label: 'Tools' },
    { link: 'todos', label: 'Todos' },
  ]
  navigationDev = [
    { link: 'games', label: 'Games' },
    { link: 'scripts', label: 'Scripts' },
  ]
  navigationUser = [
    { link: 'finance', label: 'Finance'},
  ]
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' },
  ]
  loggedIn$: Observable<boolean>
  userName$: Observable<User>

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor (
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title) {

    this.store.dispatch(new RefreshToken())

    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn))
    this.userName$ = this.store.pipe(select(fromAuth.getUser))
  }

  ngOnInit () {
    // TODO extract
    document.getElementById('global-spinner').
      setAttribute('style', 'display: none;')

    this.store.select(selectorSettings).pipe(
      takeUntil(this.unsubscribe$),
      map(({ theme }) => theme.toLowerCase()),
    ).subscribe(theme => {
      this.componentCssClass = theme
      this.overlayContainer.getContainerElement().classList.add(theme)
    })

    this.router.events.pipe(filter(event => event instanceof ActivationEnd)).
      subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot
        while (lastChild.children.length) {
          lastChild = lastChild.children[0]
        }
        const { title } = lastChild.data
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName,
        )
      })
  }

  ngOnDestroy (): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  onLogoutClick () {
    this.store.dispatch(new Auth.Logout())
  }
}
