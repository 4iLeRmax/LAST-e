import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import App from './App.tsx';

import { store } from './store/store.ts';

import './styles/index.css';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>,
);
