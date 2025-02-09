import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileStorageDto } from '../models/file-storage';

@Injectable({
  providedIn: 'root',
})
export class FileStorageService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getAllFiles(groupId: string): Observable<FileStorageDto[]> {
    return this._httpService.get<FileStorageDto[]>(`api/storage/all/${groupId}`);
  }

  public deleteFile(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/storage/${id}`);
  }

  public createFile(command: FileStorageDto): Observable<any> {
    return this._httpService.post<any>(`api/storage`, command);
  }
}
