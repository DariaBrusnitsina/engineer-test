import { IDb } from "./db";
import { ENTITY_TYPES, EmployeeData } from "./types";

/**
 * Репозиторий для работы с данными сотрудников
 * Оптимизирован для чтения через денормализацию данных
 */
export class HRRepository {
  constructor(private db: IDb) {}

  /**
   * Получить всех сотрудников с их городами
   * Использует денормализованные данные для одной операции чтения
   */
  async getAllEmployees(): Promise<EmployeeData[]> {
    const response = await this.db.query({
      type: ENTITY_TYPES.EMPLOYEE,
      where: {}
    });

    return response.items.map((item) => item.data as EmployeeData);
  }

  /**
   * Получить всех сотрудников с их позициями и департаментами
   * Использует денормализованные данные для одной операции чтения
   */
  async getAllEmployeesWithRelations(): Promise<EmployeeData[]> {
    // В денормализованной структуре все данные уже есть в Employee
    return this.getAllEmployees();
  }
}

