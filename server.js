const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send('Nova')
})

function keepAlive(){
    server.listen(3000, ()=>{console.log("Nova Hosting Online")});
}

module.exports = keepAlive;