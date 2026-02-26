document.addEventListener("DOMContentLoaded", () => {
    try {
        const data = window.portfolioConfig;

        initHero(data.hero);
        initExpertise(data.expertise);
        initProjects(data.projects);
        initGitHub();
        initSkills(data.skills);
        initPublications(data.publications);
        initLifestyle(data.lifestyle);

        initScrollAnimations();

    } catch (error) {
        console.error("Error loading configuration:", error);
    }
});

// --- Hero Section ---
function initHero(heroData) {
    document.getElementById('hero-name').textContent = heroData.name;
    document.getElementById('hero-bio').textContent = heroData.bio;

    const socialsContainer = document.getElementById('hero-socials');
    heroData.socials.forEach(social => {
        const span = document.createElement('span');
        span.className = 'social-link';
        span.innerHTML = `<a href="${social.url}" target="_blank" title="${social.name}"><i class="${social.icon}"></i> ${social.name}</a>`;
        socialsContainer.appendChild(span);
    });

    const titleElement = document.getElementById('hero-title');
    let currentTitleIndex = 0;

    function typeText(text, i, cb) {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            setTimeout(() => typeText(text, i + 1, cb), 80);
        } else {
            setTimeout(cb, 2000);
        }
    }

    function deleteText(cb) {
        let text = titleElement.textContent;
        if (text.length > 0) {
            titleElement.textContent = text.substring(0, text.length - 1);
            setTimeout(() => deleteText(cb), 40);
        } else {
            setTimeout(cb, 500);
        }
    }

    function startTyping() {
        const title = heroData.titles[currentTitleIndex];
        typeText(title, 0, () => {
            deleteText(() => {
                currentTitleIndex = (currentTitleIndex + 1) % heroData.titles.length;
                startTyping();
            });
        });
    }

    startTyping();
}

// --- Expertise Section ---
function initExpertise(expertiseData) {
    const container = document.getElementById('expertise-container');
    container.className = 'marquee-container';
    
    let contentHtml = '';
    expertiseData.forEach(item => {
        contentHtml += `
            <div class="expertise-item brutal-card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="marquee-content">
            ${contentHtml}
        </div>
        <div class="marquee-content" aria-hidden="true">
            ${contentHtml}
        </div>
    `;
}

// --- Projects (Bento Grid) ---
function initProjects(projectsData) {
    const container = document.getElementById('projects-grid');
    projectsData.forEach(proj => {
        const bentoItem = document.createElement('div');
        bentoItem.className = `bento-item brutal-card ${proj.bento_class}`;

        bentoItem.innerHTML = `
            <div class="media-container">
                <img src="${proj.image}" alt="${proj.title}" class="project-img">
            </div>
            <div class="bento-content">
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
            </div>
        `;

        container.appendChild(bentoItem);
    });
}

// --- GitHub Repositories (Horizontal Scroll) ---
async function initGitHub() {
    const container = document.getElementById('github-repositories');
    container.innerHTML = '<p class="loading-brutal">Fetching Repositories from GitHub...</p>';
    
    try {
        const username = 'mpouziotasd';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch from GitHub: ${response.statusText}`);
        }
        
        const repos = await response.json();
        
        container.innerHTML = '';
        
        repos.forEach(repo => {
            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = "_blank";
            card.className = 'github-card brutal-card';
            
            const updateDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            card.innerHTML = `
                <div class="github-card-header">
                    <h3><i class="fab fa-github"></i> ${repo.name}</h3>
                </div>
                <div class="github-card-body">
                    <p>${repo.description || 'No description provided.'}</p>
                </div>
                <div class="github-card-footer">
                    <span class="language-tag">${repo.language || 'Markdown'}</span>
                    <span class="update-date"><i class="fas fa-clock"></i> ${updateDate}</span>
                </div>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="error-brutal">Failed to load repositories. Please try again later.</p>';
    }
}

// --- Skills Section ---
function initSkills(skillsData) {
    const tbody = document.getElementById('programming-tbody');
    skillsData.programming.forEach(prog => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${prog.name}</strong></td>
            <td>${prog.proficiency}</td>
            <td>${prog.concepts}</td>
            <td>${prog.duration}</td>
        `;
        tbody.appendChild(tr);
    });

    const list = document.getElementById('tech-skills-list');
    skillsData.technical_skills.forEach(skill => {
        const li = document.createElement('li');
        li.innerHTML = `<strong><i class="fas fa-check"></i> ${skill.category}:</strong> ${skill.details}`;
        list.appendChild(li);
    });
}

// --- Publications Timeline ---
function initPublications(pubs) {
    const container = document.getElementById('publications-timeline');
    pubs.forEach(pub => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-year">${pub.year}</div>
            <div class="timeline-card">
                <span class="pub-type ${pub.type.toLowerCase()}">${pub.type}</span>
                <h3 class="pub-title">${pub.title}</h3>
                <div class="pub-venue"><i class="fas fa-book-open"></i> ${pub.venue}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// --- Lifestyle ---
function initLifestyle(lifestyleData) {
    const container = document.getElementById('lifestyle-container');
    lifestyleData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card lifestyle-card';
        card.innerHTML = `
            <div class="icon-wrapper"><i class="${item.icon}"></i></div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        container.appendChild(card);
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
}
