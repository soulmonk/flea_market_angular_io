import {Injectable} from '@angular/core';

declare let isDebug;

// can be static
@Injectable()
export class DebugService {

  static instance;

  private _countOfComponents = new Map<string, number>();

  private _countChanges = new Map<string, number>();

  static isDebug() {
    return isDebug;
  }

  constructor() {}

  reset() {
    this._countChanges = new Map();
    this._countOfComponents = new Map();
  }

  incCountOfComponents(componentName) {
    let prev = 0;
    if (this._countOfComponents.has(componentName)) {
      prev = this._countOfComponents.get(componentName);
    }
    this._countOfComponents.set(componentName, prev + 1);
  }

  get countOfComponents(): Map<string, number> {
    return this._countOfComponents;
  }

  get countChanges(): Map<string, number> {
    return this._countChanges;
  }

  incCountChanges(componentName) {
    let prev = 0;
    if (this._countChanges.has(componentName)) {
      prev = this._countChanges.get(componentName);
    }
    this._countChanges.set(componentName, prev + 1);
  }
}
