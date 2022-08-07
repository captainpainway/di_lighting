import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {Figure} from "./figure";
import {FigureService} from "./figure.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentFigureService {
  private apiUrl = 'http://localhost:8080/api/get_current';
  private figureUrl = 'http://localhost:8080/api/figures/';

  getCurrentFigureTag(): Observable<{tag: string}> {
    return this.http.get<{tag: string}>(this.apiUrl);
  }

  getCurrentFigure(tag: string): Observable<Figure> {
    return this.http.get<Figure>(this.figureUrl + tag);
  }

  constructor(private http: HttpClient) { }
}
