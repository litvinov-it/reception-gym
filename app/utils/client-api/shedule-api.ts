import { IShedule } from "@/app/schemas/shedule/InventoryTypes";

// Отдельно выделил API для каждой группы роутов для удобства
class SHEDULE_API_CLASS {
  private path: string;

  constructor(path: string) {
    // path = "http://localhost:3000/api/trainers";
    this.path = path;
  }

  // GET запрос подразумевает что если передали айди - получаем одного пользователя, если не передали - всех
  async GET(
    id?: string,
    callback?: (client: IShedule | IShedule[]) => void
  ): Promise<IShedule | IShedule[]> {
    if (id) return await this.GET_SHEDULE(id, callback);
    return await this.GET_SHEDULES(callback);
  }

  // Получени одного пользователя
  private async GET_SHEDULE(id: string, callback?: (client: IShedule) => void) {
    return await fetch(this.path + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IShedule);
        return data;
      });
  }

  // Получение всех пользователей
  private async GET_SHEDULES(callback?: (clients: IShedule[]) => void) {
    return await fetch(this.path)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IShedule[]);
        return data;
      });
  }

  // Удаление
  async DELETE(id: number, callback?: (trainer: IShedule) => void) {
    return await fetch(this.path + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IShedule);
        return data;
      });
  }

  // Создание
  async POST(data: any, callback?: (client: IShedule) => void) {
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
          console.log(data.error);
          window.alert("Неизвестная ошибка на сервере");
          return;
        }
        if (callback) callback(data as IShedule);
        return data;
      });
  }

  // Изменение
  async UPDATE(data: any, id: string, callback?: (client: IShedule) => void) {
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
        if (callback) callback(data as IShedule);
        return data;
      });
  }
}

// инициализация
export const SHEDULE_API = new SHEDULE_API_CLASS(
  "http://localhost:3000/api/shedule"
);
