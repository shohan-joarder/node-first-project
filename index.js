// dep

const http = require("http");
const {handleReqRes} = require("./helpers/handleReqRes")
const environment = require("./helpers/environment");
const data = require("./lib/data");

const app = {}

// test library
data.delete('test','new-file',(err)=>{
    console.log("error was "+ err)
})

// create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        console.log(`Listening to ${environment.port}`);
    });
}


app.handleReqRes = handleReqRes;

app.createServer();