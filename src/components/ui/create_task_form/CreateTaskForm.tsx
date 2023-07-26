import { useForm } from 'react-hook-form';
import s from './create_task_form.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import clsx from 'clsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { useLazyAddTaskQuery } from '@/features/tasks/service';

type formProps = {
  guid: string;
};
export const CreateTaskForm = ({ guid }: formProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addTask, { data: taskAdded }] = useLazyAddTaskQuery({});
  const onSubmit = handleSubmit((data) => {
    addTask(guid);
  });

  const classNames = {
    taskName: clsx(s.task, s.taskName),
    taskDescription: clsx(s.task, s.taskDescription),
  };

  return (
    <div className={s.body}>
      <form onSubmit={onSubmit}>
        <Typography variant={'form'} color={'form'} className={s.title}>
          Название
        </Typography>

        <textarea {...register('name', { required: true })} className={classNames.taskName} />
        {errors.name && <Typography variant={'error'}>This field is required</Typography>}

        <div className={s.descriptionBlock}>
          <Typography variant={'form'} color={'form'} className={s.title}>
            Описание
          </Typography>
          <textarea
            {...register('description', { required: true })}
            className={classNames.taskDescription}
          />
          {errors.description && <Typography variant={'error'}>This field is required</Typography>}
        </div>

        <Button type='submit' className={s.saveButton}>
          Сохранить
        </Button>
      </form>
    </div>
  );
};
