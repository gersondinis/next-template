import {FC, ReactNode, useRef} from 'react';
import {IconButton} from '@mui/material';
import {SnackbarKey, SnackbarProvider as Provider} from 'notistack';
import {Close} from '@mui/icons-material';

export const SnackbarProvider: FC<ISnackbarProvider> = ({children}) => {
  const ref = useRef<Provider>();
  const onClickDismiss = (key: SnackbarKey) => {
    ref.current?.closeSnackbar(key);
  };

  return (
    <Provider
      ref={ref}
      maxSnack={5}
      action={(key) => (
        <IconButton onClick={() => onClickDismiss(key)}>
          <Close />
        </IconButton>
      )}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      autoHideDuration={6000}
      dense
    >
      {children}
    </Provider>
  );
};

export interface ISnackbarProvider {
  children: ReactNode;
}
