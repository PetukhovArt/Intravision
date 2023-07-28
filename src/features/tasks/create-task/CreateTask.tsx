import s from './create-task.module.scss';
import { CreateTaskForm } from '@/features/tasks/create_task_form/CreateTaskForm.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import closeIcon from '@/assets/icons/close.png';
import clsx from 'clsx';

type CreateTaskProps = {
  showCreateTaskForm: boolean;
  setShowCreateTaskForm: (value: boolean) => void;
  setShowEditTaskForm: (value: boolean) => void;
  guid: string;
};

export const CreateTask = ({
  guid,
  setShowEditTaskForm,
  showCreateTaskForm,
  setShowCreateTaskForm,
}: CreateTaskProps) => {
  const classNames = {
    root: clsx(s.createTask, !showCreateTaskForm && s.cardHidden),
  };
  const onCloseFormHandler = () => {
    setShowCreateTaskForm(false);
  };

  return (
    <div className={classNames.root}>
      <div className={s.header}>
        <div>
          <Typography className={s.title}>Новая заявка</Typography>
        </div>
        <button className={s.IconButton} onClick={onCloseFormHandler}>
          <img src={closeIcon} alt='close' />
        </button>
      </div>
      <div className={s.main}>
        <CreateTaskForm
          guid={guid}
          setShowCreateTaskForm={setShowCreateTaskForm}
          setShowEditTaskForm={setShowEditTaskForm}
        />
      </div>
    </div>
  );
};
