// Temporary file

function requestEncryption(str) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", /*"/encrypt"*/ "/upload");
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onload = () => {
        if(xhr.status == 200){
            console.log(xhr.response);
            document.getElementById("url-box").value = "";
            document.getElementById("upload-status").textContent = "Image uploaded.";
        }
    }
    xhr.send(str);
}