import {Injectable} from '@angular/core';
import {environment} from '@env';

@Injectable({providedIn: 'root'})
export class LoggerService {

  constructor() {
  }

  log(...args) {
    if (environment.log) {
      console.log(...args);
    }
  }
}
