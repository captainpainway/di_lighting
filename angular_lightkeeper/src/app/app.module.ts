import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from "ngx-color-picker";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppComponent } from './app.component';
import { FigureListComponent } from './figure-list/figure-list.component';
import { FigureComponent } from './figure/figure.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentFigureComponent } from './current-figure/current-figure.component';
import { HomeComponent } from './home/home.component';
import { LedInterfaceComponent } from './led-interface/led-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    FigureListComponent,
    FigureComponent,
    CurrentFigureComponent,
    HomeComponent,
    LedInterfaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
