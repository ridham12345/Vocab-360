import express from "express";

import mongoose from 'mongoose';

import routes from './routes/index.js';

import models from './models/index.js';

import cookieParser from 'cookie-parser';

import cors from 'cors';

const app = express();

//connecting to mongo database
mongoose.connect('mongodb://localhost:27017/final_project');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

routes(app);

export default app;