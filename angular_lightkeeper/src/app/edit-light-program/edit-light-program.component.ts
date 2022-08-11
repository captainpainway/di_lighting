import { Component, OnInit } from '@angular/core';
import {LightProgram} from "../light-program";
import {LightProgramsService} from "../light-programs.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-light-program',
  templateUrl: './edit-light-program.component.html',
  styleUrls: ['./edit-light-program.component.scss']
})
export class EditLightProgramComponent implements OnInit {
  light_program: LightProgram = {
    scheme: '',
    code: ''
  }

  constructor(
    private lightProgramsService: LightProgramsService,
    private route: ActivatedRoute
  ) { }

  getLightProgram(): void {
    const scheme = String(this.route.snapshot.paramMap.get('scheme'));
    this.lightProgramsService.getLightProgram(scheme)
      .subscribe(light_program => this.light_program = light_program);
  }

  updateLightProgram(): void {
    this.lightProgramsService.updateLightProgram(this.light_program)
      .subscribe(light_program => {
        this.light_program = light_program;
      });
  }

  ngOnInit(): void {
    this.getLightProgram();
  }

}
