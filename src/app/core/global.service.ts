import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class GlobalService {

  private subject = new Subject<any>();

  constructor() { }

  getSubject(): Observable<any> {
    return this.subject.asObservable();
  }

  someFn() {
    setInterval(() => this.subject.next('Cool value'), 1000);
  }

}
