// dep

const http = require("http");
const {handleReqRes} = require("./helpers/handleReqRes")

const app = {}

app.config = {
    port:3000
}


// create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`Listening to ${app.config.port}`)
    });
}


app.handleReqRes = handleReqRes;

app.createServer();