import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {DebugService} from './debug.service';

@Component({
  selector: 'ndfsm-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent implements OnInit {

  // private _timeout: any;
  // private _openWord: string;

  isEnabled = DebugService.isDebug() && process.env.ENV !== 'build:prod';
  open = false;

  constructor(private _debugService: DebugService, private _changeDetectorRef: ChangeDetectorRef) { }
  //
  // @HostListener('document:keypress', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (process.env.ENV !== 'build:dev') {
  //     return;
  //   }
  //   this.open = false;
  //
  //   if (!this._timeout) {
  //     this._timeout = setTimeout(() => {
  //       this._openWord = '';
  //     }, 500);
  //   }
  // }

  ngOnInit() {
    setInterval(() => {
      this.open = !!(<any>window).debugDialogOpen;
    }, 500);

    setInterval(() => {
      this._changeDetectorRef.markForCheck();
    }, 500);
  }

  countOfComponentsKeys() {
    return Array.from(this._debugService.countOfComponents.keys()).sort();
  }

  countOfComponentsValue(key) {
    return this._debugService.countOfComponents.get(key);
  }

  countChangesKeys() {
    return Array.from(this._debugService.countChanges.keys()).sort();
  }

  countChangesValue(key) {
    return this._debugService.countChanges.get(key);
  }

  reset() {
    this._debugService.reset();
    this._changeDetectorRef.markForCheck();
  }

  close() {
    this.open = false;
    (<any>window).debugDialogOpen = false;
  }

}
