import s from './drop-down-executor.module.scss';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { ExecutorType } from '@/features/tasks/service';

type DropDownStatusProps = {
  executorName: string;
  executors: ExecutorType[] | undefined;
  onSelectExecutorHandler: (value: string) => void;
};
export const DropDownExecutor = ({
  executorName,
  executors,
  onSelectExecutorHandler,
}: DropDownStatusProps) => {
  return (
    <div className={s.container}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={s.DropdownMenuTrigger}>
          {executorName}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            <DropdownMenu.Label className={s.DropdownMenuLabel}>Исполнители</DropdownMenu.Label>
            <DropdownMenu.RadioGroup onValueChange={onSelectExecutorHandler} value={executorName}>
              {executors?.map((el) => (
                <DropdownMenu.RadioItem
                  className={s.DropdownMenuRadioItem}
                  key={el.id}
                  value={el.name}
                >
                  <DropdownMenu.ItemIndicator className={s.DropdownMenuItemIndicator}>
                    <DotFilledIcon />
                  </DropdownMenu.ItemIndicator>
                  {el.name}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
