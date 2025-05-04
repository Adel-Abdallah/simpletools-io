import React from 'react';
import useMarkdownEditorStore from '../../stores/useMarkdownEditorStore.js';
import { marked } from 'marked';

const MarkdownEditor = () => {
  const markdown = useMarkdownEditorStore((s) => s.markdown);
  const setMarkdown = useMarkdownEditorStore((s) => s.setMarkdown);

  // Parse markdown to HTML using marked
  const html = marked(markdown);

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="flex-1 flex flex-col">
        <label className="mb-2 font-semibold">Markdown Input</label>
        <textarea
          className="w-full h-64 p-2 border rounded bg-white dark:bg-gray-900 dark:text-white"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type your markdown here..."
        />
        <div className="flex gap-2 mt-2">
          <button className="px-3 py-1 border rounded bg-blue-500 text-white" disabled>Export .md</button>
          <button className="px-3 py-1 border rounded bg-green-500 text-white" disabled>Export .txt</button>
          <button className="px-3 py-1 border rounded bg-purple-500 text-white" disabled>Export HTML</button>
        </div>
      </div>
      <div className="flex-1">
        <label className="mb-2 font-semibold">Live Preview</label>
        <div 
          className="w-full h-64 p-2 border rounded bg-gray-50 dark:bg-gray-800 overflow-auto prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor; 