let isSaved = true;
let currentDirectoryHandle = null;
let fileHandles = {};

// DOM Elements
const warningModal = document.getElementById('warning-modal');
const startBtn = document.getElementById('start-btn');
const appContainer = document.getElementById('app-container');
const codeInput = document.getElementById('code-input');
const highlightingContent = document.getElementById('highlighting-content');
const previewFrame = document.getElementById('preview-frame');
const saveBtn = document.getElementById('save-btn');
const newFileBtn = document.getElementById('new-file-btn');
const openFolderBtn = document.getElementById('open-folder-btn');
const filenameDisplay = document.getElementById('current-filename');
const fileList = document.getElementById('file-list');
const lineNumbers = document.getElementById('line-numbers');

// Start IDE
startBtn.addEventListener('click', () => {
  warningModal.classList.add('hidden');
  appContainer.classList.remove('hidden');
});

// Update Line Numbers & Syntax Highlighting
function updateEditor() {
  const code = codeInput.value;
  
  // Syntax Highlighting (Add trailing space for cursor wrapping alignment)
  highlightingContent.textContent = code.endsWith('\n') ? code + ' ' : code;
  Prism.highlightElement(highlightingContent);

  // Update Line Numbers
  const lines = code.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');

  // Update Live Preview
  const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDoc.open();
  previewDoc.write(code);
  previewDoc.close();

  isSaved = false;
}

codeInput.addEventListener('input', updateEditor);

// Synchronize Scroll between Editor, Highlighting, and Line Numbers
codeInput.addEventListener('scroll', () => {
  const highlighting = document.getElementById('highlighting');
  highlighting.scrollTop = codeInput.scrollTop;
  highlighting.scrollLeft = codeInput.scrollLeft;
  lineNumbers.scrollTop = codeInput.scrollTop;
});

// Open Local Folder
openFolderBtn.addEventListener('click', async () => {
  try {
    currentDirectoryHandle = await window.showDirectoryPicker();
    fileList.innerHTML = '';
    fileHandles = {};

    for await (const entry of currentDirectoryHandle.values()) {
      if (entry.kind === 'file') {
        fileHandles[entry.name] = entry;
        addFileToUIList(entry.name);
      }
    }
  } catch (err) {
    console.log('Folder selection cancelled:', err);
  }
});

// Load File Content into Editor
async function loadFileContent(fileName) {
  try {
    const handle = fileHandles[fileName];
    if (handle) {
      const file = await handle.getFile();
      const text = await file.text();
      
      filenameDisplay.textContent = fileName;
      codeInput.value = text;
      updateLanguageExtension(fileName);
      updateEditor();
    }
  } catch (err) {
    console.log('Error reading file:', err);
  }
}

// Add File to Manager UI
function addFileToUIList(fileName) {
  const li = document.createElement('li');
  li.className = 'file-item';
  li.textContent = fileName;
  li.addEventListener('click', () => {
    document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    loadFileContent(fileName);
  });
  fileList.appendChild(li);
}

// New File Creation
newFileBtn.addEventListener('click', async () => {
  try {
    if (!currentDirectoryHandle) {
      alert('Please select a folder first.');
      currentDirectoryHandle = await window.showDirectoryPicker();
    }

    const name = prompt('Enter File Name (e.g., app.js, index.html):', 'newfile.html');
    if (name) {
      const handle = await currentDirectoryHandle.getFileHandle(name, { create: true });
      fileHandles[name] = handle;
      
      addFileToUIList(name);
      loadFileContent(name);
    }
  } catch (err) {
    console.log('File creation cancelled:', err);
  }
});

// Detect File Extension
function updateLanguageExtension(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  highlightingContent.className = '';
  
  if (ext === 'js') {
    highlightingContent.classList.add('language-javascript');
  } else if (ext === 'css') {
    highlightingContent.classList.add('language-css');
  } else {
    highlightingContent.classList.add('language-html');
  }
}

// Save File
saveBtn.addEventListener('click', async () => {
  const fileName = filenameDisplay.textContent;
  if (fileHandles[fileName]) {
    try {
      const writable = await fileHandles[fileName].createWritable();
      await writable.write(codeInput.value);
      await writable.close();
      isSaved = true;
      alert('File saved successfully!');
      return;
    } catch (err) {
      console.log('Save failed:', err);
    }
  }

  // Fallback Download
  const blob = new Blob([codeInput.value], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  isSaved = true;
});

// Exit Alert
window.addEventListener('beforeunload', (e) => {
  if (!isSaved) {
    e.preventDefault();
    e.returnValue = 'Unsaved changes!';
  }
});