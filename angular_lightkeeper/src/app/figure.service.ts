import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import { Figure } from "./figure";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FigureService {
  private apiUrl = `http://${environment.base_url}/api/figures`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getAllFigures(): Observable<Figure[]> {
    return this.http.get<Figure[]>(this.apiUrl);
  }

  postNewFigure(figure: Figure): Observable<Figure> {
    return this.http.post<Figure>(this.apiUrl, figure).pipe(
      tap((newFigure: Figure) => console.log(`Added figure ${newFigure.name}`)),
      catchError(this.handleError<Figure>('postNewFigure'))
    )
  }

  updateFigure(figure: Figure): Observable<any> {
    return this.http.put(this.apiUrl + "/" + figure.tag, figure).pipe(
      tap(_ => console.log(`Updated figure ${figure.name}`)),
      catchError(this.handleError<any>('updateFigure'))
    );
  }

  constructor(private http: HttpClient) { }
}
