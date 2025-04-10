import { Outlet } from 'react-router-dom';
import { NavigationMenu } from './core/navigation/NavigationMenu';

function App() {
  return (
    <div>
      <NavigationMenu />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App; 