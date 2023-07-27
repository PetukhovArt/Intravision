import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import s from './create-task-form.module.scss';
import { Button } from '@/components/ui/button/Button.tsx';
import clsx from 'clsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { useAddTaskMutation } from '@/features/tasks/service';

type formProps = {
  guid: string;
  setShowCreateTaskForm: (value: boolean) => void;
};
type formData = {
  name: string;
  description: string;
};
export const CreateTaskForm = ({ guid, setShowCreateTaskForm }: formProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const [addTask] = useAddTaskMutation({});

  const onSubmit: SubmitHandler<formData> = async (data: FieldValues) => {
    try {
      await addTask({ guid, name: data.name, description: data.description });
      setShowCreateTaskForm(false);
    } catch (e) {
      console.error(e); //TODO error handling
    }
  };

  const classNames = {
    taskName: clsx(s.task, s.taskName),
    taskDescription: clsx(s.task, s.taskDescription),
  };

  return (
    <div className={s.body}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
