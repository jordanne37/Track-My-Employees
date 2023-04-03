INSERT INTO department (department_name)
VALUES ("Sales"),
("Accounting"),
("HR"),
("Risk"),
("IT");

INSERT INTO role (title, salary, department_id)
VALUES("Sales Level 1", 65000, 1),
("Sales Level 2", 85000, 1),
("Sales Level 3", 100000, 1),
("HR Assistant", 55000, 2),
("HR Manager", 98000, 2),
("Accountant Level 1", 68000, 3),
("Accountant Level 2", 88000, 3),
("Accountant Level 3", 128000, 3),
("Risk Management Assistant", 78000, 4),
("Risk Manager", 110000, 4),
("IT Level 1", 72000, 5),
("IT Level 2", 98000, 5),
("IT Level 3", 188000, 5),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kathy", "Hurst", 10, 1),
("Amanda", "Scalfa", 11, 1),
("Sarra", "Drum", 12, 1),
("Jeff", "Kim", 5, 2),
("Mikey", "Jones", 7, 2),
("Savannah", "Quincey", 9, 2),
("Sully", "Dixon", 13, 5),
("Margo", "Robbie", 14, 5);
("Rick", "Grimes", 16, 5);
("Spencer", "Killson", 5, 7);
("Kelly", "Melk", 5, 7);
("Dom", "Tuccilo", 9, 2);
("Jazzy", "McFar", 15, NULL);