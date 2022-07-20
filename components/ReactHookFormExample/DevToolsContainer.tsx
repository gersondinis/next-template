import {useState} from 'react';
import {IconButton} from '@mui/material';
import {DevTool} from '@hookform/devtools';
import {useFormContext} from 'react-hook-form';
import DeveloperMode from '@mui/icons-material/DeveloperMode';


export const DevToolsContainer = () => {
  const [devToolOpen, setDevToolOpen] = useState(false);
  const {control} = useFormContext();

  return (
    <>
      <IconButton onClick={() => setDevToolOpen(old => !old)}><DeveloperMode/></IconButton>
      {devToolOpen && <DevTool control={control}/>}
    </>
  );
};

