INSERT INTO departments (department_name)  
VALUES ('Engineering'),
        ('Sales'),
        ('Marketing'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 2),
        ('Salesperson', 80000, 2),
        ('Lead Engineer', 150000, 1),
        ('Software Engineer', 120000, 1),
        ('Accountant', 125000, 4),
        ('Legal Team Lead', 250000, 5),
        ('Lawyer', 190000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 3, NULL),
        ('Mike', 'Chan', 1, NULL),
        ('Ashley', 'Rodriguez', 2, 2),
        ('Kevin', 'Tupik', 3, 1),
        ('Malia', 'Brown', 2, 2),
        ('Sarah', 'Lourd', 5, 4),
        ('Tom', 'Allen', 6, 6),
        ('Tina', 'Lee', 7, 7);