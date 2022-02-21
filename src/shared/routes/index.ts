import { lazy } from 'react';
import { IRoutes } from './types';

// Pages
const Leagues = lazy(() => import('~pages/leagues'));
const Commands = lazy(() => import('~pages/commands'));

export const routes: IRoutes[] = [
  {
    path: "/",
    elements: Leagues
  },
  {
    path: "/commands",
    elements: Commands
  },
]