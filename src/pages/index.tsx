import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Leagues = lazy(() => import('./leagues'));

export const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Leagues />} />
      {/* <Route path="*" element={} /> */}
    </Routes>
  );
};
