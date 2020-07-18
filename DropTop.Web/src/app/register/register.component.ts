import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage: string;
    password: string;
    passwordsMatch = false;

    constructor(private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.buildForm();
    }

    ngOnInit () {
        this.registerForm.setValue({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    buildForm () {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(1)]],
            lastName: ['', [Validators.required, Validators.minLength(1)]],
            email: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    checkPasswordsMatch (event: any, passwordInput: any) {
      if (this.password === undefined) {
        this.password = passwordInput.viewModel;
      }
      else {
        if (passwordInput.viewModel === this.password) {
          console.log ("Matched Passwords")
          this.registerForm.controls['confirmPassword'].setErrors(null);
          this.passwordsMatch = true;
          return true;
        }
        this.passwordsMatch = false;
        this.registerForm.controls['confirmPassword'].setErrors({'incorrect': true});
      }
    }

    setPassword(event): void {
        this.password = event.srcElement.value;
    }

    register (registerData: any) {
        const md5 = new Md5();
        registerData.password = md5.appendStr(registerData.password).end();

        this.authService.register(registerData);

        if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
            this.router.navigate(['/home']);
        }
    }

}

