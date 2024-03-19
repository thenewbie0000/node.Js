const {format} = require('date-fns')
const {v4:uuid} = require('uuid')

console.log(format(new Date(), 'yyyy/MM/dd\tHH:mm:ss'))
console.log(uuid())

/* in package.json, in dependencies, ^5.3.2
you see ^ which means to go and download newer minor version which is after first . but not the major version
if we remove that then it means to strictly use the mentioned version
~ this means to download the patch version which is after second . but not minor or major versions


if we see * but not ^5.3.2 then it means to download the latest version major minor patch all the latest 


npm update: checks for update in dependencies
npm uninstall or rm : to remove or uninstall dependencies but if it is the dev dependencies then we have to do FOr example:
npm uninstall nodemon -D
-D for dev dependencies
*/