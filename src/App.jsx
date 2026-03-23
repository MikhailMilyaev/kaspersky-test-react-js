import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';

const App = () => {
  return (
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
  );
}

export default App;