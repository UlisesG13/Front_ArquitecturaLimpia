import service from '../data/service/videogameService';
import { Collectable } from '../data/models/collectable';

export const getAllCollectables = () => service.getAll();
export const createCollectable = (c: Omit<Collectable, 'id'>) => service.create(c);
export const deleteCollectable = (id: number) => service.remove(id)