// Set nav bar elements to have the same height as the navbar, even if navbar's height is not defined with an absolute metric in CSS.

let navBar = document.getElementsByTagName("NAV")[0];
let navBarHeight = window.getComputedStyle(navBar, null).height;

window.addEventListener("resize", () => {
    // TODO: Resize navbar instead of controls?
    // navBar.style.height = "90px";
    resizeNavControls();
    console.log("navBarHeight:", navBarHeight);
}, true);

function resizeNavControls() {
    let navSections = navBar.getElementsByTagName("UL");

    for (let i = 0; i < navSections.length; i++) {
        navSections[i].style.height = navBarHeight;
    }
}

resizeNavControls();

let dropdown = document.getElementById("nav-dropdown");
let dropdownControls = document.getElementsByClassName("dropdown-control");
let dropdownContent = dropdown.getElementsByClassName("dropdown-content")[0];

if (window.innerWidth < window.innerHeight) {
    dropdown.style.display = "flex";
    console.log("portrait");
    for (let i = 0; i < dropdownControls.length; i++) {
        let li = document.createElement("LI");
        li.appendChild(dropdownControls[0]);
        dropdownContent.appendChild(li);
    }
} else {
    console.log("landscape");
}

// Edit to be more dynamic.
function toggleDropdown() {
    if (dropdownContent.style.display != "none") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}