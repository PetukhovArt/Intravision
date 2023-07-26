import { RootState } from '@/features/app/store.ts';

export const guid_Selector = (state: RootState) => state.tasksApi.queries.getTenantGuid?.data;
