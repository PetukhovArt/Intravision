export type TagType = {
  id: number;
  name: string;
};
export type TaskType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string;
  statusRgb: string;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan: string;
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
  tags: TagType[];
};

export type GetTasksRes = {
  '@odata.context': string;
  value: TaskType[];
};
export type GetTasksParams = {
  guid: string;
  $expand?: string;
  $top?: number;
  $skip?: number;
};
export type GetStatusesRes = StatusType[];
export type StatusType = {
  rgb: string;
  id: number;
  name: string;
};
export type GetPrioritiesRes = PriorityType[];
export type PriorityType = {
  rgb: string;
  id: number;
  name: string;
};

// const services = [
//   {
//     id: 3382,
//     name: 'Еда > Заказ обедов',
//   },
//   {
//     id: 3383,
//     name: 'Обслуживание > Техническая поддержка',
//   },
//   {
//     id: 3384,
//     name: 'Офис > Заказ концелярии',
//   },
// ];
//
// const tags = [
//   {
//     id: 5636,
//     name: 'Суп',
//   },
//   {
//     id: 5637,
//     name: 'Салат',
//   },
//   {
//     id: 5638,
//     name: 'Сервер',
//   },
//   {
//     id: 5639,
//     name: 'Важно',
//   },
//   {
//     id: 5640,
//     name: 'Проверить',
//   },
// ];
//
// const taskTypes = [
//   {
//     id: 3382,
//     name: 'Запрос на изменение',
//   },
//   {
//     id: 3383,
//     name: 'Стандартный',
//   },
//   {
//     id: 3384,
//     name: 'Запрос на обслуживание',
//   },
// ];
//
// const users = [
//   {
//     id: 3382,
//     name: 'Сидоров Иван',
//   },
//   {
//     id: 3383,
//     name: 'Петров Борис',
//   },
//   {
//     id: 3384,
//     name: 'Иванов Андрей',
//   },
// ];
