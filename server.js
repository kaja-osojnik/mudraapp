const express = require('express');
const connectDB = require('./config/db')

const app = express();

//connect to database
connectDB();


// init middleWare to be able to send body requests
app.use(express.json({extended:false}))

// get request in Postman
app.get('/', (req, res) => res.send('API running for mudra'))


// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/timers', require('./routes/api/timers'));


// port either PORT on production or 7000 locally
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})