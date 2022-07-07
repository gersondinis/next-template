import {FC, useEffect} from 'react';
import {OptionsObject, useSnackbar} from 'notistack';
import {LoadingScreen} from '../../components/LoadingScreen';

export const QueryFeedback: FC<IQueryFeedback> = ({
  isSuccess = false,
  isError = false,
  error = {},
  isLoading,
  successMessage = 'success',
  snackbarOnSuccessOptions = {variant: 'success'},
  snackbarOnErrorOptions = {variant: 'error'}
}) => {
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(successMessage, snackbarOnSuccessOptions);
    }
  }, [successMessage, isSuccess, enqueueSnackbar, snackbarOnSuccessOptions]);

  useEffect(() => {
    if (isError || error) {
      enqueueSnackbar(error.message, snackbarOnErrorOptions);
    }
  }, [error, isError, enqueueSnackbar, snackbarOnErrorOptions]);

  return isLoading ? <LoadingScreen loading/> : null;
};

export interface IQueryFeedback {
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  error?: {message?: string};
  successMessage?: string;
  snackbarOnErrorOptions?: OptionsObject;
  snackbarOnSuccessOptions?: OptionsObject;
}
