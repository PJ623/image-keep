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

// Maps logged-in users to their galleries. This is temporary.
var galleryMap = {};

// Temporary.
const userID = 0;

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
        galleryMap[userID] = { gallery: ".".concat(req.url) };
        console.log("GalleryMap:", galleryMap);
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

        let result = "";

        req.on("data", (data) => {
            result += data;
        });

        req.on("end", () => {
            result = JSON.parse(result);
            //console.log(result);
            let url = result.url;
            let fileName = result.fileName + url.match(/\.\w+$/);
            
            saveImage(url, fileName);

            //saveImage();
            // Remove later
            res.writeHead("200");
            //res.write();
            res.end();
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

                let gallery = require(galleryMap[userID].gallery);

                gallery.images.push({ fileName: fileName });
                
                fs.writeFile("./images/" + fileName, imageData, "binary", (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("File " + fileName + " has been saved.");
                });

                fs.writeFile(galleryMap[userID].gallery, JSON.stringify(gallery), (err) => {
                    if(err) {
                        throw err;
                    }
                    console.log("Updated gallery JSON.");
                });

                res.writeHead("200");
                res.end();
            });
        });
    }

}).listen(port);