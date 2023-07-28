import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import s from './edit-task-form.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { useState } from 'react';
import CloseIcon from '@/assets/icons/close-icon.tsx';
import calendarIcon from '@/assets/icons/calendar_icon.png';
import {
  useGetTaskByIdQuery,
  useGetTenantGuidQuery,
  useUpdateTaskMutation,
} from '@/features/tasks/service';
import { DropDownStatus } from '@/components/ui/drop-down-status/DropDownStatus.tsx';
import { DropDownExecutor } from '@/components/ui/drop-down-executor/DropDownExecutor.tsx';
import { formatDate } from '@/common/helpers/date-helper.ts';

export type UpdateTaskDataType = {
  comment?: string | undefined;
  statusId?: number | undefined;
  executorId?: number | undefined;
};
type formProps = {
  taskId: number;
  setShowEditTaskForm: (value: boolean) => void;
};
type formData = {
  comment: string;
};
export const EditTaskForm = ({ taskId, setShowEditTaskForm }: formProps) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<formData>();
  const { data: guid } = useGetTenantGuidQuery({});

  const { data: task, isSuccess } = useGetTaskByIdQuery(
    { guid, taskId },
    { skip: !guid || !taskId },
  );
  const [updateTask] = useUpdateTaskMutation({});

  const [updateTaskData, setUpdateTaskData] = useState<UpdateTaskDataType>({
    comment: '',
    statusId: task?.statusId,
    executorId: task?.executorId,
  });

  const onSubmit: SubmitHandler<formData> = (data: FieldValues) => {
    if (isSuccess) {
      setUpdateTaskData({
        comment: data.comment,
        statusId: task.statusId,
        executorId: task.executorId,
      });
    }
    if (taskId && isSuccess) {
      updateTask({
        taskId: taskId,
        guid: guid,
        comment: data.comment,
        statusId: task.statusId,
        executorId: task.executorId,
      });
      setShowEditTaskForm(false);
    }
    reset({ comment: '' });
  };

  const onSelectStatusHandler = (statusId: number) => {
    statusId && setUpdateTaskData({ statusId: statusId });
  };
  const onSelectExecutorHandler = (executorId: number) => {
    setUpdateTaskData({ executorId: executorId });
  };

  const onCloseFormHandler = () => {
    reset({ comment: '' });
    setShowTextArea(false);
  };

  if (!isSuccess) {
    return <></>;
  } else
    return (
      <div className={s.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.main}>
            <Typography variant={'form'} color={'form'} className={s.titleDescription}>
              Описание
            </Typography>
            <Typography className={s.description}>{task?.description}</Typography>
            <Typography className={s.title} onClick={() => setShowTextArea(true)}>
              Добавление комментариев
            </Typography>
            <div className={s.textareaContainer}>
              {showTextArea && (
                <div className={s.textareaBlock}>
                  <button className={s.iconButton} onClick={onCloseFormHandler}>
                    <CloseIcon />
                  </button>
                  <textarea {...register('comment')} className={s.comment} />
                </div>
              )}
            </div>
            <Button type='submit' className={s.saveButton}>
              Сохранить
            </Button>
          </div>
        </form>
        {task?.lifetimeItems?.length > 0
          ? task.lifetimeItems.map((el) => (
              <div className={s.commentsBlock} key={el.id}>
                <div className={s.commentHeader}>
                  <span className={s.commentCircle}></span>
                  <div className={s.nameComment}>{task.initiatorName}</div>
                  <div className={s.commentDate}>{formatDate(el.createdAt)}</div>
                </div>
                <div className={s.commentItems}>
                  <div className={s.commentItem}>
                    <Typography className={s.commentText} color={'secondary'}>
                      {el.comment}
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          : ''}
        <div className={s.sideBar}>
          <div className={s.statusDropDownBlock}>
            <span className={s.circle} style={{ backgroundColor: task?.statusRgb }}></span>
            <DropDownStatus
              taskId={taskId}
              updateTaskData={updateTaskData}
              onSelectStatusHandler={onSelectStatusHandler}
            />
          </div>
          <div className={s.initiator}>
            <Typography variant={'form'} color={'form'}>
              Заявитель
            </Typography>
            <Typography className={s.sideBarText}>Александр Вознесенский</Typography>
          </div>
          <div className={s.dataItem}>
            <Typography variant={'form'}>Создана</Typography>
            <Typography className={s.sideBarText}>Маркована Анна</Typography>
          </div>
          <div className={s.dataItem}>
            <Typography variant={'form'}>Исполнитель</Typography>
            <div className={s.executorDropDownBlock}>
              <DropDownExecutor
                taskId={taskId}
                updateTaskData={updateTaskData}
                onSelectExecutorHandler={onSelectExecutorHandler}
              />
            </div>
          </div>
          <div className={s.dataItem}>
            <Typography variant={'form'}>Приоритет</Typography>
            <Typography className={s.sideBarText}>{task?.priorityName}</Typography>
          </div>
          <div className={s.dataItem}>
            <Typography variant={'form'}>Срок</Typography>
            <div className={s.dateBlock}>
              <img src={calendarIcon} alt='calendar' className={s.calendarImage} />
              <Typography className={`${s.sideBarText} ${s.date}`}>
                {formatDate(task?.resolutionDatePlan)}
              </Typography>
            </div>
          </div>
          <div className={s.tagsBlock}>
            <Typography variant={'form'} className={s.tagTitle}>
              Теги
            </Typography>
            {task?.tags.map((el) => {
              return (
                <button key={el.id} className={s.tag}>
                  {el.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
};
