import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { GetTasksParams, GetTasksRes } from '@/features/tasks/service/tasks.api.types.ts';

const guidTest = '33ebdca4-a20e-4f25-b7e3-2eb07994619e';
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'http://intravision-task.test01.intravision.ru/',
    }),
    // { maxRetries: 2 },
  ),
  tagTypes: ['Task'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,

  endpoints: (build) => {
    return {
      getTasks: build.query<GetTasksRes, GetTasksParams>({
        query: ({ guid }) => {
          return {
            method: 'GET',
            url: 'odata/tasks',
            params: {
              tenantguid: guidTest,
            },
          };
        },
        providesTags: ['Task'],
      }),
    };
  },
});

export const { useGetTasksQuery } = tasksApi;

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
