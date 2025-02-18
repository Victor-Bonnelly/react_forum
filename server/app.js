import dotenv from 'dotenv';

dotenv.config(); 

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('BDD connecté');
        console.log(`Server is running on port ${PORT}`);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error)); 