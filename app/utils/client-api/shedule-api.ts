import { IShedule } from "@/app/schemas/shedule/InventoryTypes";

class SHEDULE_API_CLASS {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async GET(
    id?: string,
    callback?: (client: IShedule | IShedule[]) => void
  ): Promise<IShedule | IShedule[]> {
    if (id) return await this.GET_TRAINER(id, callback);
    return await this.GET_TRAINERS(callback);
  }

  private async GET_TRAINER(id: string, callback?: (client: IShedule) => void) {
    return await fetch(this.path + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IShedule);
        return data;
      });
  }

  private async GET_TRAINERS(callback?: (clients: IShedule[]) => void) {
    return await fetch(this.path)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as IShedule[]);
        return data;
      });
  }

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

export const SHEDULE_API = new SHEDULE_API_CLASS(
  "http://localhost:3000/api/shedule"
);
