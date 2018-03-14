// Temporary file

// Sanitize inputs...

// Request body doesn't actually get encrypted yet
function requestEncryption(url, fileName) {
    
    // Make sure gallery exists locally
    if (galleryLoaded) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", /*"/encrypt"*/ "/upload");
        //xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status == 200) {
                console.log(xhr.response);
                document.getElementById("url-box").value = "";
                document.getElementById("upload-status").textContent = "Image uploaded.";
            }
        }
        xhr.send(JSON.stringify({ url: url, fileName: fileName }));
        newImagesUploaded = true;
    }
}