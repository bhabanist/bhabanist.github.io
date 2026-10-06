// JavaScript code to load content into the main area
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const mainContent = document.querySelector('.main-content');

    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = link.getAttribute('href');

            // Load content from the clicked link's href into the main content area
            fetch(href)
                .then(response => response.text())
                .then(content => {
                    mainContent.innerHTML = content;
                });
        });
    });
});

