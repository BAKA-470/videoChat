const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const server = require('http').Server(app);

app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);

});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})






app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server:", err);
    }
    console.log(`Server is running on port: ${port}`);
});