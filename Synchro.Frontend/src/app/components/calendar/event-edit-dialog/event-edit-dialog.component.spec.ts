import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditDialogComponent } from './event-edit-dialog.component';

describe('EventEditDialogComponent', () => {
  let component: EventEditDialogComponent;
  let fixture: ComponentFixture<EventEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
