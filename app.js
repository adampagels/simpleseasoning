const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// DB Config
const db = require('./config/config').MongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use(express.json());
app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'))
app.use('/jobs', require('./routes/jobs'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
    