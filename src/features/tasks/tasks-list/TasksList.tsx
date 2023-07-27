import s from './tasks-list.module.scss';
import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { PriorityIndicator } from '@/features/tasks/priority-indicator/PriorityIndicator.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { GetPrioritiesRes, TaskBasicInfo, TaskType } from '@/features/tasks/service';

type TasksListPropsType = {
  priorities: GetPrioritiesRes | undefined;
  tasks: TaskType[] | undefined;
  handleUpdateTaskOpen: (data: TaskBasicInfo) => void;
};
export const TasksList = ({ tasks, priorities, handleUpdateTaskOpen }: TasksListPropsType) => {
  const updateTaskHandler = (task: TaskType) => {
    handleUpdateTaskOpen(task);
  };

  const columns = useMemo<MRT_ColumnDef<TaskType>[]>(
    () => [
      {
        id: 'separator',
        header: '',
        Cell: ({ row }) => (
          <PriorityIndicator id={row.original.priorityId} priorities={priorities} />
        ),
        size: 34,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Название',
        Cell: ({ row }) => <span className={s.rowName}>{row.original.name}</span>,
        maxSize: 418,
        size: 418,
      },
      {
        accessorKey: 'statusName',
        header: 'Статус',
        Cell: ({ row }) => (
          <span style={{ backgroundColor: row.original.statusRgb }} className={s.status}>
            <Typography variant={'status'}>{row.original.statusName}</Typography>
          </span>
        ),
        size: 124,
      },
      {
        accessorKey: 'executorName',
        header: 'Исполнитель',
        size: 844,
      },
    ],
    [tasks],
  );

  if (!tasks) {
    return null;
  } else
    return (
      <div className={s.tasksList}>
        <MaterialReactTable
          enableSorting={false}
          layoutMode='grid'
          columns={columns}
          data={tasks}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              updateTaskHandler(row.original);
            },
            className: s.bodyRow,
          })}
          muiTableHeadCellProps={{ className: s.headCell }}
          muiTablePaperProps={{ sx: { boxShadow: 'none' } }}
        />
      </div>
    );
};
