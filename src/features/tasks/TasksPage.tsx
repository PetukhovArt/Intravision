import s from './tasks.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import { TasksList } from '@/features/tasks/tasks-list/TasksList.tsx';
import { useState } from 'react';
import {
  TaskBasicInfo,
  useGetExecutorsQuery,
  useGetPrioritiesQuery,
  useGetStatusesQuery,
  useGetTasksTestDataQuery,
  useGetTenantGuidQuery,
  // useLazyGetExecutorsQuery,
  // useLazyGetPrioritiesQuery,
  // useLazyGetStatusesQuery,
  // useLazyGetTasksTestDataQuery,
} from '@/features/tasks/service';
import { CreateTask } from '@/features/tasks/create-task/CreateTask.tsx';
import { EditTaskCard } from '@/features/tasks/edit-task/EditTaskCard.tsx';

export const TasksPage = () => {
  console.log('TasksPage render');
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState<boolean>(false);
  const [taskEditData, setTaskEditData] = useState<TaskBasicInfo>({
    id: 0,
    name: '',
    initiatorName: '',
    statusName: '',
    description: '',
    priorityName: '',
    executorName: '',
    tags: [],
    resolutionDatePlan: '',
    statusRgb: '',
    executorId: 0,
    statusId: 0,
  });

  const { data: guid } = useGetTenantGuidQuery({});
  const { data: tasks } = useGetTasksTestDataQuery(guid, { skip: !guid });
  const { data: priorities } = useGetPrioritiesQuery(guid, { skip: !guid });
  const { data: statuses } = useGetStatusesQuery(guid, { skip: !guid });
  const { data: executors } = useGetExecutorsQuery(guid, { skip: !guid });

  const createTaskHandler = () => {
    setShowEditTaskForm(false);
    setShowCreateTaskForm(true);
  };

  const handleUpdateTaskOpen = (data: TaskBasicInfo) => {
    setTaskEditData({ ...data });
    setShowEditTaskForm(true);
  };
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
        showCreateTaskForm={showCreateTaskForm}
        setShowCreateTaskForm={setShowCreateTaskForm}
      />
      <EditTaskCard
        executors={executors}
        statuses={statuses}
        taskData={taskEditData}
        guid={guid}
        showEditTaskForm={showEditTaskForm}
        setShowEditTaskForm={setShowEditTaskForm}
      />
    </div>
  );
};
