import s from './tasks.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import { TasksList } from '@/features/tasks/tasks-list/TasksList.tsx';

import { useEffect, useState } from 'react';
import {
  useGetTenantGuidQuery,
  useLazyGetPrioritiesQuery,
  useLazyGetStatusesQuery,
  useLazyGetTasksQuery,
  useLazyGetTasksTestDataQuery,
} from '@/features/tasks/service';

export const TasksPage = () => {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);
  const [showEditTaskForm, setEditTaskForm] = useState<boolean>(false);

  const { data: guid, isSuccess: getGuidSucces } = useGetTenantGuidQuery({});
  const [getTestTasks, { data, isLoading, isSuccess }] = useLazyGetTasksTestDataQuery(guid);
  // const [getTasks, { data, isLoading, isSuccess }] = useLazyGetTasksQuery(guid);
  const [getStatuses, { data: statuses }] = useLazyGetStatusesQuery(guid);
  const [getPriorities, { data: priorities }] = useLazyGetPrioritiesQuery(guid);

  useEffect(() => {
    if (getGuidSucces) {
      // getTasks(guid);
      getTestTasks(guid);
      getStatuses(guid);
      getPriorities(guid);
    }
  }, [getGuidSucces, guid]);

  const createTaskHandler = () => {
    setShowCreateTaskForm(true);
    console.log('create');
    //TODO
  };
  return (
    <div className={s.tasks}>
      <div className={s.buttonWrapper}>
        <Button className={s.button} onClick={createTaskHandler}>
          Создать заявку
        </Button>
      </div>
      <TasksList
        tasks={data?.value}
        showEditTaskForm={showEditTaskForm}
        showCreateTaskForm={showCreateTaskForm}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};
