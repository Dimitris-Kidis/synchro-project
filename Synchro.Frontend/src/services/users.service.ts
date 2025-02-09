import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserCommand, UpdateUserRoleCommand } from '../commands/user-commands';
import { IPaginatorResult, ISearchPaginatedRequest } from '../models/common';
import { GetUserSearchQueryDto, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getUser(): Observable<User> {
    return this._httpService.get<User>(`api/user/me`);
  }

  public regenerateSecretKey(): Observable<string> {
    return this._httpService.get<string>(`api/auth/secret-key`, { responseType: 'text' as 'json' });
  }

  public updateUser(dto: UpdateUserCommand): Observable<any> {
    return this._httpService.put<User>(`api/user`, dto);
  }

  public updateUserRole(dto: UpdateUserRoleCommand): Observable<any> {
    return this._httpService.put<User>(`api/user/role`, dto);
  }

  public getUserSearchPaginated(command: ISearchPaginatedRequest): Observable<IPaginatorResult<GetUserSearchQueryDto>> {
    return this._httpService.post<IPaginatorResult<GetUserSearchQueryDto>>('api/user/paginated', command);
  }
}
