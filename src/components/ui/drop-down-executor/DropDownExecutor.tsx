import s from './drop-down-executor.module.scss';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import {
  useGetExecutorsQuery,
  useGetTaskByIdQuery,
  useGetTenantGuidQuery,
} from '@/features/tasks/service';
import { UpdateTaskDataType } from '@/features/tasks/edit_task_form/EditTaskForm.tsx';
import { useState } from 'react';

type DropDownStatusProps = {
  taskId: number;
  updateTaskData: UpdateTaskDataType;
  onSelectExecutorHandler: (id: number) => void;
};
export const DropDownExecutor = ({ taskId }: DropDownStatusProps) => {
  const { data: guid } = useGetTenantGuidQuery({});
  const { data: executors } = useGetExecutorsQuery(guid, { skip: !guid });
  const { data: task } = useGetTaskByIdQuery({ guid, taskId }, { skip: !guid || !taskId });
  const [executorName, setExecutorName] = useState(task?.executorName);
  const onChangeExecutor = (value: string) => {
    setExecutorName(value);
  };

  return (
    <div className={s.container}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={s.DropdownMenuTrigger}>
          {executorName}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
            <DropdownMenu.Label className={s.DropdownMenuLabel}>Исполнители</DropdownMenu.Label>
            <DropdownMenu.RadioGroup onValueChange={onChangeExecutor} value={executorName}>
              {executors?.map((el) => (
                <DropdownMenu.RadioItem
                  key={el.id}
                  className={s.DropdownMenuRadioItem}
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
