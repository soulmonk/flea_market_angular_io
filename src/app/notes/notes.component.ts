import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private notesService: NotesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe((notes: any[]) => {
      this.notes = notes;
    });
  }

  edit(event, note: any = {}) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notesService.save(note).subscribe(data => {
        if (note._id) {
          return;
        }
        this.notes.push(data);
      }, err => {
        console.error('Unable to save note', err);
      });
    });
  }
}
