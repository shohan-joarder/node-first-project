// handle request response

// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require("../handlers/routeHandlers/notFoundHandler");

// module scaffolding
const handler = {}

handler.handleReqRes = (req, res)=>{
    // response handle
    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query
    const headersObject = req.headers
    
    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    }

    const decoder = new StringDecoder('utf-8');
    let readData = '';

    const chosenHandler = routes[trimmedPath]?routes[trimmedPath]:notFoundHandler; 

    req.on('data',(buffer)=>{
        readData += decoder.write(buffer);
    });

    req.on('end',()=>{
        readData += decoder.end();

        chosenHandler(requestProperties, (statuscode, payload) => {
            statuscode = typeof(statuscode) === 'number'?statuscode:500;
            payload = typeof(payload) === 'object'?payload:{};
            
            const payloadsString = JSON.stringify(payload);
    
            // return final response
            res.writeHead(statuscode);
            res.end(payloadsString);
    
        });

        console.log(readData);
        res.end("hello world" );
    })

}

module.exports = handler;