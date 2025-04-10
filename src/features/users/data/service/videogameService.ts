import axios from "axios";
import { Videogame } from "../models/videogame";

const API_URL = 'http://localhost:8080/videogames';

const getAll = async (): Promise<Videogame[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

const create = async (vg: Omit<Videogame, 'id'>): Promise<void> => {
  await axios.post(API_URL, vg);
};

const update = async (id: number, vg: Omit<Videogame, 'id'>): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, vg);
};

const remove = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getAll, create, update, remove };

