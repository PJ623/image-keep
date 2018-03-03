let viewHandler = {
    currentView: "",
    // Map specific views to specific functions.
    specialViewMap: {
        "/views/gallery.html": () => {
            // If gallery doesn't already exist, create it by loading a script.
            if (!galleryLoaded) {
                let script = document.createElement("SCRIPT");
                script.src = "/js/gallery.js"

                container.appendChild(script);
                galleryLoaded = true;

                // If gallery already exists, simply render the gallery's contents onto the page.
            } else {
                gallery.render(document.getElementById("galleryContainer"));
            }
        }
    },

    // Get html and display html file using AJAX.
    getView: (url) => {

        // Only make AJAX request for a view if the view isn't already loaded.
        if (url != viewHandler.currentView) {
            let xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.onload = () => {
                if (xhr.status == 200) {
                    let container = document.getElementById("container");
                    container.innerHTML = xhr.response;

                    // Process special views like gallery.html.
                    if (viewHandler.specialViewMap[url]) {
                        viewHandler.specialViewMap[url]();
                    }
                    viewHandler.currentView = url;
                }
            }
            xhr.send();
        }
    }
}