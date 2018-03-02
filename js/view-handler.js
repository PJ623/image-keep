let viewHandler = {
    
    // Maps special views to their special functions:
    specialViewMap: {
        "/views/gallery.html": () => {
            if (!galleryLoaded) {
                let script = document.createElement("SCRIPT");
                script.src = "/js/gallery.js"

                container.appendChild(script);
                galleryLoaded = true;
            } else {
                gallery.render(document.getElementById("galleryContainer"));
            }
        }
    },

    // Get html and display html file using AJAX:
    getView: (url) => {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                let container = document.getElementById("container");
                container.innerHTML = xhr.response;

                // Process special views like gallery.html
                if(viewHandler.specialViewMap[url]){
                    viewHandler.specialViewMap[url]();
                }
            }
        }
        xhr.send();
    }
}