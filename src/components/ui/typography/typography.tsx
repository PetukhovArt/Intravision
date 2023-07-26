import { ComponentPropsWithoutRef, ElementType } from 'react';

import s from './typography.module.scss';

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T; // h1 h2 h3
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit' | 'link' | 'error' | 'tertiary' | 'form';
  variant?: 'body' | 'error' | 'body2' | 'status' | 'form';
} & ComponentPropsWithoutRef<T>;

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
) => {
  const { variant = 'body', color = 'primary', className, as: Component = 'p', ...rest } = props;

  return <Component className={`${variant && s[variant]} ${s[color]}  ${className}`} {...rest} />;
};
