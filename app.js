const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

const url = process.env.MONGODB_URL;
mongoose
.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('MongoDB connection failed!', err));


app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/Doctors');
const patientRoutes = require('./routes/Patients');
const mappingRoutes = require('./routes/Mappings');


app.use('/auth', authRoutes); 
app.use('/doctor', doctorRoutes); 
app.use('/patient', patientRoutes); 
app.use('/mapping', mappingRoutes); 




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});