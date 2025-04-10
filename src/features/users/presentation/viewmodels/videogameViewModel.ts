import { makeAutoObservable, runInAction } from "mobx";
import { Videogame } from "../../data/models/videogame";
import { createVideogame } from "../../domain/videogameUsesCases";

export class VideoGameViewModel {
  genre: string = "";
  name: string = "";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  onChangeGenre(genre: string) {
    this.genre = genre;
  }

  onChangeName(name: string) {
    this.name = name;
  }

  async doCreateVideogame() {
    this.error = null;

    if (this.genre !== "" && this.name !== "") {
      const videogame: Omit<Videogame, "id"> = {
        genre: this.genre,
        name: this.name,
      };

      try {
        await createVideogame(videogame);
      } catch (err: any) {
        runInAction(() => {
          this.error = err.message || "Error al crear el videojuego";
        });
      }
    } else {
      this.error = "Campos vacíos";
    }
  }
}
