import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'synchro-link-list',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, FormsModule],
  templateUrl: './link-list.component.html',
  styleUrl: './link-list.component.scss',
})
export class LinkListComponent {
  @Input() public links: string[] = [];
  @Input() public isEditMode: boolean = false;

  @Output() public refreshLinks = new EventEmitter<string[]>();

  public newLink: string = '';
  public isAddingLink: boolean = false;

  public getProcessedLinks(): string[] {
    return this.links.map((link) =>
      link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link}`,
    );
  }

  public startAddingLink(): void {
    this.isAddingLink = true;
  }

  public stopAddingLink(): void {
    this.isAddingLink = false;
    this.newLink = '';
  }

  public addLink(): void {
    const trimmedLink = this.newLink.trim();
    if (trimmedLink && !this.links.includes(trimmedLink)) {
      this.links.push(trimmedLink);
      this.refreshLinks.emit(this.links);
    }
    this.newLink = '';
    this.isAddingLink = false;
  }

  public removeLink(index: number): void {
    this.links.splice(index, 1);
    this.refreshLinks.emit(this.links);
  }
}
