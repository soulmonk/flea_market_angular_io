import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';
import { MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { NotesModule } from './notes/notes.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    MatToolbarModule,
    MatSnackBarModule,
    SharedModule,
    NotesModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
