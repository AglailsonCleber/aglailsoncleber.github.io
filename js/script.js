function renderProjects( ) {
    const username = '<<secrets.APIKEY>>';
    const token = '<<secrets.USER>>';
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Authorization: `token ${token}`,
        }
    })
        .then(response => response.json())
        .then(repositories => {

            const projectList = document.getElementById('project-list');

            repositories.forEach(repo => {

                const listItem = document.createElement('li');

                if (repo.has_pages) {
                    listItem.innerHTML =
                        `
                    <div class="img">
                        <img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}" alt="">
                    </div>
                    <div class="links">
                        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
                        <a href="https://aglailsoncleber.github.io/${repo.name}/" target="_blank">Visualizar Projeto</a>
                    </div>
                    `;
                } else {
                    listItem.innerHTML =
                        `
                    <div class="img">
                        <img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}" alt="">
                    </div>
                    <div class="links">
                        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
                    </div>
                    `;
                }
                projectList.appendChild(listItem);
            });
        });
}

function toggleSection(sectionId, link) {
    const sections = document.querySelectorAll('main > section');
    const menuItens = document.querySelectorAll('#menu a');

    menuItens.forEach((item) => {
        item.classList.remove('active');
        item.classList.add('decoration-none');
    });

    sections.forEach((section) => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(sectionId);

    if (targetSection) {

        targetSection.classList.remove('hidden');
    }

    if (link) {
        link.classList.add('active');
        link.classList.remove('decoration-none');
    }
}

const menuLinks = document.querySelectorAll('#menu a');
menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        toggleSection(sectionId, link);
    });
});

window.addEventListener('load', renderProjects);