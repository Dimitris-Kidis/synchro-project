import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../commands/questions-commands';
import { QuestionDataDto, QuestionDto } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getQuestionsData(): Observable<QuestionDataDto> {
    return this._httpService.get<QuestionDataDto>(`api/question/info`);
  }

  public getAllQuestions(): Observable<QuestionDto[]> {
    return this._httpService.get<QuestionDto[]>(`api/question/all`);
  }

  public createQuestion(command: Question): Observable<any> {
    return this._httpService.post<any>(`api/question`, command);
  }

  public deleteQuestion(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/question/${id}`);
  }

  public updateQuestion(command: Question): Observable<any> {
    return this._httpService.put<any>(`api/question`, command);
  }
}
