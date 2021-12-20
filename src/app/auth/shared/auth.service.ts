import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDto} from './login.dto';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TokenDto} from './token.dto';
import {environment} from '../../../environments/environment';
import {take, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

const jwtToken = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<string | null>(this.getToken());
  constructor(private _http: HttpClient, private router: Router) { }

  login(loginDto: LoginDto): Observable<TokenDto> {
    return this._http
      .post<TokenDto>(environment.api + '/api/auth/login', loginDto)
      .pipe(
        tap(token => {
          if(token && token.jwt) {
            localStorage.setItem(jwtToken, token.jwt);
            this.isLoggedIn$.next(token.jwt);
          } else {
            this.logout();
          }
        })
      )
  }

  getToken(): string | null {
    return localStorage.getItem(jwtToken);
  }

  logout(): Observable<boolean> {
    localStorage.removeItem(jwtToken);
    this.isLoggedIn$.next(null);
    this.router.navigateByUrl('auth/login');
    return of(true).pipe(take(1));
  }
}
