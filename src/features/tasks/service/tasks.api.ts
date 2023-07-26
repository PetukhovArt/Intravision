import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  GetPrioritiesRes,
  GetStatusesRes,
  GetTasksRes,
} from '@/features/tasks/service/tasks.api.types.ts';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'http://intravision-task.test01.intravision.ru/',
    }),
    { maxRetries: 0 },
  ),
  tagTypes: ['Task'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,

  endpoints: (build) => {
    return {
      getTasks: build.query<GetTasksRes, string>({
        query: (arg) => {
          return {
            method: 'GET',
            url: `api/${arg}/Tasks`,
          };
        },
      }),
      addTask: build.query<GetTasksRes, string>({
        query: (arg) => {
          return {
            method: 'POST',
            url: `api/${arg}/Tasks`,
            body: {
              name: 'test1',
              description: 'test1111',
              comment: 'test request',
              price: 0,
              taskTypeId: 0,
              statusId: 0,
              priorityId: 0,
              serviceId: 0,
              resolutionDatePlan: '2023-07-26T21:50:56.560Z',
              tags: [],
              initiatorId: 0,
              executorId: 0,
              executorGroupId: 0,
            },
          };
        },
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
      getStatuses: build.query<GetStatusesRes, string>({
        query: (arg) => {
          return {
            method: 'GET',
            url: `api/${arg}/Statuses`,
          };
        },
      }),
    };
  },
});

export const {
  useLazyAddTaskQuery,
  useLazyGetPrioritiesQuery,
  useLazyGetStatusesQuery,
  useGetTasksTestDataQuery,
  useGetStatusesQuery,
  useLazyGetTasksTestDataQuery,
  useGetTenantGuidQuery,
  useGetTasksQuery,
  useLazyGetTasksQuery,
} = tasksApi;

// addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
//   query: card => {
//     return {
//       method: 'POST',
//       url: 'cards/card',
//       body: { card },
//     }
//   },
//   invalidatesTags: ['Cards'], //перечисляющий набор тегов, которые инвалидируются (обновляются)
//   // каждый раз при выполнении этой мутации.
// }),
// deleteCard: build.mutation<DeleteCardResponseType, ArgDeleteCardType>({
//   query: ({ packId, cardId, page, pageCount }) => {
//     return {
//       method: 'DELETE',
//       url: 'cards/card',
//       params: {
//         id: cardId,
//       },
//     }
//   },
//   // TODO: optimistic update starts
//   async onQueryStarted(
//     // 1 параметр: QueryArg - аргументы, которые приходят в query
//     { packId, cardId, page, pageCount },
//     // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
//     { dispatch, queryFulfilled }
//   ) {
//     const patchResult = dispatch(
//       userApi.util.updateQueryData(
//         // 1 параметр: endpointName, который мы выполняем после удачного первого запроса (invalidatesTags)
//         'getCards',
//         // 2 параметр: QueryArgFrom - параметры, которые приходят в endpoint выше
//         { packId, page, pageCount },
//         // 3 параметр: Коллбек функция.
//         // В данном блоке мы делаем логику, которая должна выполниться синхронно,
//         // без необходимости дожидаться ответа от сервера.
//         // Говоря проще пишем здесь логику, которую раньше писали в редьюсере,
//         // чтобы изменять стейт
//         draft => {
//           const index = draft.cards.findIndex(card => card._id === cardId)
//
//           if (index !== -1) draft.cards.splice(index, 1)
//         }
//       )
//     )
//
//     try {
//       await queryFulfilled
//     } catch {
//       patchResult.undo()
//     }
//   },
//   // TODO : optimistic update ends
//
//   invalidatesTags: ['Cards'],
// }),
// updateCard: build.mutation<UpdateCardResponseType, ArgUpdateCardType>({
//   query: card => {
//     return {
//       method: 'PUT',
//       url: 'cards/card',
//       body: {
//         card,
//       },
//     }
//   },
//   // invalidatesTags: ["Cards"],
//   invalidatesTags: (result, error, card) => [
//     { type: 'Cards', id: card._id }, //для уточнения конкретной инвалидации передаем id
//   ],
// }),

//  6) createApi возвращает объект API, который содержит все эндпоинты, определенные в параметре endpoints, а также набор вспомогательных функций, таких как useLazyQuery и usePrefetch.
// export const {
//   // useLazyGetCardsQuery
// } = userApi

// forgotPassword: build.mutation<TasksRes, ForgotArgs>({
//   query: (args: ForgotArgs) => {
//     return {
//       method: 'GET',
//       url: 'api/tasks',
//       body: {
//         email: args.email,
//         from: 'test-front-admin',
//         message: `<div style="background-color: lime; padding: 15px">
//                   password recovery link:
//                   <a href='https://petukhovart.github.io/newCards/#/set-new-password/$token$'>
//                   link</a>
//                   </div>`
//       }
//     }
//   }
// }),
