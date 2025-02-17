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
                if (err) throw err;
                console.table(res.rows);
                mainMenu();

            });

        } else if (answers.choice === 'View all roles') {
            console.log('Viewing all roles...');
            pool.query('SELECT * FROM roles', (err, res) => {
                if (err) throw err;
                console.table(res.rows);
                mainMenu();
            });
        } else if (answers.choice === 'View all departments') {
            console.log('Viewing all departments...');
            pool.query('SELECT * FROM departments', (err, res) => {
                if (err) throw err;
                console.table(res.rows);
                mainMenu();
            });
        } else if (answers.choice === 'Add an employee') {
            console.log('Adding an employee...');
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the employee\'s role ID?'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Who is the employees manager?'
                }
            ]).then((answers) => {
                console.log(answers);
                pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err) => {
                    if (err) throw err;
                    console.log('Employee added.');
                    mainMenu();
                });
            });
        } else if (answers.choice === 'Add a role') {
            console.log('Adding a role...');
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'What is the department ID of the role?'
                }
            ]).then((answers) => {
                console.log(answers);
                pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], (err) => {
                    if (err) throw err;
                    console.log('Role added.');
                    mainMenu();
                });
            });
        } else if (answers.choice === 'Add a department') {
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
                    if (err) throw err;
                    console.log('Department added.');
                    mainMenu();

                });
            });
        } else if (answers.choice === 'Update an employee role') {
            console.log('Updating an employee role...');
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee_id',
                    message: 'What is the ID of the employee whose role you would like to update?'
                },
                {
                    type: 'input',
                    name: 'new_role_id',
                    message: 'What is the new role ID?'
                }
            ]).then((answers) => {
                console.log(answers);
                pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answers.new_role_id, answers.employee_id], (err) => {
                    if (err) throw err;
                    console.log('Employee role updated.');
                    mainMenu();
                });
            });
        } else {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'quit',
                    message: 'Are you sure you want to quit?'
                }
            ]).then((answers) => {
                if (answers.quit) {
                    console.log('Quitting...');
                    pool.end();
                } else {
                    mainMenu();
                }
            });
            console.log('Quitting...');
        }
    });
}

mainMenu();