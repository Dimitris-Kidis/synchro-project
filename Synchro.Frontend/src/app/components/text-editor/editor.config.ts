import { QuillModules } from 'ngx-quill';

export interface EditorConfig {
  placeholder?: string;
  readOnly?: boolean;
  format?: 'html' | 'text';
  modules?: QuillModules;
  characterLimit?: number;
  showCharacterCount?: boolean;
}
