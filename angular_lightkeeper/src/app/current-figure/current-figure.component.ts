import { Component, OnInit } from '@angular/core';
import {CurrentFigureService} from "../current-figure.service";
import {FigureService} from "../figure.service";
import {Figure} from "../figure";

@Component({
  selector: 'app-current-figure',
  templateUrl: './current-figure.component.html',
  styleUrls: ['./current-figure.component.scss']
})

export class CurrentFigureComponent implements OnInit {
  tag: string = '';
  figure: Figure = {
    name: '',
    tag: '',
    base_r: 255,
    base_g: 255,
    base_b: 255,
    light_program: ''
  };
  color: string = '#ffffff'
  new_figure: boolean = true;

constructor(private currentFigureService: CurrentFigureService, private figureService: FigureService) { }

  getCurrentTag(): void {
    this.currentFigureService.getCurrentFigureTag()
      .subscribe(data => {
        this.tag = decodeURIComponent(data.tag)
        if (data.tag) {
          this.getCurrentFigure(data.tag);
        } else {
          this.figure = {
            name: '',
            tag: '',
            base_r: 255,
            base_g: 255,
            base_b: 255,
            light_program: ''
          };
          this.color = "#ffffff";
        }
      });
  }

  getCurrentFigure(tag: string) {
    this.currentFigureService.getCurrentFigure(tag)
      .subscribe(data => {
        this.figure = data
        this.color = "#" + this.rgbToHex(data.base_r) + this.rgbToHex(data.base_g) + this.rgbToHex(data.base_b);
        this.new_figure = false;
      }, error => {
        this.figure = {
          name: '',
          tag: '',
          base_r: 255,
          base_g: 255,
          base_b: 255,
          light_program: ''
        };
        this.color = "#ffffff";
        this.new_figure = true;
        console.log(error);
      });
  }

  save() {
    if (!this.figure.name) {
      return;
    }
    this.figure.tag = this.tag;
    const rgb = this.hexToRgb(this.color);
    console.log(rgb);
    this.figure.base_r = rgb[0];
    this.figure.base_g = rgb[1];
    this.figure.base_b = rgb[2];
    console.log(this.figure);
    if (this.new_figure) {
      this.figureService.postNewFigure(this.figure as Figure)
        .subscribe(figure => {
          this.figure = figure;
        });
    } else {
      this.figureService.updateFigure(this.figure)
        .subscribe(figure => {
          this.figure = figure;
        });
    }
  }

  rgbToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  hexToRgb(col: string) {
    const hexArr = col.substring(1).match(/.{1,2}/g) || ['ff', 'ff', 'ff'];
    return [
      parseInt(hexArr[0], 16),
      parseInt(hexArr[1], 16),
      parseInt(hexArr[2], 16)
    ];
  }

  ngOnInit(): void {
    this.getCurrentTag();
  }

}
