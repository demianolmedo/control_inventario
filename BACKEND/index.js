
const express = require('express');


const bodyParser = require('body-parser');

const cors = require('cors');

const http = require('http');

//const WebSocket = require('ws');
const socketIo = require('socket.io');
const WebSocket = require('ws');

//Creamos el servidor
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/sgm', require('./routes/sgm'));


const port = process.env.PORT || 3000;

const server = http.createServer(app);



const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
  
    socket.on('location', (location) => {
      console.log('Nueva ubicación recibida: ', location);
      // Emitir la nueva ubicación a todos los demás usuarios conectados
      socket.broadcast.emit('new-location', location);
    });
  
    socket.on('disconnect', () => {
      console.log('Un usuario se ha desconectado');
    });
  });

server.listen(port,()=>{console.log(`api-marcaciones up on : ${port}`)
});
