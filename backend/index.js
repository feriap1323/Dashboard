var http = require("http");

http.createServer((req, res) => {
    res.end("Server Running");
}).listen(8080);