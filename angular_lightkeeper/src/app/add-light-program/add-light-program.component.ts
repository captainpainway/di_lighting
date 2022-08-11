import { Component, OnInit } from '@angular/core';
import {LightProgram} from "../light-program";
import {LightProgramsService} from "../light-programs.service";
import {Figure} from "../figure";

@Component({
  selector: 'app-add-light-program',
  templateUrl: './add-light-program.component.html',
  styleUrls: ['./add-light-program.component.scss']
})
export class AddLightProgramComponent implements OnInit {
  light_program: LightProgram = {
    scheme: '',
    code: ''
  }

  constructor(
    private lightProgramsService: LightProgramsService
  ) { }

  addLightProgram(): void {
    if (!this.light_program.scheme) {
      return;
    }
    this.lightProgramsService.postNewLightProgram(this.light_program as LightProgram)
      .subscribe(light_program => {
        this.light_program = light_program;
      });
  }

  ngOnInit(): void {}

}
