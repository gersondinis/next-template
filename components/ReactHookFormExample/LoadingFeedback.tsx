import {useFormState} from 'react-hook-form';
import {LoadingScreen} from '../LoadingScreen';


export const LoadingFeedback = () => {
  const {isSubmitting} = useFormState();

  return <LoadingScreen loading={isSubmitting}/>;
};
