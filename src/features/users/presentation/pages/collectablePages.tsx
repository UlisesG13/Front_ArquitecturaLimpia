import { useEffect, useState } from 'react';
import { getAllCollectables, createCollectable, deleteCollectable } from '../../domain/collectableUsesCases';
import { Collectable } from '../../data/models/collectable';
import '../styles/collectableStyles.css';

export const CollectablePage = () => {
  const [collectables, setCollectables] = useState<Collectable[]>([]);
  const [newItem, setNewItem] = useState({ name: '', type: '', genre: '' });
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setCollectables(await getAllCollectables());
      setError(null);
    } catch (err) {
      setError('Error al cargar los collectables');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    try {
      await createCollectable(newItem);
      setNewItem({ name: '', type: '', genre: '' });
      load();
      setError(null);
    } catch (err) {
      setError('Error al crear el collectable');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCollectable(id);
      load();
      setError(null);
    } catch (err) {
      setError('Error al eliminar el collectable');
    }
  };

  return (
    <div className="collectable-container">
      <h1 className="collectable-header">Collectables</h1>
      
      <div className="collectable-form">
        <h3>Agregar Collectable</h3>
        <div className="form-group">
          <input 
            placeholder="Nombre" 
            value={newItem.name} 
            onChange={e => setNewItem({ ...newItem, name: e.target.value })} 
          />
        </div>
      
        <div className="form-group">
          <input 
            placeholder="Género" 
            value={newItem.genre} 
            onChange={e => setNewItem({ ...newItem, genre: e.target.value })} 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleAdd}>Agregar</button>
        </div>
      </div>

      <ul className="collectable-list">
        {collectables.map(c => (
          <li key={c.id} className="collectable-item">
            <div className="collectable-info">
              <strong>{c.name}</strong> - {c.type} - {c.genre}
            </div>
            <div className="collectable-actions">
              <button className="btn btn-secondary" onClick={() => handleDelete(c.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
