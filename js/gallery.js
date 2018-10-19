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
                element.remove();
            });
        }

        function makeThumbnail(blob, originalImageUrl) {
            var src;

            if (typeof blob == "string")
                src = originalImageUrl;
            else
                src = window.URL.createObjectURL(blob);

            var imageThumbnail = document.createElement("img");

            imageThumbnail.className = "image-thumbnail";
            imageThumbnail.src = src;
            imageThumbnail.dataset.originalImageUrl = originalImageUrl;

            var imageContainer = document.createElement("div");
            imageContainer.className = "image-container";

            var hiddenControlsContainer = document.createElement("div");
            hiddenControlsContainer.className = "hidden-controls-container";

            // Maybe rework this later. Don't like how Gallery is dependant on an insignificant global variable.
            if (hiddenControlsDisplayed)
                hiddenControlsContainer.style.display = "block";
            else
                hiddenControlsContainer.style.display = "none";

            var deleteButton = document.createElement("button");
            deleteButton.className = "image-delete-button hidden-control";
            deleteButton.addEventListener("click", function () {
                Gallery.removeImage(originalImageUrl, responsiveBlock);
            });

            var deleteButtonImg = document.createElement("img");
            deleteButtonImg.src = "./assets/images/glyphicons/glyphicons-193-remove-sign.png";
            deleteButton.appendChild(deleteButtonImg);

            imageThumbnail.onload = function () {
                const offset = Math.floor(deleteButtonImg.height / 2 - 2);

                hiddenControlsContainer.style.bottom = imageThumbnail.height + offset;
                hiddenControlsContainer.style.left = offset;
            }

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

        function sortImagesByDate(a, b) {
            return a.dateAdded - b.dateAdded;
        }

        function loadImages(imageCollection) {
            console.log("Loading gallery:", imageCollection);

            if (imageCollection.length > 0) {
                galleryElement.innerHTML = "";

                imageCollection.sort(sortImagesByDate/*function (a, b) {
                    return a.dateAdded - b.dateAdded;
                }*/);
                for (let i = 0; i < imageCollection.length; i++)
                    makeThumbnail(imageCollection[i].data, imageCollection[i].source);
            } else {
                var instructionsImageSrc = "assets/images/instructions/image-vault-instructions.JPG";
                Gallery.addImage(instructionsImageSrc, instructionsImageSrc);
            }
        }

        this.deleteImages = function deleteImages() {
            galleryElement.innerHTML = "";
            Database.clearRecords();
        }

        this.exportSources = function exportSources() {
            Database.getAll(function () {
                var imageCollection = this.result;
                var exportString = "";

                imageCollection.sort(sortImagesByDate);

                for (let i = 0; i < imageCollection.length; i++)
                    exportString += imageCollection[i].source + ",";

                prompt("Please copy the export string:", exportString);
            });
        }

        this.importSources = function importSources() {
            var exportString = prompt("Enter export string.");

            if (exportString) {
                var sourcesArr = exportString.split(",");
                for (let i = 0; i < sourcesArr.length; i++)
                    fetchImage(sourcesArr[i]);
            }
        }

        Database.getAll(function () {
            var imageCollection = this.result;
            loadImages(imageCollection);
        });

        delete this.init;
    }
}
