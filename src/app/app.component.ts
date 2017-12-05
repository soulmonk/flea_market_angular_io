import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Cool action', 'action', {
      // duration: Infinity,
      verticalPosition: 'top'
    });
  }
}
