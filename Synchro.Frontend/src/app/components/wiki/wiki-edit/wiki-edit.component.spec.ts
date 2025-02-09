import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEditComponent } from './wiki-edit.component';

describe('WikiEditComponent', () => {
  let component: WikiEditComponent;
  let fixture: ComponentFixture<WikiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WikiEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WikiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
