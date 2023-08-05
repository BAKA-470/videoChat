const express = require('express');
const app = express();
const port = 3000;

const server = require('http').Server(app);

app.get('/', (req, res) => {
    res.status(200).send('sup nigga!!!');

})






app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server:", err);
    }
    console.log(`Server is running on port: ${port}`);
});