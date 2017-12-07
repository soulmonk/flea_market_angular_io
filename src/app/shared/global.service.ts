import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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
