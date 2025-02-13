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

// using inquirer to prompt the user for input

function addDepartment(): void {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department you would like to add:',
        }])
        .then((response) => {
            pool.querey('INSERT INTO department (name) VALUES ('${response.addDepartment})', (err: Error, result: QueryResult) => {
                if (err) throw err;
                console.log('Department added successfully!');
        