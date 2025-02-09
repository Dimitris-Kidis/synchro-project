import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRequestCommand, RequestDto, UpdateRequestCommand } from '../commands/requests-commands';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public createRequest(dto: CreateRequestCommand): Observable<any> {
    return this._httpService.post<any>(`api/request`, dto);
  }

  public getMyRequests(): Observable<RequestDto[]> {
    return this._httpService.get<RequestDto[]>(`api/request`);
  }

  public deleteRequest(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/request/${id}`);
  }

  public updateRequest(command: UpdateRequestCommand): Observable<any> {
    return this._httpService.put<any>(`api/request`, command);
  }
}
