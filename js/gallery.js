function getGallery() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/json/gallery.json");
    xhr.onload = () => {
        if (xhr.status == 200) {

            let galleryContainer = document.getElementById("galleryContainer");
            let gallery = JSON.parse(xhr.response);

            for (let i = 0; i < gallery.images.length; i++) {
                let image = document.createElement("IMG");
                image.className = "thumbnail";
                image.src = "/images/" + gallery.images[i].fileName;

                // Redo later. Turn into modal view
                image.onclick = () => {
                    if (image.style.width != "auto") {
                        image.style.width = "auto";
                    } else {
                        image.style.width = "200px";
                    }
                }
                galleryContainer.appendChild(image);
            }
        }
    };
    xhr.send();
}