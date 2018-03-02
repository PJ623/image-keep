function Gallery() {

    // Really just contains objects containing image file names at the moment.
    this.images = [];

    // Parses JSON and adds the image data from that JSON to the Gallery object.
    this.insertImages = (galleryJSON) => {
        if (galleryJSON) {
            let receivedGallery = JSON.parse(galleryJSON);

            for (let i = 0; i < receivedGallery.images.length; i++) {
                this.images.push(receivedGallery.images[i]);
            }
        }
    }

    // Renders onto given HTML element, 'ele'.
    // TODO: Modularize this method. Maybe take a call back to hook up the onclick stuff.
    this.render = (ele) => {
        for (let i = 0; i < this.images.length; i++) {
            let image = document.createElement("IMG");
            let modal;
            let modalContent;

            image.className = "thumbnail";
            image.src = "/images/" + this.images[i].fileName;

            if (document.getElementById("modal") && document.getElementById("modal-content")) {
                modal = document.getElementById("modal");
                modalContent = document.getElementById("modal-content");
            } else {
                modal = document.createElement("DIV");
                modal.id = "modal";
                modal.style.display = "none";

                modalContent = document.createElement("IMG");
                modalContent.id = "modal-content";

                document.body.appendChild(modal);
                modal.appendChild(modalContent);
            }

            image.onclick = () => {
                if (modal.style.display == "none") {
                    modal.style.display = "flex";
                    modalContent.src = image.src;
                }
            }

            modal.onclick = () => {
                modal.style.display = "none";
                modalContent.src = "";
            }

            ele.appendChild(image);
        }
    }
}

// Uses AJAX to request a JSON file containing gallery data.
function getGallery(url) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onload = () => {
        if (xhr.status == 200) {
            gallery.insertImages(xhr.response);
            gallery.render(document.getElementById("galleryContainer"));
        }
    };

    xhr.send();
}

// Create gallery object.
let gallery = new Gallery();

// Make more flexible... put this call somewhere else?
getGallery("/json/gallery.json");