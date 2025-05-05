import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkItemDto } from '../models/work-item';

@Injectable({
  providedIn: 'root',
})
export class WorkItemsService {
  public constructor(private readonly _http: HttpClient) {}

  public createWorkItem(command: WorkItemDto): Observable<any> {
    return this._http.post<any>('api/work-items', command);
  }

  public updateWorkItem(command: WorkItemDto): Observable<any> {
    return this._http.put<any>('api/work-items', command);
  }

  public deleteWorkItem(id: string): Observable<any> {
    return this._http.delete<any>(`api/work-items/${id}`);
  }

  public getMyGroupWorkItems(groupId: string): Observable<WorkItemDto[]> {
    return this._http.get<WorkItemDto[]>(`api/work-items/all/${groupId}`);
  }

  public getWorkItem(id: string): Observable<WorkItemDto> {
    return this._http.get<WorkItemDto>(`api/work-items/${id}`);
  }

  public updateWorkItemStatus(command: WorkItemDto): Observable<any> {
    return this._http.put<any>('api/work-items/status', command);
  }
}
