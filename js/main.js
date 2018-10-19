Gallery.init();

// Make Converter object?
var conversionCanvas = document.getElementById("conversion-canvas");
var conversionCanvasContext = conversionCanvas.getContext("2d");

function compressAndStoreImage(blob, originalImageUrl) {
    var tempImgEle = new Image();
    tempImgEle.crossOrigin = "Anonymous"; // To prevent from tainting canvas
    tempImgEle.src = URL.createObjectURL(blob);

    tempImgEle.onload = function () {
        conversionCanvas.height = tempImgEle.height;
        conversionCanvas.width = tempImgEle.width;
        conversionCanvasContext.drawImage(tempImgEle, 0, 0);

        conversionCanvas.toBlob(function (blob) {
            Gallery.addImage(blob, originalImageUrl);
        }, "image/jpeg", 0.92);
    }
}

function fetchImage(url, bypassAttempted) {
    if (bypassAttempted == undefined)
        bypassAttempted = false;

    fetch(url, {
        method: "GET",
        mode: "cors"
    }).then(function (response) {
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
var fetchButton = document.getElementById("fetch-button");

fetchButtonCb = function () {
    var src = imageSrcTextbox.value.replace("http://", "https://").trim();

    if (src == "")
        alert("Enter a URL.");
    else
        fetchImage(src);

    imageSrcTextbox.value = "";
    fetchButton.blur();
}

fetchButton.addEventListener("click", fetchButtonCb);

imageSrcTextbox.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        fetchButtonCb();
        fetchButton.focus();
        fetchButton.blur();
    }
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

var exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", Gallery.exportSources);

var importButton = document.getElementById("import-button");
importButton.addEventListener("click", Gallery.importSources);