import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import { TasksPage } from '@/features/tasks/TasksPage.tsx';
import { Knowledge } from '@/features/knowledge/Knowledge.tsx';
import { Employees } from '@/features/employees/Employees.tsx';
import { Clients } from '@/features/clients/Clients.tsx';
import { CompanyAssets } from '@/features/company-assets/CompanyAssets.tsx';
import { Settings } from '@/features/settings/Settings.tsx';
import { ErrorPage } from '@/common/error-page/ErrorPage.tsx';
import App from '@/features/app/App.tsx';

export enum RouteNames {
  START_PAGE = '/',
  ERROR_PAGE = '*',
  TASKS = '/tasks',
  KNOWLEDGE = '/knowledge',
  EMPLOYEES = '/employees',
  CLIENTS = '/clients',
  ASSETS = '/company-assets',
  SETTINGS = '/settings',
  // CARDS_PACK_ID = '/cards/pack/:packId'
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route path={RouteNames.START_PAGE} element={<Navigate to={RouteNames.TASKS} />} />
      <Route path={RouteNames.TASKS} element={<TasksPage />} />
      <Route path={RouteNames.KNOWLEDGE} element={<Knowledge />} />
      <Route path={RouteNames.EMPLOYEES} element={<Employees />} />
      <Route path={RouteNames.CLIENTS} element={<Clients />} />
      <Route path={RouteNames.ASSETS} element={<CompanyAssets />} />
      <Route path={RouteNames.SETTINGS} element={<Settings />} />
      <Route path={RouteNames.ERROR_PAGE} element={<ErrorPage />} />

      {/*<Route path={RouteNames.ERROR_PAGE} element={<ErrorPage />} />*/}
      {/*<Route path={RouteNames.CARDS_PACK_ID} element={<Cards />} />*/}
      {/*<Route path={`${RouteNames.SET_NEW_PASSWORD}/:token`} element={<SetPassword />} />*/}
    </Route>,
  ),
);
