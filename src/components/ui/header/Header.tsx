import s from './header.module.scss';
import { TextField } from '@/components/ui/text-field/TextField.tsx';

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <TextField type={'search'} className={s.search} />
      </div>
    </div>
  );
};
