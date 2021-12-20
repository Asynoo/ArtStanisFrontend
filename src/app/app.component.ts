import { Component } from '@angular/core';
import {AuthService} from "./auth/shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: string | null = null;
  title = 'ArtStanisFrontend';

  constructor(private _auth: AuthService, private router: Router) {
    this._auth.isLoggedIn$.subscribe(x => {
      if (x)
        this.isLoggedIn = x
      else
        this.isLoggedIn = null
    })
  }

  handleAuth() {
    if (this.isLoggedIn) {
      this._auth.logout()
    }
    else {
      this.router.navigateByUrl('auth/login')
    }
  }
}
