import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    redirectUrl: string;

    constructor(private http: HttpClient) { }

    isLoggedIn(): boolean {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    }

    login(email: string, password: string): Observable<any> {
        if (!email || !password) {
            return;
        }
        let url =`${environment.apiUrl}/User/auth`;
        return this.http.post(url,
            {
                email: email,
                password: password
            }
        );
    }

    register (registerData): Observable<any> {
        let url =`${environment.apiUrl}/User`;
        return this.http.post(url, registerData);
    }

    logout(): void {
    }
}
