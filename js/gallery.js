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

            image.className = "thumbnail";
            image.src = "/images/" + this.images[i].fileName;

            if (document.getElementById("modal") && document.getElementById("modal-content")) {
                var modal = document.getElementById("modal");
                var modalContent = document.getElementById("modal-content");
            } else {
                var modal = document.createElement("DIV");
                modal.id = "modal";
                modal.style.display = "none";

                var modalContent = document.createElement("IMG");
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

// Create gallery object.
let gallery = new Gallery();

// Uses AJAX to request a JSON file containing gallery data.
function getGallery() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/json/gallery.json");

    xhr.onload = () => {
        if (xhr.status == 200) {
            let galleryContainer = document.getElementById("galleryContainer");
            gallery.insertImages(xhr.response);
            gallery.render(galleryContainer);
        }
    };

    xhr.send();
}