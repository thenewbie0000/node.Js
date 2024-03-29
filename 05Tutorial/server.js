const fs = require("fs");
const fsPromises = require("fs").promises;
const http = require("http");
const path = require("path");

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

// initialize object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName)=>logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response)=>{
  try{
    const rawdata = await fsPromises.readFile(
      filePath, 
      !contentType.includes('image')?'utf-8': ''
    );
    const data = contentType === 'application/json'
    ? JSON.parse(rawdata):rawdata;
    response.writeHead(
      filePath.includes('404.html')?404:200,
      {'Content-Type': contentType}
    );
    response.end(
      contentType === 'application/json'? JSON.stringify(data): data
    );
  }catch(err){
    console.log(err);
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errorLog.txt');
    response.statusCode = 500;
    response.end();
  }
}

const server = http.createServer((req, resp) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  const extension = path.extname(req.url);
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
      break;
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
        ? path.join(__dirname, "views", req.url, "index.html")
        : contentType === "text/html"
          ? path.join(__dirname, "views", req.url)
          : path.join(__dirname, req.url);

  // makes .html extension not require in the browser
  if(!extension && req.url.slice(-1) !== '/'){
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);
  if(fileExists) {
    // serve the file
    serveFile(filePath, contentType, resp);

  }else{
    // 404 error
    // 301 redirect 
    switch(path.parse(filePath).base){
      case 'old-page.html':
        resp.writeHead(301, {"Location": '/new-page.html'});
        resp.end();
        break;
      case 'www-page.html':
        resp.writeHead(301, {"Location": '/'});
        resp.end();
        break;
      
      default:
        //serve a 404 response
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', resp);
    }
  }

  //   let path;
  //   if (req.url === "/" || req.url === "index.html") {
  //     resp.statusCode = 200;
  //     resp.setHeader("Content-Type", "text/html");
  //     path = path.join(__dirname, "views", "index.html");
  //     fs.readFile(path, "utf-8", (err, data) => {
  //       resp.end(data);
  //     });
  //   }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));