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