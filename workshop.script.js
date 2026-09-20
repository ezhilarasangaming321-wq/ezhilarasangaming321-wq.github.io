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
        title: "Project 2 Name",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80",
        link: "#project2"
    },
    {
        id: 3,
        title: "Project 3 Name",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80",
        link: "#project3"
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