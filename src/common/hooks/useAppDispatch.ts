import { AppDispatch } from '@/features/app/store.ts';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
