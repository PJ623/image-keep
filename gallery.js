
var Gallery = {
    init: function init() {
        // Modal
        var Modal = {
            init: function init() {
                var ele = document.getElementById("modal");
                var modalImage = document.getElementById("modal-image");

                this.show = function show(src) {
                    modalImage.src = src;
                    ele.style.display = "flex";
                }

                this.hide = function hide() {
                    ele.style.display = "none";
                    modalImage.src = "";
                }

                // Again, arrow function for lexical 'this'.
                ele.addEventListener("click", () => {
                    this.hide();
                });

                delete this.init;
            }
        }

        Modal.init();

        // Actual gallery
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
            document.getElementById("gallery").appendChild(responsiveBlock);

            imageThumbnail.src = src;

            imageThumbnail.addEventListener("click", function () {
                Modal.show(src);
            });
        }

        this.addImage = function addImage(blob) {
            //imageCollection.push(blob);
            Database.put(blob);
            makeThumbnail(blob);
        }

        // Turn into property?
        this.loadImages = function loadImages(imageCollection) {
            console.log("loading...", imageCollection);
            for (let i = 0; i < imageCollection.length; i++)
                makeThumbnail(imageCollection[i]);
        }

        delete this.init;
    }
}
