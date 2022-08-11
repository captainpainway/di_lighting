import { Component, OnInit } from '@angular/core';
import {LightProgram} from "../light-program";
import {LightProgramsService} from "../light-programs.service";

@Component({
  selector: 'app-light-programs',
  templateUrl: './light-programs.component.html',
  styleUrls: ['./light-programs.component.scss']
})
export class LightProgramsComponent implements OnInit {
  light_programs: LightProgram[] = [];

  constructor(private lightProgramService: LightProgramsService) { }

  getLightPrograms(): void {
    this.lightProgramService.getAllLightPrograms()
      .subscribe(light_programs => this.light_programs = light_programs);
  }

  ngOnInit(): void {
    this.getLightPrograms();
  }

}
