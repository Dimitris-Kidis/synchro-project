import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotPanelComponent } from './bot-panel.component';

describe('BotPanelComponent', () => {
  let component: BotPanelComponent;
  let fixture: ComponentFixture<BotPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BotPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
