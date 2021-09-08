
const http =require('http');
const fs= require('fs');
const requests=require('requests')
const port=3000;
const hostname='localhost'
const homeFile=fs.readFileSync('home.html','utf-8');
const replaceVal=(tempVal,origVal)=>{
    let temperature=tempVal.replace("{%tempval%}",origVal.main.temp);
    temperature=temperature.replace("{%tempmin%}",origVal.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",origVal.main.temp_max);
    temperature=temperature.replace("{%location%}",origVal.name);
    temperature=temperature.replace("{%country%}",origVal.sys.country);
    temperature=temperature.replace("{%tempstatus%}",origVal.weather[0].main);
    return temperature;
}

const server= http.createServer((req,res)=>{
    if(req.url =="/"){
        requests('http://api.openweathermap.org/data/2.5/weather?q=Dubai&appid=607d5d89b8b6baf100b3497bbb284f03')
        .on('data',(chunkdata)=>{
      //  res.write(chunkdata)
        //               For write in output.txt
        // const write=fs.createWriteStream('output.txt')
        // write.write(chunkdata);

        const objdata=JSON.parse(chunkdata);
        const arrdata=[objdata];
        console.log(arrdata)
       const realtimedata= arrdata.map(val=>replaceVal(homeFile,val)).join("");
       res.write(realtimedata);
      //console.log(realtimedata);

      //  console.log(arrdata);
      //  console.log(arrdata[0].main.temp);
    })
    .on('end',()=>{
        res.end();  
        console.log("file is ended")
    })
    .on('error',(err)=>{
        console.log(err);
        res.end("file not found");
    })
    }  
})



server.listen(port,hostname,()=>{
    console.log(`server listen at http://${hostname}:${port}`)
})
