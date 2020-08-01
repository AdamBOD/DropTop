import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public logout(): void {
      this.authService.logout();
  }

}
