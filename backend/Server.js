const http = require("http");

const server = http.createServer((req, res) => {

    // Home Route
    if (req.url == "/") {
        res.write("Welcome Home Page");
        res.end();
    }

    // About Route
    else if (req.url == "/about") {
        res.write("Welcome About Page");
        res.end();
    }

    // Contact Route
    else if (req.url == "/contact") {
        res.write("Welcome Contact Page");
        res.end();
    }

    // Invalid Route
    else {
        res.write("404 Page Not Found");
        res.end();
    }

});

server.listen(8081, () => {
    console.log("Server Running");
});