import s from './edit-task-card.module.scss';
import { Typography } from '@/components/ui/typography/typography.tsx';
import clsx from 'clsx';
import { EditTaskForm } from '@/components/ui/edit_task_form/EditTaskForm.tsx';
import closeIcon from '@/assets/icons/close.png';
import {
  ExecutorType,
  StatusType,
  TaskBasicInfo,
  useUpdateTaskMutation,
} from '@/features/tasks/service';

type EditTaskProps = {
  taskData: TaskBasicInfo;
  statuses: StatusType[] | undefined;
  executors: ExecutorType[] | undefined;
  showEditTaskForm: boolean;
  setShowEditTaskForm: (value: boolean) => void;
  guid: string;
};

export const EditTaskCard = ({
  guid,
  taskData,
  showEditTaskForm,
  setShowEditTaskForm,
  statuses,
  executors,
}: EditTaskProps) => {
  const classNames = {
    root: clsx(s.createTask, !showEditTaskForm && s.hidden),
  };

  const [updateTask] = useUpdateTaskMutation({});

  const onUpdateTaskData = async (comment: string, statusId: number, executorId: number) => {
    setShowEditTaskForm(false);
    updateTask({
      taskId: taskData.id,
      guid: guid,
      comment: comment,
      statusId: statusId,
      executorId: executorId,
    });
  };

  return (
    <div className={classNames.root}>
      <div className={s.header}>
        <div className={s.text}>
          <Typography className={s.title}>{`№ ${taskData.id}`}</Typography>
          <Typography className={s.name}>{taskData.name}</Typography>
        </div>
        <button className={s.iconButton} onClick={() => setShowEditTaskForm(false)}>
          <img src={closeIcon} alt='close' />
        </button>
      </div>
      <div className={s.content}>
        <EditTaskForm
          executors={executors}
          statuses={statuses}
          guid={guid}
          onUpdateTaskData={onUpdateTaskData}
          taskData={taskData}
        />
      </div>
    </div>
  );
};
