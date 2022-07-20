import {yupResolver} from '@hookform/resolvers/yup';
import {Card, CardContent, CardHeader, IconButton} from '@mui/material';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {IFormValues, schema, schema2} from './SchemaValidation';
import {FormExample} from './FormExample';
import {PublishedWithChanges} from '@mui/icons-material';
import {DevToolsContainer} from './DevToolsContainer';


const schemas = [
  schema,
  schema2
];

// let rerenders = 0;
export const ReactHookFormExample = () => {
  const [step, setStep] = useState(0);
  const methods = useForm<IFormValues>({
    resolver: yupResolver(schemas[step])
  });

  // console.log(`ReactHookFormExample render ${++rerenders}`);

  return (
    <FormProvider {...methods}>
      <Card raised>
        <CardHeader
          title={'react-hook-form example'}
          subheader={'forms'}
          action={(
            <>
              <IconButton
                title={'Swap validation schema'}
                onClick={() => {
                  setStep(oldStep => !oldStep ? 1 : 0);
                  methods.trigger();
                }}>
                <PublishedWithChanges/>
              </IconButton>
              <DevToolsContainer/>
            </>
          )}
        />
        <CardContent>
          <FormExample/>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
