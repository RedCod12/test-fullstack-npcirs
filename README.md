# Teamspace

Тестовое Fullstack-приложение для управления отделами и сотрудниками.

**Стек:** React, TypeScript, AG Grid, Material UI, Node.js, Express, pg-promise, PostgreSQL.

## Возможности

- Две связанные таблицы `departments` и `employees` (foreign key).
- CRUD для отделов и сотрудников через REST API.
- AG Grid Infinite Row Model: загрузка отделов блоками по 30 записей с `LIMIT` и `OFFSET`, серверная сортировка.
- Просмотр сотрудников выбранного отдела, формы добавления и редактирования, удаление с подтверждением.
- Dashboard с боковым меню и статистикой.
- Zod-валидация, обработка ошибок, преобразование данных API (`snake_case`) в модели React (`camelCase`).
- `init-db.sql` создаёт базу и тестовые данные: 120 отделов и 720 сотрудников.

## Запуск через Docker

```bash
cp .env.example .env
docker compose up -d --build
```

Приложение: **http://localhost:8080**.

```bash
docker compose logs -f   # логи
docker compose down      # остановить контейнеры
```

База заполняется автоматически при первом создании тома PostgreSQL. Команда `docker compose down -v` удалит данные БД.

## Локальный запуск

Нужны Node.js 20+, PostgreSQL 14+ и npm.

```bash
psql -d postgres -f init-db.sql
```

Сервер:

```bash
cd server
cp .env.example .env
# Настроить DATABASE_URL в .env
npm install
npm run dev
```

Клиент (в отдельном терминале):

```bash
cd client
npm install
npm run dev
```

Клиент: http://localhost:5173. API: http://localhost:4000/api/health.

## API

- `GET /api/departments?limit=30&offset=0&sort_by=name&sort_order=asc` — отделы с пагинацией и сортировкой.
- `GET /api/employees?department_id=1` — сотрудники отдела.
- `GET /api/stats` — статистика.
- `GET /api/health` — проверка сервера.
- `GET /api/{departments|employees}/:id` — запись по ID.
- `POST /api/{departments|employees}` — создание.
- `PUT /api/{departments|employees}/:id` — изменение.
- `DELETE /api/{departments|employees}/:id` — удаление.

Поля API используют `snake_case`, а модели фронтенда — `camelCase`. Отдел с сотрудниками удалить нельзя (`ON DELETE RESTRICT`).

## Структура

```text
client/        React, AG Grid, Dashboard (app, pages, widgets, features, entities, shared)
server/src/    models, controllers, routes, db, middleware, utils
init-db.sql    схема и тестовые данные
README.md
```

Интерфейс использует визуальные решения бесплатного [Material Dashboard 2 React](https://www.creative-tim.com/product/material-dashboard-react) от Creative Tim; исходный шаблон целиком не копировался.
