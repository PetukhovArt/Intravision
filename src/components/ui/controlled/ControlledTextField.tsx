import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps } from '@/components/ui/text-field/TextField.tsx';

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<TextFieldProps, 'onChange' | 'value'>;

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <TextField {...field} errorMessage={error?.message} {...rest} />;
};
