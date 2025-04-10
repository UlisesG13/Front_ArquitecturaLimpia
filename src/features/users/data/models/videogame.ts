export interface Videogame {
    id: number;
    name: string;
    genre: string;
  }
  
export class VideogameDTO implements Videogame {
    id: number;
    name: string;
    genre: string;

    constructor(id: number, name: string, genre: string) {
        this.id = id;
        this.name = name;
        this.genre = genre;
    }
}
