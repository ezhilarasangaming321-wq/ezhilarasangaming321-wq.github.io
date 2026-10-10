const landingOverlay = document.getElementById('landingOverlay');
const workspaceContent = document.getElementById('workspaceContent');
const appWindow = document.getElementById('appWindow');

function startPhotopea() {
    landingOverlay.classList.add('hidden');
}

function goBackToMenu() {
    window.location.href = 'index.html'; 
}

let isMinimized = false;
function toggleMinimize() {
    isMinimized = !isMinimized;
    if (isMinimized) {
        workspaceContent.classList.add('minimized');
        landingOverlay.classList.remove('hidden');
    } else {
        workspaceContent.classList.remove('minimized');
        landingOverlay.classList.add('hidden');
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        appWindow.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function handleClose() {
    goBackToMenu();
}