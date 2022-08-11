import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {Figure} from "./figure";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrentFigureService {
  private apiUrl = `http://${environment.base_url}/api/get_current`;
  private figureUrl = `http://${environment.base_url}/api/figures/`;

  getCurrentFigureTag(): Observable<{tag: string}> {
    return this.http.get<{tag: string}>(this.apiUrl);
  }

  getCurrentFigure(tag: string): Observable<Figure> {
    return this.http.get<Figure>(this.figureUrl + tag);
  }

  constructor(private http: HttpClient) { }
}
