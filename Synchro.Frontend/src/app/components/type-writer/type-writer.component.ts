import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface TypedTextItem {
  text: string;
  styleClasses: string[];
}

@Component({
  selector: 'synchro-type-writer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './type-writer.component.html',
  styleUrl: './type-writer.component.scss',
})
export class TypeWriterComponent implements OnInit, OnDestroy {
  @Input() public textArray: TypedTextItem[] = [
    { text: 'easy', styleClasses: ['color-lime', 'font-bold'] },
    { text: 'fast', styleClasses: ['color-pink', 'font-bold'] },
    { text: 'a journey', styleClasses: ['color-blue', 'font-italic'] },
    { text: 'for YOU', styleClasses: ['color-indigo', 'font-bold'] },
    { text: 'fun', styleClasses: ['color-green'] },
  ];
  @Input() public staticText: string = 'Coding is';
  @Input() public typingDelay: number = 200;
  @Input() public erasingDelay: number = 100;
  @Input() public newTextDelay: number = 2000;

  public typedText: string = '';
  public isTyping: boolean = false;
  private cursorVisible: boolean = true;

  private textArrayIndex: number = 0;
  private charIndex: number = 0;

  private typingTimeout?: any;
  private erasingTimeout?: any;

  public get cursorClass(): string {
    return this.isTyping ? 'typing' : '';
  }

  public get displayText(): string {
    return this.typedText;
  }

  public get currentWordClasses(): string[] {
    return this.textArray[this.textArrayIndex].styleClasses;
  }

  public ngOnInit(): void {
    if (this.textArray.length) {
      setTimeout(() => this.type(), this.newTextDelay + 250);
    }
  }

  public ngOnDestroy(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.erasingTimeout) {
      clearTimeout(this.erasingTimeout);
    }
  }

  private type(): void {
    if (this.charIndex < this.textArray[this.textArrayIndex].text.length) {
      if (!this.isTyping) {
        this.isTyping = true;
      }
      this.typedText += this.textArray[this.textArrayIndex].text.charAt(this.charIndex);
      this.charIndex++;

      this.typingTimeout = setTimeout(() => this.type(), this.typingDelay);
    } else {
      this.isTyping = false;
      setTimeout(() => this.erase(), this.newTextDelay);
    }
  }

  private erase(): void {
    if (this.charIndex > 0) {
      this.typedText = this.textArray[this.textArrayIndex].text.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.erasingTimeout = setTimeout(() => this.erase(), this.erasingDelay);
    } else {
      this.textArrayIndex = (this.textArrayIndex + 1) % this.textArray.length;
      setTimeout(() => this.type(), this.typingDelay + 1100);
    }
  }
}
