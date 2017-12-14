import { Component, OnInit } from '@angular/core';
import { randomString } from '@app/utils';

@Component({
  templateUrl: './random-string.component.html',
  styleUrls: ['./random-string.component.scss']
})
export class RandomStringComponent implements OnInit {
  itemCount = 5;
  itemLength = 15;
  genItems: any[] = [];

  constructor() {}

  ngOnInit() {}

  reset() {
    this.genItems = [];
  }

  generate() {
    const newItems = [];
    for (let i = 0; i < this.itemCount; i++) {
      newItems.push(randomString(this.itemLength));
    }
    this.genItems = newItems;
  }
}
