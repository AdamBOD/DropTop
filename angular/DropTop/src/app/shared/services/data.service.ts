import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api/userData";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor (private http: HttpClient) { }

  public getData (): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public postData (postData) {
    return this.http.post (apiUrl, postData).pipe(
            map(data => {}),
            catchError(this.handleError));
  }

  public deleteData (data) {
    var options = {
      headers: new HttpHeaders,
      body: data
    };

    let deleteApiUrl: string = `${apiUrl}/${data._id}`;

    return this.http.delete (deleteApiUrl, options).pipe(
      map(data => {}),
      catchError(this.handleError));
  }

  private extractData(res: Response) {
    return res || { };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('An error occurred; please try again later.');
  };
}
