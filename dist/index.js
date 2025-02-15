import inquirer from "inquirer";
import { connectToDb, pool } from "./connection.js";
await connectToDb();
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: "What would you like to do?",
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'Add an employee',
                'Add a role',
                'Add a department',
                'Update an employee role',
                'Quit'
            ]
        }
    ]).then((answers) => {
        console.log(answers);
        if (answers.choice === 'View all employees') {
            console.log('Viewing all employees...');
            pool.query('SELECT * FROM employees', (err, res) => {
                if (err)
                    throw err;
                console.table(res.rows);
                mainMenu();
            });
        }
        else if (answers.choice === 'View all roles') {
            console.log('Viewing all roles...');
            pool.query('SELECT * FROM roles', (err, res) => {
                if (err)
                    throw err;
                console.table(res.rows);
                mainMenu();
            });
        }
        else if (answers.choice === 'View all departments') {
            console.log('Viewing all departments...');
            pool.query('SELECT * FROM departments', (err, res) => {
                if (err)
                    throw err;
                console.table(res.rows);
                mainMenu();
            });
        }
        else if (answers.choice === 'Add an employee') {
            console.log('Adding an employee...');
        }
        else if (answers.choice === 'Add a role') {
            console.log('Adding a role...');
        }
        else if (answers.choice === 'Add a department') {
            console.log('Adding a department...');
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the department?'
                }
            ]).then((answers) => {
                console.log(answers);
                pool.query('INSERT INTO departments (department_name) VALUES ($1)', [answers.department], (err) => {
                    if (err)
                        throw err;
                    console.log('Department added.');
                    mainMenu();
                });
            });
        }
        else if (answers.choice === 'Update an employee role') {
            console.log('Updating an employee role...');
        }
        else {
            console.log('Quitting...');
        }
    });
}
mainMenu();
