import s from './tasks-list.module.scss';
import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { PriorityIndicator } from '@/features/tasks/priority-indicator/PriorityIndicator.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import { GetPrioritiesRes, TaskType } from '@/features/tasks/service';

type TasksListPropsType = {
  priorities: GetPrioritiesRes | undefined;
  tasks: TaskType[] | undefined;
  showEditTaskForm: boolean;
  showCreateTaskForm: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};
export const TasksList = ({ tasks, priorities }: TasksListPropsType) => {
  // const [data, setData] = useState<TaskType[] | null>(null);
  //
  // useEffect(() => {
  //   if (tasks) {
  //     setData(tasks);
  //   }
  // }, [isSuccess]);

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

  const openTaskHandler = (id: string) => {
    console.log({ id });
  };

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
              openTaskHandler(row._valuesCache.id);
            },
            className: s.bodyRow,
          })}
          muiTableHeadCellProps={{ className: s.headCell }}
          muiTablePaperProps={{ sx: { boxShadow: 'none' } }}
        />
      </div>
    );
};
