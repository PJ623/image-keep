/*
    TODO
    * Change way images are stored
    * Encrypt and decrypt files
    * Tidy up front end
    * Serve favicon
*/

var http = require("http");
const port = 3000;
var fs = require("fs");
var crypto = require("crypto");

http.createServer((req, res) => {

    // The following instructions serve views.
    if (req.url == "/" && req.method == "GET") {
        serveFile("./views/layout.html");
    }

    if (req.url.match(/.html$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    // The rest of these instructions are for serving non-view files.
    if (req.url.match(/.json$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    if (req.url.match(/.css$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    if (req.url.match(/.js$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    // TODO: Serve favicon.
    /*
    if (req.url.match(/.ico$/)) {
        serveFile("." + req.url);
    }*/

    if (req.url.match(/.jpg$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    if (req.url.match(/.png$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    // Not needed.
    if (req.url.match(/.txt$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    if (req.url == "/encrypt" && req.method == "POST") {

        let body = "";

        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {

            let myKey = crypto.createCipher("aes-128-cbc", "This is the stance.");
            let myStr = myKey.update(body, "utf8", "hex");
            myStr += myKey.final("hex");

            console.log(myStr);

            res.writeHead("200");
            res.write(myStr);
            res.end();
        });
    }

    // General file-serving function.
    function serveFile(dir) {
        fs.readFile(dir, (err, data) => {
            if (err) {
                console.log("Readfile error!");
                throw err;
            }

            let fileExtension = dir.match(/\.\w+$/i);

            const contentTypeMap = {
                ".css": "text/css",
                ".html": "text/html",
                ".ico": "x-icon",
                ".jpg": "image/jpg",
                ".js": "text/js",
                ".json": "application/json",
                ".png": "image/png",
                ".txt": "text/plain"
            }

            console.log("Serving", dir);

            res.writeHead(200, { "Content-Type": contentTypeMap[fileExtension] });
            res.write(data);
            res.end();
        });
    }

    if (req.url == "/upload" && req.method == "POST") {

        let url = "";

        req.on("data", (data) => {
            url += data;
        });

        req.on("end", () => {
            saveImage(url, "uploaded.jpg");
        });
    }

    // Unfinished
    function saveImage(url, fileName) {

        http.get(url, (imageRes) => {
            let imageData = "";
            imageRes.setEncoding("binary");

            imageRes.on("data", (data) => {
                imageData += data;
            });

            imageRes.on("end", () => {

                // Make filename dynamic
                fs.writeFile("./images/" + fileName, imageData, "binary", (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("File has been saved.");
                });

                res.writeHead("200");
                //res.write();
                res.end();
            });
        });
    }

}).listen(port);