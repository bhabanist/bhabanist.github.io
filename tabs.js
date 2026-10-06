function openTab(evt, tabName) {
    if (typeof evt === 'string' && !tabName) {
        tabName = evt;
        evt = window.event;
    }
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tab-contents");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-tab");
    }
    
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-links");
    }
    
    if (!tabName) return;

    var targetContent = document.getElementById(tabName) ||
                        document.getElementById(tabName.toLowerCase()) ||
                        document.getElementById(tabName.charAt(0).toUpperCase() + tabName.slice(1));
    if (targetContent) {
        targetContent.style.display = "block";
        targetContent.classList.add("active-tab");
    }
    
    var targetTab = null;
    if (evt && evt.currentTarget) {
        targetTab = evt.currentTarget;
    } else if (evt && evt.target) {
        targetTab = evt.target.closest ? evt.target.closest(".tab-links") : evt.target;
    }
    if (!targetTab || !targetTab.classList || !targetTab.classList.contains("tab-links")) {
        for (i = 0; i < tablinks.length; i++) {
            var dataTab = tablinks[i].getAttribute("data-tab") || "";
            var onclickAttr = tablinks[i].getAttribute("onclick") || "";
            if (dataTab.toLowerCase() === tabName.toLowerCase() || onclickAttr.toLowerCase().indexOf(tabName.toLowerCase()) !== -1) {
                targetTab = tablinks[i];
                break;
            }
        }
    }
    if (targetTab && targetTab.classList) {
        targetTab.classList.add("active-links");
    }
}

// Safely set height only if #research exists
function setResearchSectionHeight() {
    var researchSection = document.getElementById("research");
    if (!researchSection) return;
    var maxHeight = researchSection.clientHeight;

    var tabContents = document.querySelectorAll(".tab-contents");
    tabContents.forEach(content => {
        content.style.minHeight = maxHeight + "px";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setResearchSectionHeight);
} else {
    setResearchSectionHeight();
}

function showContent(evt, tabName) {
    openTab(evt, tabName);
}

// Ensure default tab is visible on load and attach touch/click/keyboard listeners
document.addEventListener('DOMContentLoaded', function () {
    const defaultTab = document.querySelector(".tab-contents.active-tab");
    if (defaultTab) {
        defaultTab.style.display = "block";
    }

    const tabLinks = document.querySelectorAll(".tab-links");
    tabLinks.forEach(function (btn) {
        function activate(e) {
            var targetId = btn.getAttribute("data-tab");
            if (!targetId) {
                var onclickAttr = btn.getAttribute("onclick") || "";
                var match = onclickAttr.match(/'([^']+)'/);
                if (match) targetId = match[1];
            }
            if (targetId) {
                openTab(e, targetId);
            }
        }
        btn.addEventListener("touchstart", function (e) {
            activate(e);
        }, { passive: true });
        btn.addEventListener("click", function (e) {
            activate(e);
        });
        btn.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate(e);
            }
        });
    });

    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const mainContent = document.querySelector('.main-content');

    if (mainContent && sidebarLinks.length > 0) {
        sidebarLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                    e.preventDefault();
                    fetch(href)
                        .then(response => response.text())
                        .then(content => {
                            mainContent.innerHTML = content;
                        })
                        .catch(() => {
                            window.location.href = href;
                        });
                }
            });
        });
    }
});
