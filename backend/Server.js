const http = require("http");
const fs   = require("fs");
const path = require("path");

// Map file extensions to MIME types
const MIME = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
};

// Helper: send a file from /public
function sendFile(res, filename, statusCode = 200) {
  const filePath = path.join(__dirname, "public", filename);
  const ext      = path.extname(filename);
  const mimeType = MIME[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 — Page Not Found</h1>");
      return;
    }
    res.writeHead(statusCode, { "Content-Type": mimeType });
    res.end(data);
  });
}

// Helper: send plain text
function sendText(res, text, statusCode = 200) {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.end(text);
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0]; // strip query strings

  // ── HTML Page Routes ──────────────────────────────────
  if (url === "/" || url === "/home") {
    return sendFile(res, "home.html");
  }

  if (url === "/about") {
    return sendFile(res, "about.html");
  }

  // FIX: Was "gallary.html" (typo) — corrected to "gallery.html"
  if (url === "/gallery") {
    return sendFile(res, "gallery.html");
  }

  if (url === "/sample") {
    return sendFile(res, "sample.html");
  }

  // FIX: Added login, register, and api-tester routes (were completely missing)
  if (url === "/login") {
    return sendFile(res, "login.html");
  }

  if (url === "/register") {
    return sendFile(res, "register.html");
  }

  if (url === "/api-tester") {
    return sendFile(res, "api-tester.html");
  }

  // ── API-style text routes (legacy) ───────────────────
  if (url === "/contact") {
    return sendText(res, "Welcome to Contact Page");
  }

  // ── Static file passthrough ───────────────────────────
  if (url.endsWith(".html") || url.endsWith(".css") || url.endsWith(".js")) {
    return sendFile(res, path.basename(url));
  }

  // ── 404 ───────────────────────────────────────────────
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
    <body style="font-family:sans-serif;text-align:center;padding:4rem;background:#0a0a0f;color:#f0f0f8">
      <h1 style="font-size:4rem;margin-bottom:1rem">404</h1>
      <p>Page not found</p>
      <a href="/" style="color:#e8ff47">← Go Home</a>
    </body>
    </html>
  `);
});

server.listen(8081, () => {
  console.log("✅ Server running on http://localhost:8081");
});