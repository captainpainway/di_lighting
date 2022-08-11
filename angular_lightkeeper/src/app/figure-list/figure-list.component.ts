import { Component, OnInit } from '@angular/core';
import { FigureService } from "../figure.service";
import {Figure} from "../figure";

@Component({
  selector: 'app-figure-list',
  templateUrl: './figure-list.component.html',
  styleUrls: ['./figure-list.component.scss']
})
export class FigureListComponent implements OnInit {
  figures: Figure[] = [];

  constructor(private figureService: FigureService) { }

  getFigures(): void {
    this.figureService.getAllFigures()
      .subscribe(figures => this.figures = figures);
  }

  ngOnInit(): void {
    this.getFigures();
  }

}
