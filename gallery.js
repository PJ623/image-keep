var Gallery = {
    init: function init() {
        // Loading dependencies: Database and Modal
        // IV: Image Vault, an old name that was used for this project.
        Database.connect("IVGallery", 1);
        Modal.init();

        // Actual gallery
        var galleryEle = document.getElementById("gallery");

        function makeThumbnail(blob) {
            var src = URL.createObjectURL(blob);
            var imageThumbnail = document.createElement("img");

            imageThumbnail.className = "image-thumbnail";
            imageThumbnail.src = src;

            var imageContainer = document.createElement("div");
            imageContainer.className = "image-container";

            var responsiveBlock = document.createElement("div");
            responsiveBlock.className = "responsive-block";

            imageContainer.appendChild(imageThumbnail);
            responsiveBlock.appendChild(imageContainer);
            galleryEle.appendChild(responsiveBlock);

            imageThumbnail.src = src;

            imageThumbnail.addEventListener("click", function () {
                Modal.show(src);
            });
        }

        this.addImage = function addImage(blob) {
            Database.put(blob);
            makeThumbnail(blob);
        }

        function loadImages(imageCollection) {
            console.log("Loading gallery:", imageCollection);
            for (let i = 0; i < imageCollection.length; i++)
                makeThumbnail(imageCollection[i]);
        }

        this.deleteImages = function deleteImages(){
            galleryEle.innerHTML = "";
            Database.clearRecords();
        }

        Database.getAll(function () {
            imageCollection = this.result;
            loadImages(imageCollection);
        });

        delete this.init;
    }
}
