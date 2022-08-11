import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FigureListComponent } from "./figure-list/figure-list.component";
import {CurrentFigureComponent} from "./current-figure/current-figure.component";
import {HomeComponent} from "./home/home.component";
import {LightProgramsComponent} from "./light-programs/light-programs.component";
import {EditLightProgramComponent} from "./edit-light-program/edit-light-program.component";
import {AddLightProgramComponent} from "./add-light-program/add-light-program.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'figures', component: FigureListComponent },
  { path: 'current', component: CurrentFigureComponent },
  { path: 'light_programs', component: LightProgramsComponent },
  { path: 'light_programs/edit/:scheme', component: EditLightProgramComponent },
  { path: 'light_programs/add', component: AddLightProgramComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
