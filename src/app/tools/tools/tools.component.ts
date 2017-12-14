import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  tools = [
    { link: 'random-string', label: 'Random String' },
  ];

  constructor() { }

  ngOnInit() {}

}
