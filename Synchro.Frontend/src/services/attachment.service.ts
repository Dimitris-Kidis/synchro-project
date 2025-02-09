import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentTypeEnum } from '../app/enums/document-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public createAttachment(file: File, type: DocumentTypeEnum = DocumentTypeEnum.UserAvatar): Observable<string> {
    const formData = new FormData();

    formData.append('File', file);
    formData.append('Size', `${file.size}`);
    formData.append('Type', type.toString());

    return this._httpService.post<string>(`api/attachment`, formData, { responseType: 'text' as 'json' });
  }

  public deleteAttachment(
    id: string | null = null,
    type: DocumentTypeEnum = DocumentTypeEnum.UserAvatar,
  ): Observable<any> {
    const params = new HttpParams().set('id', id ?? '').set('type', type);
    return this._httpService.delete<any>(`api/attachment`, { params });
  }
}
