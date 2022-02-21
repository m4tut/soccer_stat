import { Routes, Route } from 'react-router-dom';
import { routes } from '~shared/routes';

// Components
import { getLayout } from '~widgets/MainLayout';

export const Routing = () => {
  return getLayout(
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.elements />} />
      ))}
    </Routes>
  );
};
