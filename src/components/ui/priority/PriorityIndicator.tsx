import s from './priority.module.scss';
import { Separator } from '@radix-ui/react-separator';
import clsx from 'clsx';

export const PriorityIndicator = () => {
  const classNames = {
    root: clsx(s.root),
  };
  return (
    <Separator
      className={classNames.root}
      decorative
      orientation='vertical'
      style={{ margin: '0 15px' }}
    />
  );
};
