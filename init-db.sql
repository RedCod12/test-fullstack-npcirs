CREATE DATABASE staff_dashboard;
\connect staff_dashboard
BEGIN;
CREATE TABLE IF NOT EXISTS departments (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  budget NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (budget >= 0),
  opened_on DATE NOT NULL,
  planned_positions INTEGER NOT NULL DEFAULT 0 CHECK (planned_positions >= 0)
);
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
  full_name VARCHAR(160) NOT NULL,
  position VARCHAR(120) NOT NULL,
  salary NUMERIC(12,2) NOT NULL CHECK (salary >= 0),
  hired_at DATE NOT NULL,
  grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 10)
);
CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id);
INSERT INTO departments (name,budget,opened_on,planned_positions)
SELECT 'Отдел ' || lpad(n::text, 3, '0') || ' · ' || (ARRAY['Разработка','Продукт','Аналитика','Поддержка','Дизайн','Финансы','Операции','Маркетинг'])[(n % 8)+1],
       1000000 + n * 37500, DATE '2018-01-01' + (n * 17), 8 + (n % 24)
FROM generate_series(1, 120) AS n
ON CONFLICT (name) DO NOTHING;
INSERT INTO employees (department_id,full_name,position,salary,hired_at,grade)
SELECT d.id,
       (ARRAY['Александр','Мария','Дмитрий','Анна','Сергей','Елена','Максим','Ольга'])[(d.id + n) % 8 + 1] || ' ' ||
       (ARRAY['Иванов','Петров','Смирнов','Соколов','Морозов','Попова','Кузнецова','Орлова'])[(d.id * 2 + n) % 8 + 1],
       (ARRAY['Разработчик','Аналитик','Менеджер','Специалист','Инженер'])[(n % 5)+1],
       55000 + ((d.id * 7 + n * 11) % 140) * 1000,
       DATE '2020-01-01' + ((d.id * 31 + n * 43) % 1800),
       1 + ((d.id + n) % 10)
FROM departments d CROSS JOIN generate_series(1, 6) n
WHERE NOT EXISTS (SELECT 1 FROM employees LIMIT 1);
COMMIT;
