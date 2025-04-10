import { useEffect, useState } from 'react';
import { getAllCollectables, createCollectable, deleteCollectable } from '../../domain/collectableUsesCases';
import { Collectable } from '../../data/models/collectable';

export const CollectablePage = () => {
  const [collectables, setCollectables] = useState<Collectable[]>([]);
  const [newItem, setNewItem] = useState({ name: '', type: '', genre: '' });

  const load = async () => setCollectables(await getAllCollectables());

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    await createCollectable(newItem);
    setNewItem({ name: '', type: '', genre: '' });
    load();
  };

  return (
    <div>
      <h2>Collectables</h2>
      <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
      <input placeholder="Type" value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {collectables.map(c => (
          <li key={c.id}>{c.name} - {c.genre} <button onClick={() => { deleteCollectable(c.id); load(); }}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};
