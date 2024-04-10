class IMAGE_API_CLASS {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async UPLOAD(file: FormData) {
    return await fetch(this.path + "/" + "upload", {
      method: "POST",
      body: file,
    }).then((response) => response.json())
    .then((data) => {
      if (data.error) {
        window.alert("Не удалось загрузить фото");
      }
      return data;
    });
  }
}

export const IMAGE_API = new IMAGE_API_CLASS(
  "http://localhost:3000/api/images"
);