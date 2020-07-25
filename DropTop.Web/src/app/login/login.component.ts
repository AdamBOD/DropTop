import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.buildForm();
    }

    ngOnInit () {
        if (localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
            this.router.navigate(['/home']);
        }

        this.loginForm.setValue({
            email: '',
            password: ''
        });
    }

    buildForm () {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    login (loginData: any) {
        const md5 = new Md5();
        let email = loginData.email;
        let password = md5.appendStr(loginData.password).end();

        this.authService.login(email, password.toString()).subscribe(res => {
            if (res != null) {
                localStorage.setItem('email', res["email"]);
                localStorage.setItem('firstName', res["firstName"]);
                localStorage.setItem('lastName', res["lastName"]);
                localStorage.setItem('userId', res["id"]);
                localStorage.setItem('token', res["token"])
                
                if (this.authService.redirectUrl) {
                    this.router.navigateByUrl(this.authService.redirectUrl);
                } else {
                    this.router.navigate(['/home']);
                }
            }
        }, error => {
            console.error(error);
        });
    }

}
