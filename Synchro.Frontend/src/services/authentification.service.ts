import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../environment/environment';
import { ChangePasswordDto, LoginResponseDto, UserForAuthenticationDto, UserForRegistrationDto } from '../models/auth';
import { User } from '../models/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(
    private readonly _http: HttpClient,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {}

  public login(dto: UserForAuthenticationDto): Observable<LoginResponseDto> {
    return this._http.post<LoginResponseDto>('api/auth/signin', dto).pipe(
      map((response: LoginResponseDto) => {
        if (response.isAuthSuccessful) {
          localStorage.setItem('token', response.token);
          this.router.navigate([environment.redirectAfterAuthUrl]);
        }

        return response;
      }),
    );
  }

  public register(dto: UserForRegistrationDto): Observable<string> {
    return this._http.post<string>('api/auth/signup', dto).pipe(
      map((response: string) => {
        this.messageService.showSuccessByCode('NOTIFICATION.REGISTRATION_SUCCESS.LOGIN');
        this.router.navigate([environment.redirectToLoginAuthUrl]);
        return response;
      }),
    );
  }

  public changePassword(dto: ChangePasswordDto): Observable<any> {
    return this._http.post<ChangePasswordDto>('api/auth/password-reset', dto);
  }

  public logOut(): Observable<any> {
    return this._http.post('api/auth/signout', {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigate([environment.redirectToLoginAuthUrl]);
      }),
    );
  }

  public isLoggedIn(): boolean {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const payload: string = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      return parsedPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUserId(): string | null {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    const parsedToken = this.parseJwt(token);
    return parsedToken[environment.userIdClaimKey];
  }

  public getCurrentUser(): Observable<User> {
    return this._http.get<User>('api/user/me');
  }

  public parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  public resetPassword(dto: ChangePasswordDto): Observable<any> {
    return this._http.post<any>(`api/auth/password-reset`, dto);
  }
}
