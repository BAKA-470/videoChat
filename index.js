const express = require('express');
const { createServer } = require('http');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = createServer(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use('/peerjs', peerServer);

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

router.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

app.use(router);

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        io.to(roomId).emit('user-connected', userId);
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
        // Add any necessary cleanup or event handling when a user disconnects.
    });
});

const serverInstance = server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Graceful shutdown on process termination
process.on('SIGINT', () => {
    console.log('Shutting down the server...');
    serverInstance.close(() => {
        console.log('Server has been gracefully terminated.');
        process.exit(0);
    });
});



// const express = require('express');
// const { Socket } = require('socket.io');
// const app = express();
// const port = 3000;
// const { v4: uuidv4 } = require('uuid');
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const { ExpressPeerServer } = require('peer');
// const peerServer = ExpressPeerServer(server, {
//     debug: true
// })

// app.set('view engine', 'ejs');
// app.use(express.static('assets'));

// app.use('/peerjs', peerServer);

// app.get('/', (req, res) => {
//     res.redirect(`/${uuidv4()}`);

// });

// app.get('/:room', (req, res) => {
//     res.render('room', { roomId: req.params.room })
// })
// app.get('/socket.io/socket.io.js', (req, res) => {
//     res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
//     // console.log('Joined room');
// });


// io.on('connection', socket => {
//     socket.on('join-room', (roomId, userId) => {
//         socket.join(roomId);
//         socket.to(roomId).broadcast.emit('user-connected', userId);
//     })
// });




// app.listen(port, function(err) {
//     if (err) {
//         console.log("Error in running the server:", err);
//     }
//     console.log(`Server is running on port: ${port}`);
// });