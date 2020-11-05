const express = require('express');
const path = require('path');
const app = express();
const User = './model/model.js'


app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/react-movie-database/login', (req, res) => {
    res.setHeader('content-type', 'application/json');
    console.log('Server Working')
    res.json(req.body)
    console.log(req.body)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});




const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on port ${port}`);