// Stub API for Markdown Editor
// In the future, add functions to load/save markdown from localStorage or remote

export function fetchInitialMarkdown() {
  // Return a welcome message in markdown format
  return `# Welcome to SimpleTools.io Markdown Editor!

## Features
* **Live Preview** - See your markdown rendered in real-time
* **Export Options** - Save your work as .md, .txt, or HTML 
* **Theme Support** - Works in light and dark mode

## Markdown Examples
You can write:
- Lists
- *Italic* and **Bold** text
- [Links](https://example.com)
- \`Code\` and \`\`\`code blocks\`\`\`

> Start typing in the left panel to see your changes!
`;
}

export function saveMarkdown(markdown) {
  // Stub: In the future, save to localStorage or remote
  return true;
} 