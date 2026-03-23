import WelcomePage from '../pages/WelcomePage/WelcomePage';
import UsersPage from '../pages/UsersPage/UsersPage';
import GroupsPage from '../pages/GroupsPage';
import NotFoundPage from '../pages/NotFoundPage';
import { PATHS } from './paths';

export const publicRoutes = [
  { path: PATHS.WELCOME, element: <WelcomePage />, name: 'Приветствие' },
  { path: PATHS.USERS, element: <UsersPage />, name: 'Пользователи' },
  { path: PATHS.GROUPS, element: <GroupsPage />, name: 'Группы' },
  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
];