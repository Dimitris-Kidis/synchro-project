import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../models/common';
import { GroupDto, GroupUserDto } from '../models/groups';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getGroupsPaginated(command: ISearchPaginatedRequest): Observable<IPaginatorResult<GroupDto>> {
    return this._httpService.post<IPaginatorResult<GroupDto>>('api/group/paginated', command);
  }

  public getGroupPeople(id: string): Observable<GroupUserDto[]> {
    return this._httpService.get<GroupUserDto[]>(`api/group/${id}/users`);
  }

  public getGroup(id: string): Observable<GroupDto> {
    return this._httpService.get<GroupDto>(`api/group/${id}`);
  }

  public updateGroup(dto: GroupDto): Observable<any> {
    return this._httpService.put<any>(`api/group`, dto);
  }
}
