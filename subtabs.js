function openSubTab(evt, subTabName) {
    if (typeof evt === 'string' && !subTabName) {
        subTabName = evt;
        evt = window.event;
    }
    var i, subtabcontent, subtablinks;

    subtabcontent = document.getElementsByClassName("sub-tab-contents");
    for (i = 0; i < subtabcontent.length; i++) {
        subtabcontent[i].style.display = "none";
        subtabcontent[i].classList.remove("active-tab");
    }

    subtablinks = document.getElementsByClassName("sub-tab-links");
    for (i = 0; i < subtablinks.length; i++) {
        subtablinks[i].classList.remove("active-links");
    }

    if (!subTabName) return;

    // Find target content with case insensitivity support
    var target = document.getElementById(subTabName) ||
                 document.getElementById(subTabName.toLowerCase()) ||
                 document.getElementById(subTabName.charAt(0).toUpperCase() + subTabName.slice(1));

    if (target) {
        target.style.display = "block";
        target.classList.add("active-tab");
    }

    var targetTab = null;
    if (evt && evt.currentTarget) {
        targetTab = evt.currentTarget;
    } else if (evt && evt.target) {
        targetTab = evt.target.closest ? evt.target.closest(".sub-tab-links") : evt.target;
    }

    if (!targetTab || !targetTab.classList || !targetTab.classList.contains("sub-tab-links")) {
        for (i = 0; i < subtablinks.length; i++) {
            var dataSubTab = subtablinks[i].getAttribute("data-subtab") || "";
            var onclickAttr = subtablinks[i].getAttribute("onclick") || "";
            if (dataSubTab.toLowerCase() === subTabName.toLowerCase() || onclickAttr.toLowerCase().indexOf(subTabName.toLowerCase()) !== -1) {
                targetTab = subtablinks[i];
                break;
            }
        }
    }

    if (targetTab && targetTab.classList) {
        targetTab.classList.add("active-links");
    }
}

// Ensure default subtab is visible on load and attach touch/click/keyboard listeners
document.addEventListener("DOMContentLoaded", function () {
    const defaultSubTab = document.querySelector(".sub-tab-contents.active-tab") || document.querySelector(".sub-tab-contents");
    if (defaultSubTab) {
        defaultSubTab.style.display = "block";
    }

    const subTabLinks = document.querySelectorAll(".sub-tab-links");
    subTabLinks.forEach(function (btn) {
        function activate(e) {
            var targetId = btn.getAttribute("data-subtab");
            if (!targetId) {
                var onclickAttr = btn.getAttribute("onclick") || "";
                var match = onclickAttr.match(/'([^']+)'/);
                if (match) targetId = match[1];
            }
            if (targetId) {
                openSubTab(e, targetId);
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
});
