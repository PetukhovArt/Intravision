import s from './tasks.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import { TasksList } from '@/features/tasks/tasks-list/TasksList.tsx';
import { useState } from 'react';
import {
  useGetPrioritiesQuery,
  useGetTasksTestDataQuery,
  useGetTenantGuidQuery,
} from '@/features/tasks/service';
import { CreateTask } from '@/features/tasks/create-task/CreateTask.tsx';
import { EditTaskCard } from '@/features/tasks/edit-task/EditTaskCard.tsx';

export const TasksPage = () => {
  const [editTaskId, setEditTaskId] = useState<number>();
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState<boolean>(false);

  const { data: guid } = useGetTenantGuidQuery({});
  const { data: tasks, isLoading } = useGetTasksTestDataQuery(guid, { skip: !guid });
  const { data: priorities } = useGetPrioritiesQuery(guid, { skip: !guid });

  const createTaskHandler = () => {
    setShowCreateTaskForm(true);
    if (showEditTaskForm) {
      setShowEditTaskForm(false);
    }
  };

  const handleUpdateTaskOpen = (taskId: number) => {
    setEditTaskId(taskId);
    setShowEditTaskForm(true);
  };
  if (isLoading) {
    return <div>loading</div>;
  } else
    return (
      <div className={s.tasks}>
        <div className={s.buttonWrapper}>
          <Button className={s.button} onClick={createTaskHandler}>
            Создать заявку
          </Button>
        </div>
        <TasksList
          handleUpdateTaskOpen={handleUpdateTaskOpen}
          priorities={priorities}
          tasks={tasks?.value}
        />
        <CreateTask
          guid={guid}
          setShowEditTaskForm={setShowEditTaskForm}
          showCreateTaskForm={showCreateTaskForm}
          setShowCreateTaskForm={setShowCreateTaskForm}
        />
        <EditTaskCard
          taskId={editTaskId!}
          showEditTaskForm={showEditTaskForm}
          setShowEditTaskForm={setShowEditTaskForm}
        />
      </div>
    );
};
