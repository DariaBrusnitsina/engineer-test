// Типы данных для хранения в БД
// Используем денормализацию для оптимизации чтения

export const ENTITY_TYPES = {
  CITY: "city",
  DIVISION: "division",
  POSITION: "position",
  EMPLOYEE: "employee"
} as const;

export type EntityType = typeof ENTITY_TYPES[keyof typeof ENTITY_TYPES];

// Исходные типы данных (как в примере)
export interface CitySource {
  uuid: string;
  name: string;
}

export interface DivisionSource {
  uuid: string;
  name: string;
  cityUuid: string;
}

export interface PositionSource {
  uuid: string;
  name: string;
}

export interface EmployeeSource {
  uuid: string;
  firstName: string;
  lastName: string;
  divisionUuid: string;
  cityUuid: string;
  positionUuid: string;
}

// Типы для хранения в БД (денормализованные для быстрого чтения)
export interface CityData {
  type: typeof ENTITY_TYPES.CITY;
  uuid: string;
  name: string;
}

export interface DivisionData {
  type: typeof ENTITY_TYPES.DIVISION;
  uuid: string;
  name: string;
  cityUuid: string;
}

export interface PositionData {
  type: typeof ENTITY_TYPES.POSITION;
  uuid: string;
  name: string;
}

// Employee денормализован для быстрого чтения: содержит имена связанных сущностей
export interface EmployeeData {
  type: typeof ENTITY_TYPES.EMPLOYEE;
  uuid: string;
  firstName: string;
  lastName: string;
  divisionUuid: string;
  cityUuid: string;
  positionUuid: string;
  // Денормализованные поля для быстрого чтения
  cityName: string;
  positionName: string;
  divisionName: string;
}

