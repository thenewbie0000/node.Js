const path = require("path");
const fsPromises = require('fs').promises;

const fileOps = async()=>{
  try{
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
    console.log(data);
    // delete file
    await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
    await fsPromises.unlink(path.join(__dirname, 'files', 'newReply.txt'));
    await fsPromises.unlink(path.join(__dirname, 'files', 'test.txt'));

    await fsPromises.writeFile(path.join(__dirname, 'files', 'PromiseWrite.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'PromiseWrite.txt'), '\n\nNice to meet you');
    await fsPromises.rename(path.join(__dirname, 'files', 'PromiseWrite.txt'),path.join(__dirname, 'files', 'RenamedPromiseWrite.txt'));
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'RenamedPromiseWrite.txt'), 'utf-8');
    console.log(newData);

  }catch(err){
    console.error(err);
  }
}

fileOps();