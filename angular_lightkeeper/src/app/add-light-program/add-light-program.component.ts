import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {LightProgram} from "../light-program";
import {LightProgramsService} from "../light-programs.service";

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
    private lightProgramsService: LightProgramsService,
    private router: Router
  ) { }

  addLightProgram(): void {
    if (!this.light_program.scheme) {
      return;
    }
    this.lightProgramsService.postNewLightProgram(this.light_program as LightProgram)
      .subscribe(light_program => {
        this.light_program = light_program;
      });
    this.router.navigate(['/light_programs/edit', this.light_program.scheme]);
  }

  ngOnInit(): void {}

}
