import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    HttpClientModule,
    AppRoutingModule,
    HeaderComponent,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
