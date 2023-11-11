// async function init() {
//     try {
//         const response = await fetch('../api_key/api_key.json');
//         const data = await response.json();
//         const githubApiKey = data.api_key.find(element => element.api === 'GITHUB');

//         if (githubApiKey) {
//             renderProjects(githubApiKey.key_value, githubApiKey.user);
//         } else {
//             console.error('Chave da API do GITHUB não encontrada nos dados JSON.');
//         }

//     } catch (error) {
//         console.error('Erro:', error);
//     }
// }


function renderProjects() {

    const username = ${{ secrets.user }};
    const token = ${{ secrets.api_key }};

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

// window.addEventListener('load', init);
window.addEventListener('load', renderProjects);