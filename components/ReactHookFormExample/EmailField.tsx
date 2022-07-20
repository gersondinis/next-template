import {TextField} from '@mui/material';
import {Controller, useFormContext, useWatch} from 'react-hook-form';


// let rerenders = 0;
export const EmailField = () => {
  const {control} = useFormContext();
  const withEmail = useWatch({name: 'withEmail'});

  // console.log(`ReactHookFormExample EmailField render ${++rerenders}`);

  if (!withEmail) return null;

  return (
    <>
      <Controller
        name={'email'}
        control={control}
        defaultValue={''}
        render={({field, fieldState: {error}}) => (
          <TextField
            {...field}
            label={'Email'}
            variant={'outlined'}
            error={Boolean(error)}
            helperText={error?.message}
            fullWidth
          />
        )}
      />
    </>
  );
};
