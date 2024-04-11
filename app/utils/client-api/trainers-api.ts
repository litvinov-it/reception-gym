import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";

// Отдельно выделил API для каждой группы роутов для удобства
class TRAINERS_API_CLASS {
  private path: string;

  constructor(path: string) {
    // path = "http://localhost:3000/api/trainers";
    this.path = path;
  }

  // GET запрос подразумевает что если передали айди - получаем одного пользователя, если не передали - всех
  async GET(
    id?: string,
    callback?: (client: ITrainer | ITrainer[]) => void
  ): Promise<ITrainer | ITrainer[]> {
    // Если передали айди - получаем одного пользователя
    if (id) return await this.GET_TRAINER(id, callback);
    // Если не передали айди - получаем всех
    return await this.GET_TRAINERS(callback);
  }

  // Получени одного пользователя
  private async GET_TRAINER(id: string, callback?: (client: ITrainer) => void) {
    return await fetch(this.path + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as ITrainer);
        return data;
      });
  }

  // Получение всех пользователей
  private async GET_TRAINERS(callback?: (clients: ITrainer[]) => void) {
    return await fetch(this.path)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as ITrainer[]);
        return data;
      });
  }

  // Удаление
  async DELETE(id: number, callback?: (trainer: ITrainer) => void) {
    return await fetch(this.path + "/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as ITrainer);
        return data;
      });
  }

  // Создание
  async POST(data: any, callback?: (client: ITrainer) => void) {
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
        if (callback) callback(data as ITrainer);
        return data;
      });
  }

  // Обновление
  async UPDATE(data: any, id: number, callback?: (client: ITrainer) => void) {
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
        if (callback) callback(data as ITrainer);
        return data;
      });
  }
}

// Инициализация
export const TRAINERS_API = new TRAINERS_API_CLASS(
  "http://localhost:3000/api/trainers"
);
