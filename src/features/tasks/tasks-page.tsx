import s from './tasks.module.scss';
import { Button } from '@/components/ui/button/button.tsx';
import { TasksList } from '@/features/tasks/parts/tasks_list.tsx';
import { useGetTasksQuery } from '@/features/tasks/service/tasks.api.ts';

export const TasksPage = () => {
  const { data, error, isLoading } = useGetTasksQuery({
    guid: '33ebdca4-a20e-4f25-b7e3-2eb07994619e',
  });
  const createTaskHandler = () => {
    console.log('create');
  };
  return (
    <div className={s.tasks}>
      <div className={s.buttonWrapper}>
        <Button className={s.button} onClick={createTaskHandler}>
          Создать заявку
        </Button>
      </div>
      <TasksList data={data?.value ?? []} />
    </div>
  );
};
