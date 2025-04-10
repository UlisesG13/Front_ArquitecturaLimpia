import service from '../data/service/videogameService';
import { Videogame } from '../data/models/videogame';

export const getAllVideogames = () => service.getAll();
export const createVideogame = (vg: Omit<Videogame, 'id'>) => service.create(vg);
export const updateVideogame = (id: number, vg: Omit<Videogame, 'id'>) => service.update(id, vg);
export const deleteVideogame = (id: number) => service.remove(id);
