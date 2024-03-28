import express  from "express";

import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";

import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

import cors from 'cors'
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// oPTION 1: Allow all origins with edfault of cors(*)

app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['get', 'post', 'delete', 'update', 'put'],
    allowedHeaders: ['Content-Type']
}));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN first application')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("app connected with database");
        app.listen(PORT, () => {
            console.log(`App is listing to port: ${PORT}`);
        });
    })
    .catch( (error) =>{
        console.log(error);
    });