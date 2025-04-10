import { Link } from 'react-router-dom';

export const NavigationMenu = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
        <li>
          <Link to="/">Videojuegos</Link>
        </li>
        <li>
          <Link to="/collectables">Collectables</Link>
        </li>
      </ul>
    </nav>
  );
}; 