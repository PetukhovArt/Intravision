import { Separator } from '@radix-ui/react-separator';
import { GetPrioritiesRes } from '@/features/tasks/service';
import s from './priority.module.scss';

type PriorityIndicatorProps = {
  id: number;
  priorities: GetPrioritiesRes | undefined;
};
export const PriorityIndicator = ({ id, priorities }: PriorityIndicatorProps) => {
  const indicatorColor = (id: number) => {
    let color = '';
    if (priorities) {
      priorities.forEach((p) => {
        if (p.id === id) {
          color = p.rgb;
        }
      });
    }
    return color;
  };

  return (
    <Separator
      className={s.root}
      decorative
      orientation='vertical'
      style={{ backgroundColor: indicatorColor(id) }}
    />
  );
};
