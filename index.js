const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8080;

// Create server
// The function passesed into the `http.createServer()`,
// will be executed when someone tries to access on the port
// `req` represents the request from the client,
// as an object (http.IncomingMessage)
// This object has a property called `url`
// `res` represents the response to the client.
// If the response is supposed to be displayed as HTML,
// you should include an HTTP header with the correct content type
// `__dirname` is a built-in variable in Node.js that gives
// the absolute path of the directory containing
// the current JavaScript file (the file in which `__dirname` is used)
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    const filePath = path.join(__dirname, "index.html");
    serveHTMLFile(filePath, res);
  } else if (url === "/about") {
    const filePath = path.join(__dirname, "about.html");
    serveHTMLFile(filePath, res);
  } else if (url === "/contact-me") {
    const filePath = path.join(__dirname, "contact-me.html");
    serveHTMLFile(filePath, res);
  } else if (url === "/styles.css") {
    const filePath = path.join(__dirname, "styles.css");
    serveCSSFile(filePath, res);
  } else {
    const filePath = path.join(__dirname, "404.html");
    serveHTMLFile(filePath, res);
  }
});

// Function to serve HTML files
const serveHTMLFile = (filePath, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
};

// Function to serve CSS files
const serveCSSFile = (filePath, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(content);
    }
  });
};

// Make the server listen on the port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
