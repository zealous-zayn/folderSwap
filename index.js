const program = require('commander');
const fs = require('fs')
const handler = require('serve-handler');
const http = require('http');

 program.parse(process.argv)

program
.command("filePath")
.description("file path")
.action((()=>{
    
    let a = fs.watch(program.args[0])
    let b = fs.watch(program.args[1])
    a.on('change',(err,data)=>{
        fs.readdir(program.args[1],(err,filename)=>{
            if(filename.length == 0){
                fs.readFile(program.args[0]+"/"+data,(err,d)=>{
                    fs.writeFile(program.args[1]+"/"+data,d,(err)=>{
                        console.log("file write in temp 2")
                    })
                })
                a.close()
            }
            filename.forEach(f=>{
                if(f!=data){
                    fs.readFile(program.args[0]+"/"+data,(err,d)=>{
                        fs.writeFile(program.args[1]+"/"+data,d,(err)=>{
                            console.log("file write in temp 2")
                        })
                    })
                    a.close()
                } else {
                    fs.unlink(program.args[1]+"/"+data)
                }
            })
        })
    })
    b.on('change',(err,data)=>{
        fs.readdir(program.args[0],(err,filename)=>{
            if(filename.length == 0){
                fs.readFile(program.args[1]+"/"+data,(err,d)=>{
                    fs.writeFile(program.args[0]+"/"+data,d,(err)=>{
                        console.log("file write in temp")
                    })
                })
                b.close()
            }
            filename.forEach(f=>{
                if(f!=data){
                    fs.readFile(program.args[1]+"/"+data,(err,d)=>{
                        fs.writeFile(program.args[0]+"/"+data,d,(err)=>{
                            console.log("file write in temp")
                        })
                    })
                    b.close()
                } else {
                    fs.unlink(program.args[0]+"/"+data)
                }
            })
        })
    })
    
})())


  const server = http.createServer((request, response) => {
    return handler(request, response);
  })
   
  server.listen(3000, () => {
    console.log('Running at http://localhost:3000');
  });