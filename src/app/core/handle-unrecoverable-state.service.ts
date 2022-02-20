import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable()
export class HandleUnrecoverableStateService {
  constructor(updates: SwUpdate) {
    if (!updates.isEnabled) {
      return;
    }
    updates.unrecoverable.subscribe(event => {
      console.log(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.'
      );
    });
  }
}
