import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../models/common';
import { WebContentDto } from '../models/web-content';

@Injectable({
  providedIn: 'root',
})
export class WebContentsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getPostsPaginated(command: ISearchPaginatedRequest): Observable<IPaginatorResult<WebContentDto>> {
    return this._httpService.post<IPaginatorResult<WebContentDto>>('api/web-content/paginated', command);
  }

  public deletePost(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/web-content/${id}`);
  }

  public createPost(command: WebContentDto): Observable<any> {
    return this._httpService.post<any>(`api/web-content`, command);
  }

  public updatePost(command: WebContentDto): Observable<any> {
    return this._httpService.put<any>(`api/web-content`, command);
  }
}
