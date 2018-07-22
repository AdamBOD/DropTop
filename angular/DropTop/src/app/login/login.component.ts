import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor (private authService: AuthService,
               private router: Router
              ) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
        let userName = loginForm.form.value.userName;
        let password = loginForm.form.value.password;
        this.authService.login(userName, password);

        if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
            this.router.navigate(['/home']);
        }
    } else {
        this.errorMessage = 'Please enter a user name and password.';
    };
}

}
