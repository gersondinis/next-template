import {FC, ReactNode} from 'react';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './client';


export const ReactQueryProvider: FC<IReactQueryProvider> = ({children}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export interface IReactQueryProvider {
  children: ReactNode;
}
