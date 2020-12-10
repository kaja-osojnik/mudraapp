const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect to database
connectDB();


// init middleWare to be able to send body requests
app.use(express.json({extended:false}))


// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/timers', require('./routes/api/timers'));

// Serve static asets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// port either PORT on production or 7000 locally
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})