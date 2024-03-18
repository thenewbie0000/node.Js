//const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

console.log("first");

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err} `);
  process.exit(1);
});

writeData = "Nice to meet you!";

// fs.writeFile(path.join(__dirname, "files", "reply.txt"), writeData, (err) => {
//   if (err) throw err;
//   console.log("Writing Operation Successful");
//   fs.appendFile(
//     path.join(__dirname, "files", "reply.txt"),
//     "\n\n\nTesting Append File",
//     (err) => {
//       if (err) throw err;
//       console.log("Append Operation Successful");

//       fs.rename(
//         path.join(__dirname, "files", "reply.txt"),
//         path.join(__dirname, "files", "newReply.txt"),
//         (err) => {
//           if (err) throw err;
//           console.log("Rename Operation Successful");
//         }
//       );
//     }
//   );
// });

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), "Testing Append File",(err)=>{
//   if(err) throw err;
//   console.log('Append Operation Successful');
// });


