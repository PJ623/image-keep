var Gallery = {
    init: function init() {
        // Loading dependencies: Database and Modal
        // IV: Image Vault, an old name that was used for this project.
        Database.connect("IVGallery", 1);
        Modal.init();

        // Actual gallery
        var galleryElement = document.getElementById("gallery");

        this.removeImage = function removeImage(originalImageUrl, element) {
            Database.remove(originalImageUrl, function deleteElement() {
                galleryElement.removeChild(element);
            });
        }

        function makeThumbnail(blob, originalImageUrl) {
            var src = window.URL.createObjectURL(blob);
            var imageThumbnail = document.createElement("img");

            imageThumbnail.className = "image-thumbnail";
            imageThumbnail.src = src;
            imageThumbnail.dataset.originalImageUrl = originalImageUrl;

            var imageContainer = document.createElement("div");
            imageContainer.className = "image-container";

            var hiddenControlsContainer = document.createElement("div");
            hiddenControlsContainer.className = "hidden-controls-container";

            // Maybe rework this later. Don't like how Gallery is dependant on an insignificant global variable.
            if (hiddenControlsDisplayed) {
                hiddenControlsContainer.style.display = "block";
            } else {
                hiddenControlsContainer.style.display = "none";
            }

            var deleteButton = document.createElement("button");
            deleteButton.className = "image-delete-button hidden-control";
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
                Gallery.removeImage(originalImageUrl, responsiveBlock);
            });

            var responsiveBlock = document.createElement("div");
            responsiveBlock.className = "responsive-block";

            imageContainer.appendChild(imageThumbnail);
            hiddenControlsContainer.appendChild(deleteButton);
            imageContainer.appendChild(hiddenControlsContainer);
            responsiveBlock.appendChild(imageContainer);
            galleryElement.appendChild(responsiveBlock);

            imageThumbnail.addEventListener("click", function () {
                Modal.show(src);
            });
        }

        // Deal with duplicates?
        this.addImage = function addImage(blob, originalImageUrl) {
            Database.put({ data: blob, source: originalImageUrl, dateAdded: Date.now() }, originalImageUrl);
            makeThumbnail(blob, originalImageUrl);
        }

        function loadImages(imageCollection) {
            console.log("Loading gallery:", imageCollection);
            imageCollection.sort(function (a, b) {
                return a.dateAdded - b.dateAdded;
            });
            for (let i = 0; i < imageCollection.length; i++)
                makeThumbnail(imageCollection[i].data, imageCollection[i].source);
        }

        this.deleteImages = function deleteImages() {
            galleryElement.innerHTML = "";
            Database.clearRecords();
        }

        Database.getAll(function () {
            imageCollection = this.result;
            loadImages(imageCollection);
        });

        delete this.init;
    }
}
