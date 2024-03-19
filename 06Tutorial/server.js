const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get('^/$ |/index(.html)?', (req, res)=>{ // here the regex ^/$ |/index(.html)? means either a file starting and ending with / or the /index.html file where (.html)? means the .html is optional
  //res.sendFile('./views/index.html', {root: __dirname});
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/new-page(.html)?', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page(.html)?', (req, res)=>{
  res.redirect(301,'./new-page.html');  //302 by default but we want 301
  // 302: The HTTP status code 302 indicates that the requested resource has been temporarily moved to a different URL. The client should continue to use the original URL for future requests.
  // 301: The HTTP status code 301 indicates that the requested resource has been permanently moved to a different URL. The client should update its bookmarks and references to use the new URL for future requests.
});

//Route Handlers
app.get('/hello(.html)?', (req,res,next)=>{   /// this is function chaining where after the response one goes to next() which is defined right then
  console.log("attempted to load hello.html");
  next();
}, (req, res)=>{
  res.send("Hello World");
});

// Chaining route handler
const one = (req, res, next)=>{
  console.log("one")
  next();
}
const two = (req, res, next)=>{
  console.log("two")
  next();
}
const three = (req, res)=>{
  console.log("three")
  res.send("Finished")
}
app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res)=>{
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); // regex /* means anything for all

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));