import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Leagues = lazy(() => import('./leagues'));
const Commands = lazy(() => import('./commands'));

export const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Leagues />} />
      <Route path='/commands' element={<Commands />} />
      {/* <Route path="*" element={} /> */}
    </Routes>
  );
};
