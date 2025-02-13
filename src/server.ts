import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();

const PORT = process.env.PORT || 3000;
const app = express();

//Express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
