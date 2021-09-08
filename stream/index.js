// read and write Stream

const fs=require('fs');
const http=require('http');
const path=require('path')
const filename=__filename;
console.log(__filename)
const port=3000;
const hostname='localhost'
const server =http.createServer((req,res)=>{
    console.log(req.headers);

    // short cut by stream
    //res.end(fs.createReadStream('input.txt').pipe(res));


    // const readablestram=fs.createReadStream(`${__filename}`);
    const readablestram=fs.createReadStream('input.txt');
    readablestram.on('data',(chunkdata)=>{
        res.write(chunkdata)
        //               For write in output.txt
        // const write=fs.createWriteStream('output.txt')
        // write.write(chunkdata);
    });

    readablestram.on('end',()=>{
        res.end();  
        console.log("file is ended")
    });

    readablestram.on('error',(err)=>{
        console.log(err);
        res.end("file not found");
    })


  //const read=  fs.createReadStream('input.txt').pipe(res);
});

server.listen(port,hostname,()=>{
    console.log(`server listen at http://${hostname}:${port}`)
})

                                                                                                             
