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
