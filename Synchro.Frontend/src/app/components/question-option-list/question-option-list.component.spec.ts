import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOptionListComponent } from './question-option-list.component';

describe('QuestionOptionListComponent', () => {
  let component: QuestionOptionListComponent;
  let fixture: ComponentFixture<QuestionOptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionOptionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
