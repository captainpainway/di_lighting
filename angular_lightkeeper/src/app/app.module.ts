import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from "ngx-color-picker";

import { AppComponent } from './app.component';
import { FigureListComponent } from './figure-list/figure-list.component';
import { FigureComponent } from './figure/figure.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentFigureComponent } from './current-figure/current-figure.component';
import { HomeComponent } from './home/home.component';
import { LightProgramsComponent } from './light-programs/light-programs.component';
import { EditLightProgramComponent } from './edit-light-program/edit-light-program.component';
import { AddLightProgramComponent } from './add-light-program/add-light-program.component';

@NgModule({
  declarations: [
    AppComponent,
    FigureListComponent,
    FigureComponent,
    CurrentFigureComponent,
    HomeComponent,
    LightProgramsComponent,
    EditLightProgramComponent,
    AddLightProgramComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
