const express = require('express');
const router = express.Router();
const path = require('path');

router.get("^/$|/index(.html)?", (req, res) => {
  // here the regex ^/$ |/index(.html)? means either a file starting and ending with / or the /index.html file where (.html)? means the .html is optional
  //res.sendFile('./views/index.html', {root: __dirname});
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "./new-page.html"); //302 by default but we want 301
  // 302: The HTTP status code 302 indicates that the requested resource has been temporarily moved to a different URL. The client should continue to use the original URL for future requests.
  // 301: The HTTP status code 301 indicates that the requested resource has been permanently moved to a different URL. The client should update its bookmarks and references to use the new URL for future requests.
});

module.exports = router;