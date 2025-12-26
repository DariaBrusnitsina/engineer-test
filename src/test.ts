import { createHRApp } from "./index";
import { IDb, IDb_Query_Response } from "./db";
import { ENTITY_TYPES, EmployeeData } from "./types";

function createMockDb(): IDb {
  const employees: EmployeeData[] = [
    {
      type: ENTITY_TYPES.EMPLOYEE,
      uuid: "65f5c1d4-fb87-4da2-b0bd-a22343605396",
      firstName: "Name 1",
      lastName: "Name 2",
      divisionUuid: "3e80754a-3681-4e5c-8d6d-b84d09a7a3c4",
      cityUuid: "3ba648aa-4498-43da-b29f-b83f37a25429",
      positionUuid: "cc811dfb-7f73-4c18-969f-c8408fd92263",
      cityName: "Алматы",
      positionName: "Разработчик",
      divisionName: "Дирекция"
    },
    {
      type: ENTITY_TYPES.EMPLOYEE,
      uuid: "59e23b74-8645-46d6-9751-5fe594dd89e6",
      firstName: "Name 1",
      lastName: "Name 2",
      divisionUuid: "3e80754a-3681-4e5c-8d6d-b84d09a7a3c4",
      cityUuid: "3ba648aa-4498-43da-b29f-b83f37a25429",
      positionUuid: "cc811dfb-7f73-4c18-969f-c8408fd92263",
      cityName: "Алматы",
      positionName: "Разработчик",
      divisionName: "Дирекция"
    }
  ];

  return {
    read: async () => ({ record: { id: '', data: {} } }),
    post: async () => ({ id: '' }),
    put: async () => ({ id: '' }),
    query: async (args) => {
      if (args.type === ENTITY_TYPES.EMPLOYEE) {
        return {
          items: employees.map(emp => ({
            id: emp.uuid,
            data: emp
          }))
        } as IDb_Query_Response;
      }
      return { items: [] };
    }
  };
}

async function testHRApp() {
  console.log("Тестирование HRApp методов\n");

  const db = createMockDb();
  const app = createHRApp(db);

  try {
    console.log("1. Проверка employeeWithCityList:");
    const cities = await app.employeeWithCityList();
    console.log(JSON.stringify(cities, null, 2));
    console.log(`Найдено записей: ${cities.length}\n`);

    console.log("2. Проверка employeeWithPositionList:");
    const positions = await app.employeeWithPositionList();
    console.log(JSON.stringify(positions, null, 2));
    console.log(`Найдено записей: ${positions.length}\n`);

    console.log("Готово!");
  } catch (err) {
    console.error("Ошибка:", err);
    process.exit(1);
  }
}

testHRApp();

