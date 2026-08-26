document.addEventListener("DOMContentLoaded", () => {
    const getStartedBtn = document.getElementById("getStartedBtn");
    const heroSection = document.getElementById("hero");
    const projectsSection = document.getElementById("projects");

    // Landing page button action
    getStartedBtn.addEventListener("click", () => {
        heroSection.classList.add("hidden");
        projectsSection.classList.remove("hidden");
    });
});

// Click folder card to open project live preview
function openProject(path) {
    const modal = document.getElementById("projectModal");
    const modalFrame = document.getElementById("modalFrame");
    modalFrame.src = path;
    modal.classList.remove("hidden");
}

// Close full screen viewer
function closeProject() {
    const modal = document.getElementById("projectModal");
    const modalFrame = document.getElementById("modalFrame");
    modal.classList.add("hidden");
    modalFrame.src = "";
}