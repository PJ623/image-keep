/*
    TODO
    * Encrypt and decrypt files
    * Tidy up front end
    * Serve favicon
*/

var http = require("http");
var fs = require("fs");
const port = 3000;

http.createServer((req, res) => {

    // The following instructions serve views.
    if (req.url == "/" && req.method == "GET") {
        serveFile("./views/layout.html");
    }

    if (req.url == "/views/about.html" && req.method == "GET") {
        serveFile("." + req.url);
    }

    if (req.url == "/views/gallery.html" && req.method == "GET") {
        serveFile("." + req.url);
    }

    if (req.url.match(/.json$/i) && req.method == "GET") {
        serveFile("." + req.url);
    }

    // The rest of these instructions are for serving non-view files.
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

}).listen(port);