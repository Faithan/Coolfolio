const skillsData = [
   
    { name: 'HTML', score: 98, level: 'skill-w-98', icon: 'fa-brands fa-html5' },
    { name: 'CSS', score: 98, level: 'skill-w-98', icon: 'fa-brands fa-css3' },
    { name: 'TailwindCSS', score: 90, level: 'skill-w-90', icon: 'fa-solid fa-wind' },
    { name: 'Bootstrap', score: 90, level: 'skill-w-90', icon: 'fa-brands fa-bootstrap' },
    { name: 'Vue', score: 90, level: 'skill-w-90', icon: 'fa-brands fa-vuejs' },
    { name: 'JavaScript', score: 90, level: 'skill-w-90', icon: 'fa-brands fa-js' },
    { name: 'Python', score: 90, level: 'skill-w-90', icon: 'fa-brands fa-python' },
    { name: 'PHP', score: 95, level: 'skill-w-95', icon: 'fa-brands fa-php' },
    { name: 'Laravel', score: 90, level: 'skill-w-90', icon: 'fa-brands fa-laravel' },
    { name: 'SQL', score: 95, level: 'skill-w-95', icon: 'fa-solid fa-database' },
    { name: 'GIT', score: 95, level: 'skill-w-95', icon: 'fa-brands fa-git' },
    { name: 'GitHub', score: 90, level: 'skill-w-90', icon: 'fa-brands fa-github' },
    { name: 'Responsive Design', score: 98, level: 'skill-w-98', icons: ['fa-solid fa-desktop', 'fa-solid fa-laptop', 'fa-solid fa-mobile-screen-button'] },
    { name: 'TCPDF', score: 90, level: 'skill-w-90', icon: 'fa-solid fa-file-pdf' }
];

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('skillsContainer');
    const prevBtn = document.getElementById('skillsPrevBtn');
    const nextBtn = document.getElementById('skillsNextBtn');
    const pageInfo = document.getElementById('skillsPageInfo');

    if (!container || !prevBtn || !nextBtn || !pageInfo) return;

    const perPage = 6;
    const totalPages = Math.ceil(skillsData.length / perPage);
    let currentPage = 1;

    function render() {
        container.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const page = document.createElement('div');
            page.className = 'skills-page' + (i + 1 === currentPage ? ' active' : '');
            for (let j = i * perPage; j < Math.min((i + 1) * perPage, skillsData.length); j++) {
                const skill = skillsData[j];
                const iconsHtml = skill.icons
                    ? skill.icons.map(ic => '<i class="' + ic + '"></i>').join(' ')
                    : '<i class="' + skill.icon + '"></i>';
                page.innerHTML += '<div class="skill-box"><span>' + skill.name + '</span>' +
                    '<div class="skill-bar"><div class="skill-level ' + skill.level + '"></div></div>' +
                    '<p>' + skill.score + '/100</p>' +
                    '<div class="icon-container">' + iconsHtml + '</div></div>';
            }
            container.appendChild(page);
        }

        pageInfo.textContent = 'Page ' + currentPage + ' of ' + totalPages;
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages;
    }

    prevBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage -= 1;
            render();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage += 1;
            render();
        }
    });

    render();
});
