import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

let httpOptions;
const apiUrl = `${environment.apiUrl}/Drop`;

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {
        httpOptions  = {
            headers: new HttpHeaders({ 
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            })
        };
    }

    public getData(): Observable<any> {
        return this.http.get(`${apiUrl}/drops?userId=${localStorage.getItem('userId')}`, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    public getDataById(dataId): Observable<any> {
        let getApiUrl: string = `${apiUrl}/drops/drop/?userId=${localStorage.getItem('userId')}&dropId=${dataId}`;

        return this.http.get(getApiUrl, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    public postData(postData) {
        postData.CreatedBy = localStorage.getItem('userId');
        postData.CreatedOn = new Date();
        return this.http.post(`${apiUrl}/drop`, postData, httpOptions).pipe(
            map(data => { }),
            catchError(this.handleError));
    }

    public putData(putData) {
        var options = httpOptions;

        let updateApiUrl: string = `${apiUrl}/drop`;

        return this.http.put(updateApiUrl, putData, options).pipe(
            map(data => { }),
            catchError(this.handleError));
    }

    public deleteData(data) {
        let deleteApiUrl: string = `${apiUrl}/drop?dropId=${data.id}`;

        return this.http.delete(deleteApiUrl, httpOptions).pipe(
            map(data => { }),
            catchError(this.handleError));
    }

    private extractData(res: Response) {
        return res || {};
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
