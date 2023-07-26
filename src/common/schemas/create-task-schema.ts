import { z } from 'zod';

export const createTaskSchema = z.object({
  taskName: z.string().trim().nonempty('Введите название задачи').min(8, 'Минимум 8 символов'),
  // .optional(),
  taskDescription: z
    .string()
    .trim()
    .nonempty('Введите описание задачи')
    .min(8, 'Минимум 8 символов'),
  // .optional(),
});
