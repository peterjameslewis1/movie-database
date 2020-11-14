const express = require('express');
const app = express();
const User = require('./model/model')
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// Auth Routes
const authRoute = require('./routes/auth');



dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB!')
);


// Middleware
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', authRoute)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});