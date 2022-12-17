import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {LightProgram} from "./light-program";

@Injectable({
  providedIn: 'root'
})
export class LightProgramsService {
  private apiUrl = `http://${environment.base_url}/api/light_programs`;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getAllLightPrograms(): Observable<LightProgram[]> {
    return this.http.get<LightProgram[]>(this.apiUrl);
  }

  getLightProgram(scheme: string): Observable<LightProgram> {
    return this.http.get<LightProgram>(this.apiUrl + "/" + scheme);
  }

  updateLightProgram(light_program: LightProgram): Observable<any> {
    return this.http.put(this.apiUrl + "/" + light_program.scheme, light_program).pipe(
      tap(_ => console.log(`Updated figure ${light_program.scheme}`)),
      catchError(this.handleError<any>('updateLightProgram'))
    )
  }

  postNewLightProgram(light_program: LightProgram): Observable<LightProgram> {
    return this.http.post<LightProgram>(this.apiUrl, light_program).pipe(
      tap((newLightProgram: LightProgram) => console.log(`Added new light program ${newLightProgram.scheme}`)),
      catchError(this.handleError<LightProgram>('postNewLightProgram'))
    )
  }

  constructor(private http: HttpClient) { }
}
