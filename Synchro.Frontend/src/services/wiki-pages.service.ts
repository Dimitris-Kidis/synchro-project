import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginatorResult, ISearchPaginatedRequest } from '../models/common';
import { WikiPageDto } from '../models/wiki-page';

@Injectable({
  providedIn: 'root',
})
export class WikiPagesService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getWikiPagesPaginated(command: ISearchPaginatedRequest): Observable<IPaginatorResult<WikiPageDto>> {
    return this._httpService.post<IPaginatorResult<WikiPageDto>>('api/wiki/paginated', command);
  }

  public deleteWikiPage(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/wiki/${id}`);
  }

  public createWikiPage(command: WikiPageDto): Observable<any> {
    return this._httpService.post<any>(`api/wiki`, command);
  }

  public updateWikiPage(command: WikiPageDto): Observable<any> {
    return this._httpService.put<any>(`api/wiki`, command);
  }
}
