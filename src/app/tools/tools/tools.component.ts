import {Component} from '@angular/core';

@Component({
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {

  tools = [
    {link: 'random-string', label: 'Random String'},
    {link: 'links', label: 'Links'},
  ];

  constructor() {}
}
