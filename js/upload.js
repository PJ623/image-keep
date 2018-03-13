// Temporary file

function requestEncryption(str) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/encrypt");
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onload = () => {
        if(xhr.status == 200){
            console.log(xhr.response);
        }
    }
    xhr.send(str);
}