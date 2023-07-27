import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import s from 'src/features/tasks/edit_task_form/edit-task-form.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { useEffect, useState } from 'react';
import CloseIcon from '@/assets/icons/close-icon.tsx';
import calendarIcon from '@/assets/icons/calendar_icon.png';
import { ExecutorType, StatusType, TaskBasicInfo } from '@/features/tasks/service';
import { DropDownStatus } from '@/components/ui/drop-down-status/DropDownStatus.tsx';
import { DropDownExecutor } from '@/components/ui/drop-down-executor/DropDownExecutor.tsx';
import { formatDate } from '@/common/helpers/date-helper.ts';

type formProps = {
  onUpdateTaskData: (comment: string, statusId: number, executorId: number) => void;
  guid: string;
  statuses: StatusType[] | undefined;
  executors: ExecutorType[] | undefined;
  taskData: TaskBasicInfo;
};
type formData = {
  comment: string;
};
export const EditTaskForm = ({ taskData, executors, statuses, onUpdateTaskData }: formProps) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [statusTriggerName, setStatusTriggerName] = useState<string>('Статус');
  const [executorName, setExecutorName] = useState<string>('Исполнитель');
  const [rgb, setRgb] = useState<string>(taskData.statusRgb);
  const [statusId, setStatusId] = useState<number | null>(taskData.statusId);
  const [executorId, setExecutorId] = useState<number | null>(taskData.executorId);
  const { register, handleSubmit, reset } = useForm<formData>();

  useEffect(() => {
    if (taskData.statusName.length > 1) {
      setRgb(taskData.statusRgb);
      setStatusTriggerName(taskData.statusName);
      setStatusId(taskData.statusId);
      setExecutorName(taskData.executorName);
      setExecutorId(taskData.executorId);
    }
  }, [taskData]);

  const onSelectStatusHandler = (value: string) => {
    if (value) {
      setStatusTriggerName(value);
      statuses?.forEach((el) => {
        if (el.name === value) {
          setRgb(el.rgb);
          setStatusId(el.id);
        }
      });
    }
  };
  const onSelectExecutorHandler = (value: string) => {
    if (value) {
      setExecutorName(value);
      executors?.forEach((el) => {
        if (el.name === value) {
          setExecutorId(el.id);
        }
      });
    }
  };
  const onSubmit: SubmitHandler<formData> = (data: FieldValues) => {
    if (statusId && executorId) {
      onUpdateTaskData(data.comment, statusId, executorId);
    }
    reset({ comment: '' });
  };
  const onCloseFormHandler = () => {
    reset({ comment: '' });
    setShowTextArea(false);
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.main}>
          <Typography variant={'form'} color={'form'} className={s.titleDescription}>
            Описание
          </Typography>
          <Typography className={s.description}>{taskData.description}</Typography>
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
      <div className={s.sideBar}>
        <div className={s.statusDropDownBlock}>
          <span className={s.circle} style={{ backgroundColor: rgb }}></span>
          <DropDownStatus
            statusTriggerName={statusTriggerName}
            onSelectStatusHandler={onSelectStatusHandler}
            statuses={statuses}
          />
        </div>
        <div className={s.initiator}>
          <Typography variant={'form'} color={'form'}>
            Заявитель
          </Typography>
          <Typography className={s.sideBarText}>Александр Вознесенский</Typography>
        </div>
        <div className={s.created}>
          <Typography variant={'form'}>Создана</Typography>
          <Typography className={s.sideBarText}>Маркована Анна</Typography>
        </div>
        <div className={s.executor}>
          <Typography variant={'form'}>Исполнитель</Typography>
          <div className={s.executorDropDownBlock}>
            <DropDownExecutor
              executorName={executorName}
              executors={executors}
              onSelectExecutorHandler={onSelectExecutorHandler}
            />
          </div>
        </div>
        <div className={s.priority}>
          <Typography variant={'form'}>Приоритет</Typography>
          <Typography className={s.sideBarText}>{taskData.priorityName}</Typography>
        </div>
        <div className={s.dateWrapper}>
          <Typography variant={'form'}>Срок</Typography>
          <div className={s.dateBlock}>
            <img src={calendarIcon} alt='calendar' className={s.calendarImage} />
            <Typography className={`${s.sideBarText} ${s.date}`}>
              {formatDate(taskData.resolutionDatePlan)}
            </Typography>
          </div>
        </div>
        <div className={s.tagsBlock}>
          <Typography variant={'form'} className={s.tagTitle}>
            Теги
          </Typography>
          {taskData.tags.map((el) => {
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
