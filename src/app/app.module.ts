import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './shared/components/header/header.component';
import { ApiModule } from './shared/services/api/api.module';
import { InvoicesListEffects } from './containers/invoices-list/store/invoices-list.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRoutingModule,
    HeaderComponent,
    ApiModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([InvoicesListEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
