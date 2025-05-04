import { create } from 'zustand';

const useMarkdownEditorStore = create((set) => ({
  markdown: '',
  setMarkdown: (value) => set({ markdown: value }),
  initializeMarkdown: (initialValue) => set({ markdown: initialValue }),
}));

export default useMarkdownEditorStore; 