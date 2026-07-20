/* ==================== projects.js ==================== */
/*
 * Dynamically loads projects from /data/projects.json
 * Generates project cards and modals
 * Maintains compatibility with existing search, pagination, and animation
 */

document.addEventListener('DOMContentLoaded', async function () {
    const projectsContainer = document.querySelector('.projects-base-container');
    if (!projectsContainer) return;

    try {
        // Load projects data
        const response = await fetch('/data/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        const projects = await response.json();

        // Generate project cards and modals
        projects.forEach((project, index) => {
            // Create project card
            const card = document.createElement('div');
            card.className = 'project-container hidden-animation';

            // Image section
            const imageSection = `
                <div class="project-image ">
                    <div class="laptop-container">
                        <img src="${project.image}" alt="${project.title} Image" />
                        <div class="laptop-keyboard"></div>
                    </div>
                </div>`;

            // Info section
            const infoSection = `
                <div class="project-info ">
                    <h2>${project.title}</h2>
                    <p>${project.summary}</p>
                    <button type="button" class="Documents-btn" data-bs-toggle="modal"
                            data-bs-target="#${project.title.toLowerCase().replace(/\s+/g, '')}Modal">
                        <span class="text">Case Study</span>
                    </button>
                </div>`;

            card.innerHTML = imageSection + infoSection;
            projectsContainer.appendChild(card);

            // Create modal
            const modalHtml = `
                <div class="modal fade" id="${project.title.toLowerCase().replace(/\s+/g, '')}Modal"
                     tabindex="-1" aria-labelledby="${project.title.toLowerCase().replace(/\s+/g, '')}ModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title text-secondary" id="${project.title.toLowerCase().replace(/\s+/g, '')}ModalLabel">${project.caseStudy}</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center d-flex flex-column align-items-center justify-content-start modal-overflow">
                                <h1 class="fs-1 fw-bold my-2">${project.title}</h1>
                                <div class="project-image ">
                                    <div class="laptop-container">
                                        <img src="${project.image}" alt="${project.title} Image" />
                                        <div class="laptop-keyboard"></div>
                                    </div>
                                </div>
                                <h2 class="my-3">Project Overview</h2>
                                <div class="modal-paragraph ">
                                    <p class="text-justify my-3">${project.summary}</p>
                                </div>
                                <div class="project-language ">
                                    <h2 class="my-3">Tool Used</h2>
                                    <div class="language-container">
                                        ${project.tools.map(tool => `<div><i class="fa-brands"></i> ${tool}</div>`).join('')}
                                    </div>
                                </div>
                                ${project.liveUrl ? `
                                <div class="link-container">
                                    <h2 class="my-3 fs-3 ">See Live</h2>
                                    <a href="${project.liveUrl}" target="_blank" class="text-secondary">
                                        Visit Website <i class="fa-solid fa-up-right-from-square"></i>
                                    </a>
                                </div>` : ''}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary px-3 py-2" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
        });

        // Trigger animation observer for newly added elements
        // This ensures the hidden-animation -> visible-animation transition works
        const elements = document.querySelectorAll('.hidden-animation');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-animation');
                    observer.unobserve(entry.target);
                }
            });
        });
        elements.forEach(element => observer.observe(element));

    } catch (error) {
        console.error('Error loading projects:', error);
        // Show error in UI
        projectsContainer.innerHTML = `
            <div class="project-container">
                <div class="project-info ">
                    <h2>Error Loading Projects</h2>
                    <p>Unable to load project data. Please check the console for details.</p>
                </div>
            </div>`;
    }
});