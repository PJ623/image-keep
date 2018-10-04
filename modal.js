var Modal = {
    init: function init() {
        var ele = document.getElementById("modal");
        var modalImage = document.getElementById("modal-image");

        this.show = function show(src) {
            modalImage.src = src;

            /*
            modalImage.style.maxWidth = window.innerWidth;
            modalImage.style.maxHeight = window.innerHeight;*/

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