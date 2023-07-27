import s from './drop-down-status.module.scss';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { StatusType } from '@/features/tasks/service';

type DropDownStatusProps = {
  statusTriggerName: string;
  onSelectStatusHandler: (value: string) => void;
  statuses: StatusType[] | undefined;
};
export const DropDownStatus = ({
  statuses,
  statusTriggerName,
  onSelectStatusHandler,
}: DropDownStatusProps) => {
  return (
    <div className={s.dropDown}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={s.DropdownMenuTrigger}>
          {statusTriggerName}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            <DropdownMenu.Label className={s.DropdownMenuLabel}>Статусы</DropdownMenu.Label>
            <DropdownMenu.RadioGroup
              onValueChange={onSelectStatusHandler}
              value={statusTriggerName}
            >
              {statuses?.map((el) => (
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
