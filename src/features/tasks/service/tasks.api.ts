import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  AddTaskArgsType,
  ExecutorType,
  GetPrioritiesRes,
  GetStatusesRes,
  getTaskByIdArgsType,
  GetTaskByIdRes,
  GetTasksRes,
  UpdateTaskArgsType,
} from './tasks.api.types.ts';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'http://intravision-task.test01.intravision.ru/',
    }),
    { maxRetries: 0 },
  ),
  tagTypes: ['Task'],

  endpoints: (build) => {
    return {
      getTasksTestData: build.query<GetTasksRes, string>({
        query: (arg) => {
          return {
            method: 'GET',
            url: 'odata/tasks',
            params: {
              tenantguid: arg,
            },
          };
        },
        providesTags: ['Task'],
      }),
      getTaskById: build.query<GetTaskByIdRes, getTaskByIdArgsType>({
        query: ({ guid, taskId }) => {
          return {
            method: 'GET',
            url: `api/${guid}/Tasks/${taskId}`,
          };
        },
        providesTags: ['Task'],
      }),
      addTask: build.mutation<number, AddTaskArgsType>({
        query: ({ guid, name, description }) => {
          return {
            method: 'POST',
            url: `api/${guid}/Tasks`,
            body: {
              name: name,
              description: description,
            },
          };
        },
        invalidatesTags: ['Task'],
      }),
      updateTask: build.mutation<any, UpdateTaskArgsType>({
        query: ({ ...args }) => {
          return {
            method: 'PUT',
            url: `api/${args.guid}/Tasks`,
            body: {
              id: args.taskId,
              comment: args.comment,
              statusId: args.statusId,
              executorId: args.executorId,
            },
          };
        },
        invalidatesTags: ['Task'],
      }),
      getPriorities: build.query<GetPrioritiesRes, string>({
        query: (arg) => {
          return {
            method: 'GET',
            url: `api/${arg}/Priorities`,
          };
        },
      }),
      getTenantGuid: build.query({
        query: () => {
          return {
            method: 'GET',
            url: `api/Tenants`,
          };
        },
      }),
      getStatuses: build.query<GetStatusesRes, string>({
        query: (arg) => {
          return {
            method: 'GET',
            url: `api/${arg}/Statuses`,
          };
        },
      }),
      getExecutors: build.query<ExecutorType[], string>({
        query: (arg) => {
          return {
            method: 'GET',
            url: `api/${arg}/Users`,
          };
        },
      }),
    };
  },
});

export const {
  useGetTaskByIdQuery,
  useGetTenantGuidQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useGetStatusesQuery,
  useGetPrioritiesQuery,
  useGetTasksTestDataQuery,
  useGetExecutorsQuery,
} = tasksApi;
