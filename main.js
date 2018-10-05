Gallery.init();

// Make Converter object?
var conversionCanvas = document.getElementById("conversion-canvas");
var conversionCanvasContext = conversionCanvas.getContext("2d");

function compressAndStoreBlob(blob) {
    var tempImgEle = new Image();
    tempImgEle.crossOrigin = "Anonymous"; // To prevent from tainting canvas
    tempImgEle.src = URL.createObjectURL(blob);

    tempImgEle.onload = function () {
        conversionCanvas.height = tempImgEle.height;
        conversionCanvas.width = tempImgEle.width;
        conversionCanvasContext.drawImage(tempImgEle, 0, 0);

        conversionCanvas.toBlob(function (blob) {
            Gallery.addImage(blob);
        }, "image/jpeg", 0.92);
    }
}

// Account for errors
function fetchImage(src, bypassAttempted) {
    if (bypassAttempted == undefined)
        bypassAttempted = false;

    fetch(src)
        .then(function (response) {
            if (response.status == 200) {
                response.blob().then(function (blob) {
                    compressAndStoreBlob(blob);
                });
            } else {
                alert("Response status: " + response.status + ". " + "Image could not be fetched.");
            }
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
imageSrcTextbox.focus();

var fetchButton = document.getElementById("fetch");
fetchButton.addEventListener("click", function () {
    var src = imageSrcTextbox.value.trim();

    if (src == "")
        alert("Enter a URL.");
    else
        fetchImage(src);

    imageSrcTextbox.value = "";
});

document.getElementById("delete-db").addEventListener("click", function () {
    if (confirm("Delete all images?"))
        Gallery.deleteImages();
});