import { Outlet } from 'react-router-dom';
import s from './app.module.scss';
import { Header } from '@/components/ui/header/Header.tsx';
import { Navbar } from '@/components/ui/navbar/navbar.tsx';
// import {
//   useGetTenantGuidQuery,
//   useLazyGetPrioritiesQuery,
//   useLazyGetStatusesQuery,
//   useLazyGetTasksTestDataQuery,
// } from '@/features/tasks/service/tasks.api.ts';
// import { useEffect } from 'react';

function App() {
  // const { data: guid, isSuccess: getGuidSucces } = useGetTenantGuidQuery({});
  // const [getPriorities, { data: priorities }] = useLazyGetPrioritiesQuery(guid);

  // const [getTestTasks, { data: testTasks }] = useLazyGetTasksTestDataQuery(guid);
  //
  // useEffect(() => {
  //   if (getGuidSucces) {
  //     getTestTasks(guid);
  //     getPriorities(guid);
  //     getStatuses(guid);
  //   }
  // }, [getGuidSucces]);

  return (
    <div className={s.app}>
      <Header />
      <Navbar />
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
