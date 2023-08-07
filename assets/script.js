// const socket = io('/');
// const videoGrid = document.getElementById('video-grid');
// const myVideo = document.createElement('video');
// myVideo.muted = true;

// var peer = new Peer(undefined, {
//     path: '/peerjs', // Path to the HTTP server that will be used by PeerJS
//     host: "/", // Host of the app
//     port: 3000 // Port of your node js application
// });



// let myVideoStream;

// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
// }).then(stream => {
//     myVideoStream = stream;
//     addVideoStream(myVideo, stream);

//     // peer.on('call', call => {
//     //     call.answer(stream);
//     //     const video = document.createElement("video");
//     //     call.on('stream', userVideoStream => {
//     //         addVideoStream(video, userVideoStream);
//     //     })
//     // })
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//     peer.on('call', function(call) {
//         getUserMedia({ video: true, audio: true }, function(stream) {
//             call.answer(stream); // Answer the call with an A/V stream.
//             call.on('stream', function(remoteStream) {
//                 // Show stream in some video/canvas element.
//                 const myVideo = document.createElement('video');
//             });
//         }, function(err) {
//             console.log('Failed to get local stream', err);
//         });
//     });


//     socket.on('user-connected', (userId) => {
//         connectToNewUser(userId, stream);
//     })
// })
// peer.on('open', id => {
//     socket.emit('join-room', ROOM_ID, id);
// })



// const connectToNewUser = (userId) => {
//     console.log('new user', userId);
//     const call = peer.call(userId, myVideoStream);
//     const video = document.createElement("video");
//     call.answer(myVideoStream);
//     call.on('stream', userVideoStream => {
//         addVideoStream(video, userVideoStream);
//     })
// }

// const addVideoStream = (video, stream) => {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//         video.play();
//     })
//     videoGrid.append(video);
// }
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs', // Path to the HTTP server that will be used by PeerJS
    host: "/", // Host of the app
    port: 3000 // Port of your node js application
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', function(call) {
        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement('video');
        call.on('stream', function(remoteStream) {
            // Show stream in some video/canvas element.
            addVideoStream(video, remoteStream);
        });
    });

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    });
}).catch(err => {
    console.error('Error accessing media devices:', err);
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

const connectToNewUser = (userId, stream) => {
    console.log('new user', userId);
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
};

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
};