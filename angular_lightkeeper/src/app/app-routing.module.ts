import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FigureListComponent } from "./figure-list/figure-list.component";
import {CurrentFigureComponent} from "./current-figure/current-figure.component";
import {HomeComponent} from "./home/home.component";
import {LedInterfaceComponent} from "./led-interface/led-interface.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'figures', component: FigureListComponent },
  { path: 'current', component: CurrentFigureComponent },
  { path: 'led_interface', component: LedInterfaceComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
