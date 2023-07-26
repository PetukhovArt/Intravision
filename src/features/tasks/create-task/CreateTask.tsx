import s from './create-task.module.scss';
import { CreateTaskForm } from '@/components/ui/create_task_form/CreateTaskForm.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import clsx from 'clsx';
import { useLazyAddTaskQuery } from '@/features/tasks/service';

type CreateTaskProps = {
  showCreateTaskForm: boolean;
  setShowCreateTaskForm: (value: boolean) => void;
  guid: string;
};

export const CreateTask = ({
  guid,
  showCreateTaskForm,
  setShowCreateTaskForm,
}: CreateTaskProps) => {
  const classNames = {
    root: clsx(s.createTask, !showCreateTaskForm && s.hidden),
  };

  return (
    <div className={classNames.root}>
      <div className={s.header}>
        <Typography className={s.title}>Новая заявка</Typography>
      </div>
      <div className={s.main}>
        <CreateTaskForm guid={guid} />
      </div>
    </div>
  );
};
