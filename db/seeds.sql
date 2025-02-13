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