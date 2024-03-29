import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {DebugService} from './debug.service';
import {environment} from '@env';
import {UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'ndfsm-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent implements OnInit {

  // private _timeout: any;
  // private _openWord: string;

  isEnabled = DebugService.isDebug() && !environment.production;
  open = false;

  form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private _debugService: DebugService, private _changeDetectorRef: ChangeDetectorRef) {
  }

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

  formErrors () {
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  ngOnInit() {
    setInterval(() => {
      this.open = !!(<any> window).debugDialogOpen;
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
    (<any> window).debugDialogOpen = false;
  }

}
