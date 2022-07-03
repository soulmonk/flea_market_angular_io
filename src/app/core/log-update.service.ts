import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {LocalStorageService} from './local-storage/local-storage.service';

@Injectable()
export class LogUpdateService {

  constructor(updates: SwUpdate, localStorageService: LocalStorageService) {
    if (!updates.isEnabled) {
      return;
    }
    updates.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          localStorageService.setItem('APP_SW_VERSION', evt.latestVersion.hash);
          localStorageService.setItem('APP_SW_HAS_UPDATE', evt.currentVersion.hash !== evt.latestVersion.hash);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }
}
