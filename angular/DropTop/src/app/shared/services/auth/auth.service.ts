import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    redirectUrl: string;

    constructor() { }

    isLoggedIn(): boolean {
        if (localStorage.getItem('username')) {
            return true;
        }
        localStorage.setItem ('username', 'Adam');
        return false;
    }

    login(userName: string, password: string): void {
        if (!userName || !password) {
            return;
        }
        if (userName === 'admin') {
            return;
        }
    }

    register (username: string, password: string) {

    }

    logout(): void {
    }
}
