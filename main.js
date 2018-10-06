Gallery.init();

// Make Converter object?
var conversionCanvas = document.getElementById("conversion-canvas");
var conversionCanvasContext = conversionCanvas.getContext("2d");

function compressAndStoreImage(blob, originalImageUrl) {
    var tempImgEle = new Image();
    tempImgEle.crossOrigin = "Anonymous"; // To prevent from tainting canvas
    tempImgEle.src = URL.createObjectURL(blob);

    console.log("url:", originalImageUrl);

    tempImgEle.onload = function () {
        conversionCanvas.height = tempImgEle.height;
        conversionCanvas.width = tempImgEle.width;
        conversionCanvasContext.drawImage(tempImgEle, 0, 0);

        conversionCanvas.toBlob(function (blob) {
            Gallery.addImage(blob, originalImageUrl);
        }, "image/jpeg", 0.92);
    }
}

// Account for errors
function fetchImage(url, bypassAttempted) {
    if (bypassAttempted == undefined)
        bypassAttempted = false;

    fetch(url)
        .then(function (response) {
            if (response.status == 200) {
                url = response.url;
                response.blob().then(function (blob) {
                    compressAndStoreImage(blob, url);
                });
            } else {
                alert("Response status: " + response.status + ". " + "Image could not be fetched.");
            }
        }).catch(function (e) {
            if (bypassAttempted == false) {
                console.log(e);
                console.log("Attempting to bypass CORS...");
                bypassAttempted = true;
                fetchImage(("https://cors-anywhere.herokuapp.com/" + url), bypassAttempted);
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
    imageSrcTextbox.focus();
});

var deleteDbButton = document.getElementById("delete-db");
deleteDbButton.addEventListener("click", function () {
    if (confirm("Delete all images?"))
        Gallery.deleteImages();

    this.blur();
});

var optionsToggleButton = document.getElementById("options-toggle");

// Turn into gallery property?
// rename to galleryControlsDisplayed?
var hiddenControlsDisplayed = false;

optionsToggleButton.addEventListener("click", function () {
    var hiddenControlsContainers = document.getElementsByClassName("hidden-controls-container");
    for (let i = 0; i < hiddenControlsContainers.length; i++) {
        if (hiddenControlsDisplayed == false)
            hiddenControlsContainers[i].style.display = "block";
        else
            hiddenControlsContainers[i].style.display = "none";
    }

    if (hiddenControlsDisplayed == false)
        hiddenControlsDisplayed = true;
    else
        hiddenControlsDisplayed = false;

    this.blur()
});