import { createDb } from "./db";
import { HRRepository } from "./repository";
import { EmployeeData } from "./types";

export interface IHRApp {
  employeeWithCityList: () => Promise<{ firstName: string; city: string }[]>;
  employeeWithPositionList: () => Promise<{
    firstName: string;
    position: string;
    division: string;
  }[]>;
  update: (args: {
    entity: "employee" | "city" | "position" | "division";
    data: object;
  }) => Promise<void>;
}

export const createHRApp = (db?: import("./db").IDb): IHRApp => {
  const database = db || createDb();
  const repository = new HRRepository(database);

  return {
    employeeWithCityList: async () => {
      // Используем денормализованные данные: одна операция чтения
      // EmployeeData уже содержит cityName
      const employees = await repository.getAllEmployees();
      
      return employees.map((employee: EmployeeData) => ({
        firstName: employee.firstName,
        city: employee.cityName
      }));
    },
    employeeWithPositionList: async () => {
      // Используем денормализованные данные: одна операция чтения
      // EmployeeData уже содержит positionName и divisionName
      const employees = await repository.getAllEmployees();
      
      return employees.map((employee: EmployeeData) => ({
        firstName: employee.firstName,
        position: employee.positionName,
        division: employee.divisionName
      }));
    },
    update: async () => {
      // этот метод имплементировать не нужно
    },
  };
};
