const http=require('http');
const fs=require('fs');
const path=require('path');


const hostname="localhost";
const port=3000
const server= http.createServer((req,res)=>{
    console.log(req.headers);
    console.log('request for '+req.url+'by method'+req.method);
    if(req.method=='GET'){
        var fileurl;
        if(req.url == '/'){
            fileurl="/index.html";
        }
        else{
            fileurl=req.url;
        }
        var filepath=path.resolve('./public'+fileurl)
        var fileExt= path.extname(filepath);
        if(fileExt=='.html'){
            fs.exists(filepath,(exists)=>{
                if(!exists){
                        res.statusCode=404;
                        res.setHeader('Content-Type','text/html');
                        res.end('<html> <body><h1> error 404:'+fileurl+"does not exit"+ '</h1></body></html>')

                }
                else{
                    fs.createReadStream(filepath).pipe(res);
                }
            })
        }
        else{
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end('<html> <body><h1> error 404:'+fileurl+"not a html file"+ '</h1></body></html>')
        }
    }
    else{
        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end('<html> <body><h1> error 404:'+fileurl+"not supported"+ '</h1></body></html>')
        
    }

    // res.statusCode=200;
    // res.setHeader('Content-Type','text/html');
    // res.end('<html> <body><h1> server connection successfyuly</h1></body></html>')
})

server.listen(port,hostname,()=>{
    console.log(`server listen at http://${hostname}:${port}`)

});