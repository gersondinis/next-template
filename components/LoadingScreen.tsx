import {CircularProgress, Dialog, DialogContent} from '@mui/material';
import {FC} from 'react';


export const LoadingScreen: FC<ILoadingScreen> = ({loading = false, onClick}) => {
  if (!loading) return null;

  return (
    <Dialog PaperProps={{sx: styles.paper}} open={loading} onClick={onClick}>
      <DialogContent>
        <CircularProgress color={'primary'} />
      </DialogContent>
    </Dialog>
  );
};

export interface ILoadingScreen {
  loading?: boolean;
  onClick?: () => void;
}

const styles = {
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
};
