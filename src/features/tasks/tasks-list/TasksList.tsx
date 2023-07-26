import s from '@/features/tasks/tasks-list/tasks-list.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { PriorityIndicator } from '@/components/ui/priority/PriorityIndicator.tsx';
import { Typography } from '@/components/ui/typography/typography.tsx';
import clsx from 'clsx';
import { TaskType } from '@/features/tasks/service';

type TasksListPropsType = {
  tasks: TaskType[] | undefined;
  showEditTaskForm: boolean;
  showCreateTaskForm: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};
export const TasksList = ({ isLoading, isSuccess, tasks }: TasksListPropsType) => {
  const [data, setData] = useState<TaskType[] | null>(null);
  const [statusColors, setStatusColors] = useState<string[] | null>(null);

  useEffect(() => {
    if (tasks) {
      setData(tasks);
      setStatusColors(tasks.map((el) => el.statusRgb));
    }
  }, [isSuccess]);

  const classNames = {
    status: clsx(s.status),
    statusClosed: clsx(s.statusClosed),
  };
  const statusClassName = (status: string) => {
    console.log(status);
    switch (status) {
      case 'Открыта':
        return classNames.status;
      case 'Выполнена':
        return classNames.statusClosed;
    }
    return classNames.status;
  };

  const columns = useMemo<MRT_ColumnDef<TaskType>[]>(
    () => [
      {
        id: 'separator',
        header: '',
        Cell: () => <PriorityIndicator />,
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
        Cell: ({ cell, row }) => (
          <span
            // className={statusClassName(row._valuesCache.statusName)}
            className={statusClassName(row._valuesCache.statusRgb)}
            // style={{
            //   backgroundColor: row._valuesCache.statusRgb,
            // }}
          >
            <Typography variant={'status'}>{cell.getValue<string>()}</Typography>
          </span>
        ),
        size: 124,
      },
      {
        accessorKey: 'executorName',
        header: 'Исполнитель',
        size: 844,
        muiTableHeadCellProps: {
          sx: () => ({ borderRight: 'none' }),
        },
      },
    ],
    [statusColors],
  );

  const openTaskHandler = (id: string) => {
    console.log({ id });
  };

  if (!data) {
    return null;
  } else
    return (
      <div className={s.tasksList}>
        <MaterialReactTable
          // state={{ isLoading: isLoading }}
          enableSorting={false}
          layoutMode='grid'
          columns={columns}
          data={data}
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
          muiTablePaperProps={{ sx: { boxShadow: 'none' } }}
        />
      </div>
    );
};

const priorities = [
  {
    rgb: '#fef6f6',
    id: 5636,
    name: 'Очень низкий',
  },
  {
    rgb: '#fbd6b9',
    id: 5637,
    name: 'Низкий',
  },
  {
    rgb: '#f75394',
    id: 5638,
    name: 'Средний',
  },
  {
    rgb: '#b32c55',
    id: 5639,
    name: 'Высокий',
  },
  {
    rgb: '#ee0909',
    id: 5640,
    name: 'Критический',
  },
];

const statuses = [
  {
    rgb: '#3cb371',
    id: 6763,
    name: 'Закрыта',
  },
  {
    rgb: '#909090',
    id: 6764,
    name: 'Отложена',
  },
  {
    rgb: '#fcad51',
    id: 6765,
    name: 'Согласование договора',
  },
  {
    rgb: '#fcad51',
    id: 6766,
    name: 'В работе',
  },
  {
    rgb: '#fd5e53',
    id: 6767,
    name: 'Открыта',
  },
  {
    rgb: '#025969',
    id: 6768,
    name: 'Выполнена',
  },
];

const services = [
  {
    id: 3382,
    name: 'Еда > Заказ обедов',
  },
  {
    id: 3383,
    name: 'Обслуживание > Техническая поддержка',
  },
  {
    id: 3384,
    name: 'Офис > Заказ концелярии',
  },
];

const tags = [
  {
    id: 5636,
    name: 'Суп',
  },
  {
    id: 5637,
    name: 'Салат',
  },
  {
    id: 5638,
    name: 'Сервер',
  },
  {
    id: 5639,
    name: 'Важно',
  },
  {
    id: 5640,
    name: 'Проверить',
  },
];

const taskTypes = [
  {
    id: 3382,
    name: 'Запрос на изменение',
  },
  {
    id: 3383,
    name: 'Стандартный',
  },
  {
    id: 3384,
    name: 'Запрос на обслуживание',
  },
];

const users = [
  {
    id: 3382,
    name: 'Сидоров Иван',
  },
  {
    id: 3383,
    name: 'Петров Борис',
  },
  {
    id: 3384,
    name: 'Иванов Андрей',
  },
];
