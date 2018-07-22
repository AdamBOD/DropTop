import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

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
        if (localStorage.getItem ('username')) {
            localStorage.removeItem ('username');
            this.router.navigate(['/home']);
        }
        else {
            this.loginForm.setValue({
                userName: '',
                password: ''
            });
            localStorage.setItem ('username', 'Adam');
        }
        
    }

    buildForm () {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    login (loginData: any) {
        console.log (loginData);
        let userName = this.loginForm.value.userName;
        let password = this.loginForm.value.password;
        this.authService.login(userName, password);

        if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
            this.router.navigate(['/home']);
        }
    }

}
