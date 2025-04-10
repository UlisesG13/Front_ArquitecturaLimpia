import { useEffect, useState } from 'react';
import { getAllVideogames, createVideogame, updateVideogame, deleteVideogame } from '../../domain/videogameUsesCases';
import { Videogame } from '../../data/models/videogame';
import '../styles/videogameStyles.css';

export const VideogamePage = () => {
  const [videogames, setVideogames] = useState<Videogame[]>([]);
  const [newGame, setNewGame] = useState({ name: '', genre: '' });
  const [editingGame, setEditingGame] = useState<Videogame | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setVideogames(await getAllVideogames());
      setError(null);
    } catch (err) {
      setError('Error al cargar los videojuegos');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    try {
      await createVideogame(newGame);
      setNewGame({ name: '', genre: '' });
      load();
      setError(null);
    } catch (err) {
      setError('Error al crear el videojuego');
    }
  };

  const handleEdit = (game: Videogame) => {
    setEditingGame(game);
    setError(null);
  };

  const handleUpdate = async () => {
    if (editingGame) {
      try {
        await updateVideogame(editingGame.id, { name: editingGame.name, genre: editingGame.genre });
        setEditingGame(null);
        load();
        setError(null);
      } catch (err) {
        setError('Error al actualizar el videojuego');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVideogame(id);
      load();
      setError(null);
    } catch (err) {
      setError('Error al eliminar el videojuego');
    }
  };

  return (
    <div className="videogame-container">
      <h1 className="videogame-header">Videojuegos</h1>
      
      <div className="videogame-form">
        <h3>{editingGame ? 'Editar Videojuego' : 'Agregar Videojuego'}</h3>
        <div className="form-group">
          <input 
            placeholder="Nombre" 
            value={editingGame ? editingGame.name : newGame.name} 
            onChange={e => editingGame 
              ? setEditingGame({...editingGame, name: e.target.value})
              : setNewGame({ ...newGame, name: e.target.value }) 
            } 
          />
        </div>
        <div className="form-group">
          <input 
            placeholder="Género" 
            value={editingGame ? editingGame.genre : newGame.genre} 
            onChange={e => editingGame
              ? setEditingGame({...editingGame, genre: e.target.value})
              : setNewGame({ ...newGame, genre: e.target.value }) 
            } 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          {editingGame ? (
            <>
              <button className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
              <button className="btn btn-secondary" onClick={() => setEditingGame(null)}>Cancelar</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleAdd}>Agregar</button>
          )}
        </div>
      </div>

      <ul className="videogame-list">
        {videogames.map(v => (
          <li key={v.id} className="videogame-item">
            <div className="videogame-info">
              <strong>{v.name}</strong> - {v.genre}
            </div>
            <div className="videogame-actions">
              <button className="btn btn-primary" onClick={() => handleEdit(v)}>Editar</button>
              <button className="btn btn-secondary" onClick={() => handleDelete(v.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
