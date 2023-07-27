export type TagType = {
  id: number;
  name: string;
};

export type TaskBasicInfo = Pick<
  TaskType,
  | 'id'
  | 'name'
  | 'initiatorName'
  | 'statusName'
  | 'description'
  | 'priorityName'
  | 'executorName'
  | 'tags'
  | 'resolutionDatePlan'
  | 'statusRgb'
  | 'executorId'
  | 'statusId'
>;
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

export type getTaskByIdArgsType = {
  guid: string;
  taskId: number;
};
export type GetTaskByIdRes = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price?: any;
  taskTypeId: number;
  taskTypeName: string;
  statusId: number;
  statusName: string;
  statusRgb: string;
  priorityId: number;
  priorityName: string;
  serviceId: number;
  serviceName: string;
  resolutionDatePlan?: any;
  tags: any[];
  initiatorId: number;
  initiatorName: string;
  executorId: number;
  executorName: string;
  executorGroupId: number;
  executorGroupName: string;
  lifetimeItems: any[];
};

export type AddTaskArgsType = {
  guid: string;
  name: string;
  description: string;
};
export type UpdateTaskArgsType = {
  taskId: number | null;
  guid: string;
  comment?: string | null;
  statusId: number | null;
  executorId: number | null;
};
export type ExecutorsType = ExecutorType[];
export type ExecutorType = {
  id: number;
  name: string;
};

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
