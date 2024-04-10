import { ITrainer } from "@/app/schemas/trainers/TrainerTypes";

class TRAINERS_API_CLASS {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async GET(
    id?: string,
    callback?: (client: ITrainer | ITrainer[]) => void
  ): Promise<ITrainer | ITrainer[]> {
    if (id) return await this.GET_TRAINER(id, callback);
    return await this.GET_TRAINERS(callback);
  }

  private async GET_TRAINER(id: string, callback?: (client: ITrainer) => void) {
    return await fetch(this.path + "/" + id)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as ITrainer);
        return data;
      });
  }

  private async GET_TRAINERS(callback?: (clients: ITrainer[]) => void) {
    return await fetch(this.path)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return window.alert("Неизвестная ошибка на сервере");
        if (callback) callback(data as ITrainer[]);
        return data;
      });
  }

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

export const TRAINERS_API = new TRAINERS_API_CLASS(
  "http://localhost:3000/api/trainers"
);
