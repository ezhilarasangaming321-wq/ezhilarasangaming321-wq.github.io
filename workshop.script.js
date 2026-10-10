// முதல் 3 பாக்ஸ்களுக்கான டேட்டா. 
// இதை நீங்களே விஎஸ் கோடில் எளிதாக மாற்றிக் கொள்ளலாம்.
const projects = [
    {
        id: 1,
        title: "PHOTOPEA",
        imageUrl: "Photopea.png", // ரோஸ் இமேஜ் உதாரணம்
        link: "photopea.html" // கிளிக் செய்தால் திறக்க வேண்டிய யூஆர்எல் / பேஜ்
    },
    {
        id: 2,
        title: "CSS Generator",
        imageUrl: "CSS.PNG",
        link: "SVG.html"
    },
    {
        id: 3,
        title: "Polarr EDITOR",
        imageUrl: "Polarr.PNG",
        link: "Polarr.html"
    }
];

const cardsGrid = document.getElementById('cardsGrid');

function renderProjects() {
    cardsGrid.innerHTML = '';
    // முதல் 3 பாக்ஸ்கள் மட்டும் ரெண்டர் ஆகும்
    projects.slice(0, 3).forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => {
            window.location.href = project.link;
        };

        card.innerHTML = `
            <div class="card-image-box">
                <img src="${project.imageUrl}" alt="${project.title}">
            </div>
            <div class="project-title">${project.title}</div>
        `;

        cardsGrid.appendChild(card);
    });
}

// பக்க லோட் ஆனவுடன் பாக்ஸ்களைக் காட்ட
renderProjects();
