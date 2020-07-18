import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

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

    login(email: string, password: string): void {
        if (!email || !password) {
            return;
        }
        let url =`${environment.apiUrl}/User/auth`;
        this.http.post(url,
            {
                email: email,
                password: password
            }
        ).subscribe (res => {
            if (res != null) {
                localStorage.setItem('email', res["email"]);
                localStorage.setItem('firstName', res["firstName"]);
                localStorage.setItem('lastName', res["lastName"]);
                localStorage.setItem('userId', res["id"]);
                localStorage.setItem('token', res["token"])
            }
        }, error => {
            console.error(error);
        });

        return;
    }

    register (registerData): [boolean, string] {
        if (!registerData) {
            return [false, "Unknown error"];
        }
        let url =`${environment.apiUrl}/User`;
        this.http.post(url, registerData).subscribe (res => {
            if (res != null) {
                console.log (res)

                return [true, "Success"];
            }
        }, error => {
            console.error(error);
            return [false, error];
        });
    }

    logout(): void {
    }
}
