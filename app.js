import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

const PORT = 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/blogs', blogRouter);

// MONGOOSE SETUP
mongoose
    .connect('mongodb://127.0.0.1:27017/BlogApp', {
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening at http://localhost:3000');
        });
    })
    .catch((err) => console.log(`${err} did not connect`));
