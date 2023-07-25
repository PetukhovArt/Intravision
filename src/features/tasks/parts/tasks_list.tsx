import s from './tasks-list.module.scss';
import { TaskType } from '@/features/tasks/service/tasks.api.types.ts';
import { useMemo } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';

type TasksListPropsType = {
  data: TaskType[];
};
export const TasksList = ({ data }: TasksListPropsType) => {
  // const tasks: TaskType[] | undefined = data?.value;
  const columns = useMemo<MRT_ColumnDef<TaskType>[]>(
    () => [
      {
        id: 'separator',
        header: '',
        Cell: () => <div className={s.priotity}></div>,
        size: 30,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Название',
        size: 150,
      },
      {
        accessorKey: 'statusName',
        header: 'Статус',
        size: 200,
      },
      {
        accessorKey: 'executorName',
        header: 'Исполнитель',
        size: 150,
      },
    ],
    [],
  );

  const openTaskHandler = (id: string) => {
    console.log({ id });
  };

  return (
    <div className={s.tasksList}>
      <MaterialReactTable
        columns={columns}
        data={data}
        // data={tasks ?? []}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            openTaskHandler(row._valuesCache.id);
          },
          sx: {
            cursor: 'pointer',
          },
        })}
      />
    </div>
  );
};

// muiTableProps={{
//   sx: {
//     border: '1px solid rgba(81, 81, 81, 1)'
//   }
// }}
// muiTableHeadCellProps={{
//   sx: {
//     border: '1px solid rgba(81, 81, 81, 1)'
//   }
// }}
// muiTableBodyCellProps={{
//   sx: {
//     border: '1px solid rgba(81, 81, 81, 1)'
//   }
// }}
