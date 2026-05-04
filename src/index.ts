import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { routes } from './routes/movie.routes';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

routes(app);

app.get('/home', (req, res) => {
    res.json({'message':'Welcome to the Movie Booking App Backend!'});
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await mongoose.connect(process.env.DB_URL || '');
        console.log('Successfully Connected to MongoDB');
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});

