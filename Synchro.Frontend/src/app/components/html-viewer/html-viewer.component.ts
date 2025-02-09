import { Component, Input } from '@angular/core';

@Component({
  selector: 'synchro-html-viewer',
  standalone: true,
  imports: [],
  templateUrl: './html-viewer.component.html',
  styleUrl: './html-viewer.component.scss',
})
export class HtmlViewerComponent {
  @Input() public content: string = ''; // HTML-контент
}
