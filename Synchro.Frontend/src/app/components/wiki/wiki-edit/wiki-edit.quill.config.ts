import { EditorConfig } from '../../text-editor/editor.config';

export class WikiPageEditQuillConfig {
  public static config: EditorConfig = {
    placeholder: 'Start typing...',
    readOnly: false,
    format: 'html',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ header: [1, 2, 3, false] }],
        ['clean'],
      ],
    },
  };
}
