import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as fromAuth from '@app/auth/reducers';
import * as Auth from '@app/auth/actions/auth';
import {User} from '@app/auth/models/user';

@Component({
  selector: 'ndfsm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<any>,) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.userName$ = this.store.pipe(select(fromAuth.getUser));
  }

  onLogoutClick() {
    this.store.dispatch(new Auth.Logout());
  }

}
