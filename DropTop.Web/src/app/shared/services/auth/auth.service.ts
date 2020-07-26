import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    redirectUrl: string;

    constructor(private http: HttpClient,
                private router: Router) { }

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
        localStorage.removeItem('email');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
    }
}
