import {SwUpdate} from '@angular/service-worker';
import {Injectable} from '@angular/core';

@Injectable()
export class PromptUpdateService {

  constructor(updates: SwUpdate) {
    if (!updates.isEnabled) {
      return;
    }
    updates.versionUpdates.subscribe(event => {
      if (confirm("Update SW")) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
