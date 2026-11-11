type ErrorDefinition = {
    status: number,
    message: string
}

export const ERRORS = {
    DEPARTMENT_NOT_FOUND: {
        status: 404,
        message: 'Отдел не найден',
    },
    EMPLOYEE_NOT_FOUND: {
        status: 404,
        message: 'Сотрудник не найден',
    },
    DEPARTMENT_REFERENCE_NOT_FOUND: {
        status: 400,
        message: 'Указанный отдел не существует',
    },
    ROUTE_NOT_FOUND: {
        status: 404,
        message: 'Маршрут не найден',
    },
    INVALID_ID: {
        status: 400,
        message: 'Некорректный идентификатор',
    },
    INVALID_JSON: {
        status: 400,
        message: 'Некорректный JSON',
    },
    VALIDATION_ERROR: {
        status: 400,
        message: 'Ошибка валидации',
    },
    FOREIGN_KEY_CONFLICT: {
        status: 409,
        message: 'Операция нарушает связи между записями',
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'Внутренняя ошибка сервера',
    },
    INVALID_PAGINATION: {
        status: 400,
        message: 'limit должен быть от 1 до 100, offset — неотрицательным целым',
    },
    INVALID_SORT_FIELD: {
        status: 400,
        message: 'Некорректное поле сортировки',
    },
    INVALID_SORT_ORDER: {
        status: 400,
        message: 'sort_order должен быть asc или desc',
    },
    UNIQUE_CONSTRAINT_VIOLATION: {
        status: 409,
        message: 'Запись с таким значением уже существует',
    },
    CHECK_CONSTRAINT_VIOLATION: {
        status: 400,
        message: 'Данные не прошли проверку базы данных',
    },
    NOT_NULL_VIOLATION: {
        status: 400,
        message: 'Не заполнено обязательное поле',
    },
    INVALID_DATABASE_VALUE: {
        status: 400,
        message: 'Значение вне допустимого диапазона',
    },
    PAYLOAD_TOO_LARGE: {
        status: 413,
        message: 'Слишком большое тело запроса',
    },
} as const satisfies Record<string, ErrorDefinition>;

export type ErrorCode = keyof typeof ERRORS;