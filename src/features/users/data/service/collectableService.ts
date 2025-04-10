import axios from 'axios';
import { Collectable } from '../models/collectable';

const API_URL = 'http://localhost:8080/collectables';

const getAll = async (): Promise<Collectable[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

const create = async (c: Omit<Collectable, 'id'>): Promise<void> => {
  await axios.post(API_URL, c);
};

const remove = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getAll, create, remove };
