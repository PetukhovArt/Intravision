import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { Clients, CompanyAssets, Employees, Knowledge, Settings } from '@/features/boilerplate';
import { TasksPage } from '@/features/tasks/TasksPage.tsx';
import App from '@/features/app/App.tsx';

export enum RouteNames {
  START_PAGE = '/',
  TASKS = '/tasks',
  KNOWLEDGE = '/knowledge',
  EMPLOYEES = '/employees',
  CLIENTS = '/clients',
  ASSETS = '/company-assets',
  SETTINGS = '/settings',
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
    </Route>,
  ),
);
