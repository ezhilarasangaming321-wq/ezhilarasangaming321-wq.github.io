let currentHtmlPath = '';
let currentCssPath = '';
let currentJsPath = '';

document.getElementById("getStartedBtn").addEventListener("click", () => {
    document.getElementById("hero").classList.add("hidden");
    document.getElementById("projects").classList.remove("hidden");
});

function openCodeModal(htmlPath, cssPath, jsPath) {
    currentHtmlPath = htmlPath;
    currentCssPath = cssPath;
    currentJsPath = jsPath;

    document.getElementById("codeModal").classList.remove("hidden");
    switchTab('html');
}

function closeCodeModal() {
    document.getElementById("codeModal").classList.add("hidden");
    document.getElementById("codeBlock").textContent = "";
}

function switchTab(lang) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${lang}`).classList.add('active');

    let filePath = currentHtmlPath;
    if (lang === 'css') filePath = currentCssPath;
    if (lang === 'js') filePath = currentJsPath;

    const codeBlock = document.getElementById("codeBlock");
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error();
            return response.text();
        })
        .then(data => {
            let cleanData = data;

            // Live Server சேர்க்கும் எக்ஸ்ட்ரா ஸ்கிரிப்ட்டை மட்டும் நீக்கிவிட்டு, </html> வரை முழு கோடையும் காட்டும்
            if (lang === 'html') {
                cleanData = cleanData.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, '');
            }

            codeBlock.textContent = cleanData.trim();
            codeBlock.className = `language-${lang}`;
            Prism.highlightElement(codeBlock);
        })
        .catch(() => {
            codeBlock.textContent = "";
        });
}

function copyCode() {
    const codeText = document.getElementById("codeBlock").textContent;
    if (!codeText) return;

    navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.getElementById("copyBtn");
        copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy Code`;
        }, 2000);
    });
}