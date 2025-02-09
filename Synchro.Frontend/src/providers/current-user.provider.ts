import { Injectable, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { RoleEnum } from '../app/enums/role.enum';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserProvider {
  public currentUserSig = signal<User | null>(null);
  private _currentUser: User;

  public constructor(private readonly authenticationService: AuthenticationService) {}

  public get currentUser(): User {
    return this._currentUser;
  }

  public get currentUserRole(): RoleEnum {
    return this._currentUser.role || RoleEnum.Student;
  }

  public init(): Observable<User | null> {
    if (this._currentUser) {
      return of(this._currentUser);
    }

    return this.authenticationService.getCurrentUser().pipe(
      tap((data) => {
        this._currentUser = data;
        this.currentUserSig.set(data);
      }),
      catchError((error) => {
        console.error('Error fetching current user:', error);
        return of(null);
      }),
    );
  }

  public hasSomeRole(...roles: RoleEnum[]): boolean {
    return roles.some((role) => role === this._currentUser.role);
  }

  public hasGroup(): boolean {
    return this._currentUser.groupId != null;
  }

  public getFullName(): string {
    return this._currentUser.firstName + ' ' + this._currentUser.lastName;
  }
}
