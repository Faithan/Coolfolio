document.addEventListener("DOMContentLoaded", function () {
    // Add a class to elements with the 'hidden-animation' class when they come into view
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
});
