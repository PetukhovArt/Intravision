import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import s from './create_task_form.module.scss';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { ControlledTextField } from '@/components/ui/controlled/ControlledTextField.tsx';
import { Button } from '@/components/ui/button/Button.tsx';
import { createTaskSchema } from '@/common/schemas/create-task-schema.ts';
import clsx from 'clsx';

export type createTaskForm = z.infer<typeof createTaskSchema>;

type createTaskFormType = {
  onSubmitHandler: (data: createTaskForm) => void;
};
export const CreateTaskForm = ({ onSubmitHandler }: createTaskFormType) => {
  const { control, handleSubmit } = useForm<createTaskForm>({
    resolver: zodResolver(createTaskSchema),
  });
  const onSubmit = handleSubmit((data) => {
    onSubmitHandler(data);
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
        <ControlledTextField
          control={control}
          name={'taskName'}
          type={'text'}
          className={classNames.taskName}
        />
        <Typography variant={'form'} color={'form'} className={s.title}>
          Описание
        </Typography>
        <ControlledTextField
          control={control}
          name={'taskDescription'}
          type={'text'}
          className={classNames.taskDescription}
        />

        <Button type='submit' className={s.saveButton}>
          Сохранить
        </Button>
      </form>
    </div>
  );
};
