const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

// CORS = Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data ie form data
//app.use is used for middleware
app.use(express.urlencoded({ extended: false }));

// built in middleware for json data
app.use(express.json());


// middleware for cookies
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, "/public"))); // here no directory is given which means default '/' was the directory
// app.use('/subdir', express.static(path.join(__dirname, "/public")));  // thismeans to apply css of public dir to any files in subdir directory


//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));


//app.use('/subdir', require('./routes/subdir'));   // this will direct anything coming for files in /subdir directory to ./routes/subdir

//Route Handlers
// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     /// this is function chaining where after the response one goes to next() which is defined right then
//     console.log("attempted to load hello.html");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello World");
//   }
// );

// // Chaining route handler
// const one = (req, res, next) => {
//   console.log("one");
//   next();
// };
// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };
// const three = (req, res) => {
//   console.log("three");
//   res.send("Finished");
// };
// app.get("/chain(.html)?", [one, two, three]);

//app.use('/'): later version accepts regex and mostly used for middleware
//app.all(): accepts regex and used for routing and all http methods

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
}); // regex /* means anything for all

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));