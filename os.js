const os= require('os');
console.log(os.arch());
console.log("free memory"+os.freemem());
const freememory=os.freemem();
console.log(`${freememory / 1024 /1024 /1024}`);

const totalmemory=os.totalmem();
console.log(`${totalmemory / 1024 /1024 /1024}`);


console.log(os.hostname());

console.log(os.platform());

console.log(os.version());
