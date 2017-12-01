import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe((notes: any[]) => {
      this.notes = notes;
    });
  }

}
