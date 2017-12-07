import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSnackBar() {
    this.snackBar.open('Cool action', 'action', {
      // duration: Infinity,
      verticalPosition: 'top'
    });
  }
}
