import s from './tasks-list.module.scss';
import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { PriorityIndicator } from '@/features/tasks/priority-indicator/PriorityIndicator.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import {
  GetPrioritiesRes,
  TaskType,
  useGetTasksTestDataQuery,
  useGetTenantGuidQuery,
} from '@/features/tasks/service';

type TasksListPropsType = {
  priorities: GetPrioritiesRes | undefined;
  tasks: TaskType[] | undefined;
  handleUpdateTaskOpen: (id: number) => void;
};
export const TasksList = ({ priorities, handleUpdateTaskOpen }: TasksListPropsType) => {
  const { data: guid } = useGetTenantGuidQuery({});
  const { data: tasks, isSuccess } = useGetTasksTestDataQuery(guid, { skip: !guid });

  const updateTaskHandler = (taskId: number) => {
    handleUpdateTaskOpen(taskId);
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

  if (!isSuccess) {
    return <></>;
  } else
    return (
      <div className={s.tasksList} style={{ height: '100vh', overflow: 'auto' }}>
        <MaterialReactTable
          // enableStickyHeader={true}
          enableSorting={false}
          layoutMode='grid'
          columns={columns}
          data={tasks.value}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          muiTableBodyRowProps={({ row }) => ({
            className: s.bodyRow,
            onClick: () => updateTaskHandler(row.original.id),
          })}
          muiTableHeadCellProps={{ className: s.headCell }}
          muiTablePaperProps={{ sx: { boxShadow: 'none' } }}
        />
      </div>
    );
};
