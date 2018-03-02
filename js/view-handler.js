function getView(url, /*cb*/) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            let container = document.getElementById("container");
            container.innerHTML = xhr.response;

            // TODO: Revamp. Collect addresses in tags, and then put those addresses in script srcs
            if (!galleryLoaded && url == "/views/gallery.html") {
                let script = document.createElement("SCRIPT");
                script.src = "/js/gallery.js"
                container.appendChild(script);
                galleryLoaded = true;
            } else if (url == "/views/gallery.html") {
                /*if (typeof cb == "function") {
                    cb();
                    
                }*/
                gallery.render(document.getElementById("galleryContainer"));
            }
        }
    }
    xhr.send();
}