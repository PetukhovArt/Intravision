import s from './drop-down-status.module.scss';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import {
  useGetStatusesQuery,
  useGetTaskByIdQuery,
  useGetTenantGuidQuery,
} from '@/features/tasks/service';
import { UpdateTaskDataType } from '@/features/tasks/edit_task_form/EditTaskForm.tsx';
import { useState } from 'react';

type DropDownStatusProps = {
  taskId: number;
  updateTaskData: UpdateTaskDataType;
  onSelectStatusHandler: (id: number) => void;
};
export const DropDownStatus = ({ taskId }: DropDownStatusProps) => {
  const { data: guid } = useGetTenantGuidQuery({});
  const { data: statuses } = useGetStatusesQuery(guid, { skip: !guid });
  const { data: task } = useGetTaskByIdQuery({ guid, taskId }, { skip: !guid || !taskId });
  const [statusName, setStatusName] = useState(task?.statusName);

  const onChangeStatus = (value: string) => {
    setStatusName(value);
  };

  return (
    <div className={s.dropDown}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={s.DropdownMenuTrigger}>{statusName}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            <DropdownMenu.Label className={s.DropdownMenuLabel}>Статусы</DropdownMenu.Label>
            <DropdownMenu.RadioGroup onValueChange={onChangeStatus} value={statusName}>
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
