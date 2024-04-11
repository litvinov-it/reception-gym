import { IInventory } from "@/app/schemas/inventory/InventoryTypes";

// Отдельно выделил API для каждой группы роутов для удобства
class INVENTORY_API_CLASS {
  private path: string;

  constructor(path: string) {
    // path = "http://localhost:3000/api/inventory";
    this.path = path;
  }

  // Удаление
  async DELETE(id: number, callback?: (client: IInventory) => void) {
    const data = await fetch(this.path + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert("Неизвестная ошибка на сервере");
          return;
        }
        if (callback) callback(data as IInventory);
        return data;
      });

    return data;
  }

  // GET запрос подразумевает что если передали айди - получаем одного пользователя, если не передали - всех
  async GET(
    id?: string,
    callback?: (client: IInventory | IInventory[]) => void,
  ): Promise<IInventory | IInventory[]> {
    if (id) return await this.GET_CLIENT(id, callback);
    return await this.GET_CLIENTS(callback);
  }

  // Получение пользователя
  private async GET_CLIENT(id: string, callback?: (client: IInventory) => void) {
    return await fetch(this.path + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IInventory);
        return data;
      });
  }

  // Получение всех пользователей
  private async GET_CLIENTS(callback?: (clients: IInventory[]) => void) {
    return await fetch(this.path)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IInventory[]);
        return data;
      });
  }

  // Создание
  async POST(data: any, callback?: (client: IInventory) => void) {
    return await fetch(this.path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
          window.alert("Неизвестная ошибка на сервере");
          return;
        }
        if (callback) callback(data as IInventory);
        return data;
      });
  }

  // Обновление
  async UPDATE(data: any, id: number, callback?: (client: IInventory) => void) {
    return await fetch(this.path + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert("Неизвестная ошибка на сервере");
          return;
        }
        if (callback) callback(data as IInventory);
        return data;
      })
  }
}

// Инициализация
export const INVENTORY_API = new INVENTORY_API_CLASS(
  "http://localhost:3000/api/inventory"
);
