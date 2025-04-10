import { useEffect, useState } from 'react';
import { getAllVideogames, createVideogame, updateVideogame, deleteVideogame } from '../../domain/videogameUsesCases';
import { Videogame } from '../../data/models/videogame';

export const VideogamePage = () => {
  const [videogames, setVideogames] = useState<Videogame[]>([]);
  const [newGame, setNewGame] = useState({ name: '', genre: '' });
  const [editingGame, setEditingGame] = useState<Videogame | null>(null);

  const load = async () => setVideogames(await getAllVideogames());

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    await createVideogame(newGame);
    setNewGame({ name: '', genre: '' });
    load();
  };

  const handleEdit = (game: Videogame) => {
    setEditingGame(game);
  };

  const handleUpdate = async () => {
    if (editingGame) {
      await updateVideogame(editingGame.id, { name: editingGame.name, genre: editingGame.genre });
      setEditingGame(null);
      load();
    }
  };

  return (
    <div>
      <h2>Videogames</h2>
      <div>
        <h3>{editingGame ? 'Editar Videojuego' : 'Agregar Videojuego'}</h3>
        <input 
          placeholder="Name" 
          value={editingGame ? editingGame.name : newGame.name} 
          onChange={e => editingGame 
            ? setEditingGame({...editingGame, name: e.target.value})
            : setNewGame({ ...newGame, name: e.target.value }) 
          } 
        />
        <input 
          placeholder="Genre" 
          value={editingGame ? editingGame.genre : newGame.genre} 
          onChange={e => editingGame
            ? setEditingGame({...editingGame, genre: e.target.value})
            : setNewGame({ ...newGame, genre: e.target.value }) 
          } 
        />
        {editingGame ? (
          <>
            <button onClick={handleUpdate}>Actualizar</button>
            <button onClick={() => setEditingGame(null)}>Cancelar</button>
          </>
        ) : (
          <button onClick={handleAdd}>Agregar</button>
        )}
      </div>
      <ul>
        {videogames.map(v => (
          <li key={v.id}>
            {v.name} - {v.genre} 
            <button onClick={() => handleEdit(v)}>Editar</button>
            <button onClick={() => { deleteVideogame(v.id); load(); }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
