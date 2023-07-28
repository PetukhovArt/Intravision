import s from './edit-task-card.module.scss';
import { Typography } from '@/components/ui/typography/typography.tsx';
import clsx from 'clsx';
import { EditTaskForm } from '@/features/tasks/edit_task_form/EditTaskForm.tsx';
import closeIcon from '@/assets/icons/close.png';
import { useGetTaskByIdQuery, useGetTenantGuidQuery } from '@/features/tasks/service';

type EditTaskProps = {
  taskId: number;
  showEditTaskForm: boolean;
  setShowEditTaskForm: (value: boolean) => void;
};

export const EditTaskCard = ({ taskId, showEditTaskForm, setShowEditTaskForm }: EditTaskProps) => {
  const { data: guid } = useGetTenantGuidQuery({});
  const { data: task, isSuccess } = useGetTaskByIdQuery(
    { guid, taskId },
    { skip: !guid || !taskId },
  );

  const classNames = {
    root: clsx(s.createTask, !showEditTaskForm && s.cardHidden),
  };

  if (!isSuccess) {
    return <></>;
  } else
    return (
      <div className={classNames.root}>
        <div className={s.header}>
          <div className={s.text}>
            <Typography className={s.title}>{`№ ${task?.id}`}</Typography>
            <Typography className={s.name}>{task?.name}</Typography>
          </div>
          <button className={s.iconButton} onClick={() => setShowEditTaskForm(false)}>
            <img src={closeIcon} alt='close' />
          </button>
        </div>
        <div className={s.content}>
          <EditTaskForm taskId={taskId} setShowEditTaskForm={setShowEditTaskForm} />
        </div>
      </div>
    );
};
