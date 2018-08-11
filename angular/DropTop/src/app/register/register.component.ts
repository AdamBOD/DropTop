import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

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
            userName: '',
            password: '',
            confirmPassword: ''
        });
    }

    buildForm () {
        this.registerForm = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    checkPasswordsMatch (passwordInput: any) {
      if (this.password === undefined) {
        this.password = passwordInput.viewModel;
      }
      else {
        if (passwordInput.viewModel === this.password) {
          this.registerForm.controls['confirmPassword'].setErrors(null);
          this.passwordsMatch = true;
          return true;
        }
        this.passwordsMatch = false;
        this.registerForm.controls['confirmPassword'].setErrors({'incorrect': true});
      }
    }

    register (registerData: any) {
        console.log (registerData);
        let userName = this.registerForm.value.userName;
        let password = this.registerForm.value.password;
        this.authService.register(userName, password);

        if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
            this.router.navigate(['/home']);
        }
    }

}

