import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import s from 'components/auth/create_task_form/create_task_form.module.scss';
import { loginSchema } from '@/common/schemas/login-schema.ts';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field.tsx';
import { Button } from '@/components/ui/button/button.tsx';

export type LoginFormType = z.infer<typeof loginSchema>;

type LoginFormPropsType = {
  linkPath: { login: string; forgotPassword: string };
  onSubmitHandler: (data: LoginFormType) => void;
};
export const Create_task_form = (props: LoginFormPropsType) => {
  const { linkPath, onSubmitHandler } = props;

  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });
  // console.log(errors)
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onSubmitHandler(data);
  });

  return (
    <div className={s.card}>
      <Typography variant={'body'}>Sign In</Typography>
      <form onSubmit={onSubmit}>
        <ControlledTextField control={control} name={'email'} label={'Email'} className={s.email} />
        <ControlledTextField
          control={control}
          name={'password'}
          type={'password'}
          label={'Password'}
          className={s.password}
        />

        <Button as={'a'} variant={'link'} href={linkPath.forgotPassword} className={s.link_fogot}>
          Forgot Password?
        </Button>

        <Button type='submit' fullWidth className={s.loginBtn}>
          Sign In
        </Button>
      </form>
      <Typography variant={'body2'} className={s.subtitle}>
        Do not have an account?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.link} href={linkPath.login}>
        Sign Up
      </Button>
    </div>
  );
};
