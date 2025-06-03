const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


app.use(cors());

const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin :"http://localhost:3000",
        methods :["GET" , "POST"]
    },
})

io.on("connection" , (socket) => {
    console.log("User Connnected :" , socket.id);
    
    socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} User Room ${data}`);
    })


    socket.on("send_message" , (data) => {
        socket.to(data.room).emit("recieve_message" , data)
    })
    socket.on("disconnect" , () => {
        console.log("User Disconencted :" , socket.id);
    })
})


server.listen(3001 , () => {
    console.log("Server is Running on port 3001");
})