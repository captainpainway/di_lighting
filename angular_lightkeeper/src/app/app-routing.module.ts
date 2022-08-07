import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FigureListComponent } from "./figure-list/figure-list.component";
import {CurrentFigureComponent} from "./current-figure/current-figure.component";

const routes: Routes = [
  { path: 'figures', component: FigureListComponent },
  { path: 'current', component: CurrentFigureComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
