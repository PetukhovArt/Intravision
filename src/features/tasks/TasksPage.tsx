import s from './tasks.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import { TasksList } from '@/features/tasks/tasks-list/TasksList.tsx';

import { useEffect, useState } from 'react';
import {
  useGetTenantGuidQuery,
  useLazyGetPrioritiesQuery,
  useLazyGetTasksTestDataQuery,
} from '@/features/tasks/service';
import { CreateTask } from '@/features/tasks/create-task/CreateTask.tsx';

export const TasksPage = () => {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);
  const [showEditTaskForm, setEditTaskForm] = useState<boolean>(false);

  const { data: guid, isSuccess: getGuidSucces } = useGetTenantGuidQuery({});
  const [getTasks, { data: tasksResponse, isLoading, isSuccess }] =
    useLazyGetTasksTestDataQuery(guid);
  const [getPriorities, { data: priorities }] = useLazyGetPrioritiesQuery(guid);

  useEffect(() => {
    if (getGuidSucces) {
      getTasks(guid);
      getPriorities(guid);
    }
  }, [getGuidSucces, guid]);

  const createTaskHandler = () => {
    setShowCreateTaskForm(true);
    console.log('create');
    console.log(showCreateTaskForm);
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
        priorities={priorities}
        tasks={tasksResponse?.value}
        showEditTaskForm={showEditTaskForm}
        showCreateTaskForm={showCreateTaskForm}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <CreateTask
        showCreateTaskForm={showCreateTaskForm}
        setShowCreateTaskForm={setShowCreateTaskForm}
      />
    </div>
  );
};
