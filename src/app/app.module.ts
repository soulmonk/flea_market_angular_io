import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.routes';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsModule } from '@app/settings';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    // core & shared
    CoreModule,
    SharedModule,

    SettingsModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
