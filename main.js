// IV: Image Vault, an old name that was used for this project.
Database.connect("IVGallery", 1);

Gallery.init();

Database.getAll(function () {
    imageCollection = this.result;
    Gallery.loadImages(imageCollection);
});

// Make Converter object
var conversionCanvas = document.getElementById("conversion-canvas");
var conversionCanvasContext = conversionCanvas.getContext("2d");
var conversionImg = document.getElementById("conversion-img");

conversionImg.addEventListener("load", convertImageToBlob);

function convertImageToBlob() {
    conversionCanvas.height = conversionImg.height;
    conversionCanvas.width = conversionImg.width;
    conversionCanvasContext.drawImage(conversionImg, 0, 0);
    conversionCanvas.toBlob((blob) => {
        Gallery.addImage(blob);
    }, "image/jpeg", 0.92);
}

// Account for errors
function fetchImage(src, bypassAttempted) {
    if (bypassAttempted == undefined)
        bypassAttempted = false;

    fetch(src)
        .then(function (response) {
            var src = response.url;

            if (response.status == 200)
                conversionImg.src = src;
            else
                alert("Response status: " + response.status + ". " + "Image could not be fetched.");
        }).catch(function (e) {
            if (bypassAttempted == false) {
                console.log(e);
                console.log("Attempting to bypass CORS...");
                bypassAttempted = true;
                fetchImage(("https://cors-anywhere.herokuapp.com/" + src), bypassAttempted);
            } else {
                alert(e);
            }
        });
}

var imageSrcTextbox = document.getElementById("image-src-textbox");

document.getElementById("fetch").addEventListener("click", function () {
    var src = imageSrcTextbox.value.trim();

    if (src == "")
        alert("Enter a URL.");
    else
        fetchImage(src);

    imageSrcTextbox.value = "";
});

document.getElementById("delete-db").addEventListener("click", function () {
    if(confirm("Delete database?")){
        document.getElementById("gallery").innerHTML = "";
        Database.clearRecords();
    }
});