import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotesService } from './notes/notes.service';
import { NotesComponent } from './notes/notes.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    NotesComponent
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
